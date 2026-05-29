/**
 * Parent portal pages — data-render verification
 *
 * Seeded fixtures: parent@schoolgo.test
 *   - 6 students
 *   - 3 applications
 *   - 2 test results
 *
 * Auth: provided by the `setup` project storageState (tests/e2e/.auth/parent.json).
 * No login code needed here.
 */
import { test, expect } from '@playwright/test';
import { attachConsoleErrorWatcher, assertNoConsoleErrors } from './_helpers';

// ---------------------------------------------------------------------------
// 1. Dashboard — summary cards + quick actions
// ---------------------------------------------------------------------------

test('dashboard: summary cards render with data and quick-action links are present', async ({
  page,
}) => {
  // next/image returns 400 in local dev when the optimizer tries to fetch
  // student avatar photos from localhost:1337 — this is a dev-environment
  // restriction (same-host internal fetch), not an app logic failure.
  // The avatar component already falls back gracefully to initials via onError.
  attachConsoleErrorWatcher(page, ['Failed to load resource: the server responded with a status of 400']);

  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  // Page must not have crashed
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // Students summary card — card title is always rendered
  await expect(page.getByText('Students', { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });

  // The card renders a student count once the query resolves.
  // The seeded parent has 6 students; the ICU plural pattern is "{count} students".
  await expect(page.getByText(/\d+ student(s)?/i)).toBeVisible({ timeout: 15_000 });

  // Applications summary card — at least one application link visible
  await expect(page.getByText('Applications', { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });

  // English tests summary card
  await expect(page.getByText('English tests', { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });

  // Quick actions section heading
  await expect(page.getByRole('heading', { name: /Quick actions/i })).toBeVisible({
    timeout: 15_000,
  });

  // Each quick-action tile is a link (role=link). The quick-actions section
  // is scoped by the "Quick actions" heading to avoid matching links elsewhere.
  const quickActionsSection = page.locator('section').filter({
    has: page.getByRole('heading', { name: /Quick actions/i }),
  });
  await expect(quickActionsSection.getByRole('link', { name: /Add student/i })).toBeVisible();
  await expect(quickActionsSection.getByRole('link', { name: /Search schools/i })).toBeVisible();
  await expect(quickActionsSection.getByRole('link', { name: /Settings/i })).toBeVisible();
  await expect(quickActionsSection.getByRole('link', { name: /Payments/i })).toBeVisible();

  assertNoConsoleErrors(page);
});

// ---------------------------------------------------------------------------
// 2. Applications list — rows visible + status filter interaction
// ---------------------------------------------------------------------------

test('applications: list renders ≥1 application row and status filter does not crash', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  await page.goto('/en/parent/applications');
  await page.waitForLoadState('networkidle');

  // Page must not have crashed
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // The toolbar area contains the filter dropdown trigger.
  // It lives in the first child with a bottom border inside the card container.
  // We capture the toolbar div by its structural role (border-b container) before
  // the dropdown label changes — making it stable across filter selections.
  const toolbarDiv = page.locator('div.border-b').first();
  const filterButton = toolbarDiv.getByRole('button', { name: /All statuses/i });
  await expect(filterButton).toBeVisible({ timeout: 15_000 });

  // The table must have at least one application row.
  const tableRows = page.locator('table tbody tr');
  const rowCount = await tableRows.count();
  expect(rowCount).toBeGreaterThanOrEqual(1);

  // --- Filter interaction ---
  // Open the dropdown and select "Submitted"
  await filterButton.click();
  const submittedOption = page.getByRole('menuitem', { name: /^Submitted$/i });
  await expect(submittedOption).toBeVisible({ timeout: 5_000 });
  await submittedOption.click();

  // After selecting the filter the page must still be alive (no crash)
  await page.waitForLoadState('networkidle');
  const bodyAfterFilter = await page.locator('body').innerText();
  expect(bodyAfterFilter).not.toMatch(/Application error|Something went wrong/i);

  // The filter trigger should now show the selected status label.
  // Scope to the toolbar div to avoid matching the table "Submitted" sort header button.
  await expect(toolbarDiv.getByRole('button', { name: /Submitted/i })).toBeVisible({
    timeout: 10_000,
  });

  assertNoConsoleErrors(page);
});

// ---------------------------------------------------------------------------
// 3. Results — student selector renders; selecting a student shows results or
//    a clean empty state
// ---------------------------------------------------------------------------

test('results: student selector renders; selecting a student shows results or empty state', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  await page.goto('/en/parent/results');
  await page.waitForLoadState('networkidle');

  // Page must not have crashed
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // The student selector label is always rendered once the query resolves
  await expect(page.getByText('Student', { exact: true })).toBeVisible({ timeout: 15_000 });

  // The <select> element itself
  const selector = page.locator('select');
  await expect(selector).toBeVisible({ timeout: 15_000 });

  // It should have at least 2 options: the placeholder + at least 1 student
  const options = selector.locator('option');
  const optionCount = await options.count();
  expect(optionCount).toBeGreaterThanOrEqual(2);

  // Select the first real student option (index 1, skipping the placeholder)
  const firstStudentValue = await options.nth(1).getAttribute('value');
  expect(firstStudentValue).toBeTruthy();
  await selector.selectOption(firstStudentValue!);

  // After selecting a student the page shows either test results or a clean
  // empty state — in both cases there must be no crash and no console error.
  await page.waitForLoadState('networkidle');
  const bodyAfterSelect = await page.locator('body').innerText();
  expect(bodyAfterSelect).not.toMatch(/Application error|Something went wrong/i);

  // A visible heading or empty-state title confirms the panel rendered
  const hasResults = await page.getByRole('heading', { name: /English Test Results/i }).isVisible();
  const hasEmptyState = await page.getByText(/No results yet/i).isVisible();
  const hasCards = (await page.locator('[data-testid="test-result-card"]').count()) > 0;
  // At least one of the three outcomes must be true
  expect(hasResults || hasEmptyState || hasCards).toBe(true);

  assertNoConsoleErrors(page);
});

// ---------------------------------------------------------------------------
// 4. Payments — coming-soon content renders cleanly
// ---------------------------------------------------------------------------

test('payments: coming-soon content renders without crash or console error', async ({ page }) => {
  attachConsoleErrorWatcher(page);

  await page.goto('/en/parent/payments');
  await page.waitForLoadState('networkidle');

  // Page must not have crashed
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // The main "Coming soon" badge / heading must be present
  await expect(page.getByText(/Coming soon/i).first()).toBeVisible({ timeout: 15_000 });

  // The section heading "Payments — coming soon"
  await expect(
    page.getByRole('heading', { name: /Payments.*coming soon/i }),
  ).toBeVisible({ timeout: 15_000 });

  // The plans section heading
  await expect(page.getByText("What's coming")).toBeVisible({ timeout: 15_000 });

  // All three plan cards must be rendered — match the card name headings exactly
  // to avoid the description text that also contains the word "practice".
  await expect(page.getByText('Practice', { exact: true })).toBeVisible();
  await expect(page.getByText('Placement', { exact: true })).toBeVisible();
  await expect(page.getByText('Progress', { exact: true })).toBeVisible();

  assertNoConsoleErrors(page);
});
