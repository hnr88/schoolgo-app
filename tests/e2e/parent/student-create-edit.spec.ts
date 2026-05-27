/**
 * Parent student wizard — CREATE (B19/D3) and EDIT (B20/D5) E2E verification.
 *
 * Auth: storageState from tests/e2e/.auth/parent.json — no login needed.
 *
 * CREATE: walks the full 5-step wizard (Personal → Education → Guardian → Media → Review)
 * and submits. Asserts POST /api/students returns 2xx (201) and the browser lands on the
 * new student's detail page.
 *
 * EDIT: opens the new student's edit page, changes the last name, submits. Asserts PUT
 * /api/students/:id returns 2xx and the changed value is visible after a reload.
 *
 * Known dev-only noise allowlisted: next/image 400 responses for avatar images.
 * No other console errors are tolerated.
 *
 * Photo upload: uses setInputFiles with a buffer object (NOT a file path) because
 * Playwright sets size=0 for runtime temp-file paths, which hangs the upload handler.
 */
import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import { attachConsoleErrorWatcher, assertNoConsoleErrors, FIXTURES } from './_helpers';

// Match the next/image 400 noise on avatar images (dev-only, tracked in Task #11).
const AVATAR_400 = '400';

// Unique name for this test run so we can identify the created student.
const TIMESTAMP = Date.now();
const FIRST_NAME = 'E2EWizard';
const LAST_NAME = `Kid${TIMESTAMP}`;
const EDITED_LAST_NAME = `Kid${TIMESTAMP}Edit`;

// documentId of the student created in the CREATE test — shared via closure.
let createdDocumentId = '';

// ---------------------------------------------------------------------------
// Step helpers
// ---------------------------------------------------------------------------

async function fillPersonalStep(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { name: /Personal/i })).toBeVisible({ timeout: 30_000 });

  // shadcn FormControl overrides the element id — use name attribute selectors.
  await page.locator('input[name="firstName"]').fill(FIRST_NAME);
  await page.locator('input[name="lastName"]').fill(LAST_NAME);
  await page.locator('input[name="dateOfBirth"]').fill('2015-06-15');

  // Gender — shadcn Select trigger (no name attribute on the hidden input)
  await page.getByText('Select gender').click();
  await page.getByRole('option', { name: 'Male', exact: true }).click();

  await page.locator('input[name="nationality"]').fill('Australia');
}

async function fillEducationStep(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { name: /Education/i })).toBeVisible({ timeout: 15_000 });

  await page.locator('input[name="targetEntryYear"]').fill('2027');

  // "Target intake" select — placeholder text from i18n selectTerm key
  await page.getByText('Select intake').click();
  await page.getByRole('option', { name: 'Term 1' }).click();
}

async function fillGuardianStep(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { name: /Guardian/i })).toBeVisible({ timeout: 15_000 });

  await page.locator('input[name="parentGuardianName"]').fill('Test Parent');
  await page.locator('input[name="parentGuardianPhone"]').fill('+61400000001');
}

async function fillMediaStep(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { name: /Media/i })).toBeVisible({ timeout: 15_000 });

  // Wait for the photo file input to be attached to the DOM.
  await expect(page.locator('input[type="file"][accept="image/*"]')).toBeAttached({ timeout: 15_000 });

  // Use a buffer form so Playwright reports the correct file size (non-zero).
  await page.locator('input[type="file"][accept="image/*"]').setInputFiles({
    name: 'photo.png',
    mimeType: 'image/png',
    buffer: fs.readFileSync(FIXTURES.photo),
  });

  // Wait for the Remove button to appear — confirms upload completed.
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible({ timeout: 25_000 });

  // Voice intro is optional — skip to stay focused on required fields.
}

async function clickNext(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Next', exact: true }).click();
}

// ---------------------------------------------------------------------------
// CREATE test (B19 / D3)
// ---------------------------------------------------------------------------

test('CREATE wizard: submits new student and lands on detail page', async ({ page }) => {
  attachConsoleErrorWatcher(page, [AVATAR_400]);

  // Intercept the POST to assert the response status.
  let postStatus = 0;
  page.on('response', (res) => {
    if (res.url().includes('/api/students') && res.request().method() === 'POST') {
      postStatus = res.status();
    }
  });

  await page.goto('/en/parent/students/new');
  await page.waitForLoadState('networkidle');

  // Must not show an error boundary on the wizard page.
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/Application error|Something went wrong/i);

  // Step 1 — Personal
  await fillPersonalStep(page);
  await clickNext(page);

  // Step 2 — Education
  await fillEducationStep(page);
  await clickNext(page);

  // Step 3 — Guardian
  await fillGuardianStep(page);
  await clickNext(page);

  // Step 4 — Media (photo upload)
  await fillMediaStep(page);
  await clickNext(page);

  // Step 5 — Review: confirm the entered first name is visible before submitting.
  await expect(page.getByRole('heading', { name: /Review/i })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(FIRST_NAME).first()).toBeVisible({ timeout: 10_000 });

  // Submit via the finish button (i18n key "finish" → "Create Student")
  await page.getByRole('button', { name: 'Create Student' }).click();

  // Must navigate away from /students/new to the new student's detail page.
  await page.waitForURL(/\/parent\/students\/[a-z0-9]{10,}/i, { timeout: 30_000 });
  expect(page.url()).not.toContain('/students/new');

  // Capture the documentId for the EDIT test.
  const match = page.url().match(/\/parent\/students\/([a-z0-9]{10,})/i);
  expect(match).not.toBeNull();
  createdDocumentId = match![1];
  console.log(`[CREATE] Captured documentId: ${createdDocumentId}`);

  await page.waitForLoadState('networkidle');

  // The new student's name must be visible on the detail page.
  await expect(page.getByText(FIRST_NAME).first()).toBeVisible({ timeout: 15_000 });

  // Assert the POST returned 2xx.
  expect(postStatus).toBeGreaterThanOrEqual(200);
  expect(postStatus).toBeLessThan(300);

  assertNoConsoleErrors(page);
});

// ---------------------------------------------------------------------------
// EDIT test (B20 / D5)
// ---------------------------------------------------------------------------

test('EDIT wizard: updates last name and persists after reload', async ({ page }) => {
  // Guard: if the CREATE test did not capture a documentId, skip rather than fail opaquely.
  // Use the callback form so the condition is evaluated at runtime (not at file-parse time).
  console.log(`[EDIT] createdDocumentId at start: "${createdDocumentId}"`);
  if (!createdDocumentId) {
    test.skip();
    return;
  }

  attachConsoleErrorWatcher(page, [AVATAR_400]);

  let putStatus = 0;
  page.on('response', (res) => {
    if (
      res.url().includes('/api/students/') &&
      res.request().method() === 'PUT'
    ) {
      putStatus = res.status();
    }
  });

  await page.goto(`/en/parent/students/${createdDocumentId}/edit`);
  await page.waitForLoadState('networkidle');

  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/Application error|Something went wrong/i);

  // Step 1 — Personal must show pre-populated values.
  await expect(page.locator('input[name="firstName"]')).toBeVisible({ timeout: 30_000 });
  const firstNameValue = await page.locator('input[name="firstName"]').inputValue();
  expect(firstNameValue).toBe(FIRST_NAME);

  // Change the last name.
  await page.locator('input[name="lastName"]').fill(EDITED_LAST_NAME);
  await clickNext(page);

  // Step 2 — Education: pre-populated; just advance.
  await expect(page.getByRole('heading', { name: /Education/i })).toBeVisible({ timeout: 15_000 });
  await clickNext(page);

  // Step 3 — Guardian: pre-populated; just advance.
  await expect(page.getByRole('heading', { name: /Guardian/i })).toBeVisible({ timeout: 15_000 });
  await clickNext(page);

  // Step 4 — Media: pre-populated; just advance.
  await expect(page.getByRole('heading', { name: /Media/i })).toBeVisible({ timeout: 15_000 });
  await clickNext(page);

  // Step 5 — Review: edited last name must appear.
  await expect(page.getByRole('heading', { name: /Review/i })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(EDITED_LAST_NAME).first()).toBeVisible({ timeout: 10_000 });

  // Submit — the finish button says "Create Student" in the wizard (same label for edit).
  await page.getByRole('button', { name: 'Create Student' }).click();

  // Must redirect back to the student's detail page.
  await page.waitForURL(new RegExp(`/parent/students/${createdDocumentId}(?!/edit)`), {
    timeout: 30_000,
  });
  await page.waitForLoadState('networkidle');

  // Assert the PUT returned 2xx.
  expect(putStatus).toBeGreaterThanOrEqual(200);
  expect(putStatus).toBeLessThan(300);

  // The edited last name must be visible on the detail page.
  await expect(page.getByText(EDITED_LAST_NAME).first()).toBeVisible({ timeout: 15_000 });

  // Reload to confirm persistence (not just client-state).
  await page.reload();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(EDITED_LAST_NAME).first()).toBeVisible({ timeout: 15_000 });

  assertNoConsoleErrors(page);
});
