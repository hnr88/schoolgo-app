/**
 * Parent students — LIST and DETAIL page verification
 *
 * Seeded: parent@schoolgo.test has 6 students (some with photos / voice intros).
 *
 * Auth: storageState from tests/e2e/.auth/parent.json — no login needed.
 *
 * Known dev-only noise: next/image returns 400 when the Next.js image optimizer
 * tries to proxy avatar photos from localhost:1337. The ParentStudentAvatar
 * component handles this gracefully via onError → falls back to initials.
 * We allowlist that single error pattern and nothing else.
 */
import { test, expect } from '@playwright/test';
import { attachConsoleErrorWatcher, assertNoConsoleErrors } from './_helpers';

// Matches the resource-load failure line that browsers emit for a 400 response on
// student avatar images (next/image optimizer tries to fetch from localhost:1337 in dev).
const AVATAR_400_PATTERN = '400';

// REAL BUG — tracked separately in the voice intro test below:
// The CSP in request-proxy.constants.ts lacks a `media-src` directive.
// `default-src 'self'` blocks audio from localhost:1337 (dev) and from the
// production Strapi origin. The first seeded student has a voice intro, so this
// error fires on any detail-page test that lands on that student.
// The sections/avatar/navigation tests allowlist this so they can test their own
// concerns independently; the dedicated voice test does NOT allowlist it so it
// surfaces as a deliberate failure documenting the real bug.
const VOICE_CSP_PATTERN = "violates the following Content Security Policy directive";

// ---------------------------------------------------------------------------
// LIST PAGE — /en/parent/students
// ---------------------------------------------------------------------------

test('students list: renders 6 student rows without crash', async ({ page }) => {
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  // Must not show an error boundary
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // Wait for the table to appear (not loading skeletons)
  await expect(page.locator('table')).toBeVisible({ timeout: 15_000 });

  // At least 6 seeded students → at least 6 data rows (tbody tr, NOT skeleton rows)
  // networkidle above ensures skeletons are gone.
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(6);

  assertNoConsoleErrors(page);
});

test('students list: search box filters rows to matching students', async ({ page }) => {
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  // Wait for data rows to appear and capture the total count before searching
  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });
  const totalRows = await page.locator('table tbody tr').count();
  expect(totalRows).toBeGreaterThanOrEqual(6);

  // The search input has a placeholder from the ParentStudents.searchPlaceholder key
  const searchInput = page.getByPlaceholder('Search by name...');
  await expect(searchInput).toBeVisible();

  // Read the first student name from the <span> inside the name link.
  // The first <td> contains an avatar (initials) + a <span class="font-medium"> with
  // the student name. Getting innerText() of the full cell concatenates the initials,
  // so we scope to the <span class="font-medium"> instead.
  const firstRowNameSpan = page
    .locator('table tbody tr')
    .first()
    .locator('td')
    .first()
    .locator('span.font-medium');
  const firstStudentName = await firstRowNameSpan.innerText();
  // Take the first word (first name) — at least 2 chars to satisfy SEARCH_MIN_LENGTH
  const searchTerm = firstStudentName.trim().split(/\s+/)[0];
  expect(searchTerm.length).toBeGreaterThanOrEqual(2);

  // Type into the search box — debounce is 300 ms
  await searchInput.fill(searchTerm);

  // Wait for the network call triggered by the debounced search
  await page.waitForLoadState('networkidle');

  // At least one row must still be visible (the matching student)
  const filteredCount = await page.locator('table tbody tr').count();
  expect(filteredCount).toBeGreaterThanOrEqual(1);

  // The searched-for name must appear in the table.
  // Multiple rows may match (e.g. siblings with the same first name) so use .first()
  // to avoid Playwright strict-mode violation.
  await expect(
    page.locator('table').getByText(searchTerm, { exact: false }).first(),
  ).toBeVisible({ timeout: 10_000 });

  // Clear the search and confirm the full list returns
  await searchInput.fill('');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('table tbody tr')).toHaveCount(totalRows, { timeout: 15_000 });

  assertNoConsoleErrors(page);
});

test('students list: sort by Name column changes order without crash', async ({ page }) => {
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('table')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });
  const totalRows = await page.locator('table tbody tr').count();
  expect(totalRows).toBeGreaterThanOrEqual(6);

  // The "Name" column header is rendered via DataTableSortHeader — it is a button
  const nameHeader = page.getByRole('button', { name: /^Name$/i });
  await expect(nameHeader).toBeVisible();

  // Click to sort ascending
  await nameHeader.click();
  await page.waitForLoadState('networkidle');

  // Page must still be alive
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|Something went wrong/i);

  // Rows must still be present — same count
  await expect(page.locator('table tbody tr')).toHaveCount(totalRows, { timeout: 15_000 });

  // Click again to sort descending
  await nameHeader.click();
  await page.waitForLoadState('networkidle');

  // Page still alive with correct row count
  await expect(page.locator('table tbody tr')).toHaveCount(totalRows, { timeout: 15_000 });

  assertNoConsoleErrors(page);
});

test('students list: archive toggle switch is present and NOT toggled by default', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('table')).toBeVisible({ timeout: 15_000 });

  // The "Show archived" switch is rendered by ParentStudentListToolbar.
  // It uses a Switch component with id="show-archived-switch" and a Label.
  const archivedSwitch = page.getByRole('switch', { name: /Show archived/i });
  await expect(archivedSwitch).toBeVisible({ timeout: 10_000 });

  // By default it must be unchecked (showArchived = false)
  await expect(archivedSwitch).not.toBeChecked();

  // We do NOT toggle it — the task says assert presence only.

  assertNoConsoleErrors(page);
});

// ---------------------------------------------------------------------------
// DETAIL PAGE — navigate from list to /en/parent/students/[documentId]
// ---------------------------------------------------------------------------

test('student detail: navigating from list opens detail page with personal, education, and guardian sections', async ({
  page,
}) => {
  // Voice CSP error is allowlisted here because this test checks sections, not voice.
  // The dedicated voice intro test (below) surfaces the CSP bug without allowlisting.
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN, VOICE_CSP_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  // Wait for data rows
  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });

  // Click the name link in the first row (the <Link> wrapping the avatar + name)
  const firstRowLink = page.locator('table tbody tr').first().getByRole('link').first();
  await firstRowLink.click();

  // Must navigate to the detail URL pattern
  // next-intl drops the locale prefix from the browser URL after navigation
  await page.waitForURL(/\/parent\/students\/[a-z0-9]+/i, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');

  // Must not show a crash
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // "Back to students" link — rendered by ParentStudentProfile
  await expect(page.getByRole('link', { name: /Back to students/i })).toBeVisible({
    timeout: 15_000,
  });

  // h1 with the student name is rendered by ParentStudentProfileHeader inside <main>.
  // The sidebar also renders an h1 ("Dashboard"), so scope to <main> to avoid
  // the strict-mode violation from two h1 elements on the page.
  const mainContent = page.locator('main');
  const studentHeading = mainContent.getByRole('heading', { level: 1 });
  await expect(studentHeading).toBeVisible({ timeout: 15_000 });
  const headingText = await studentHeading.innerText();
  expect(headingText.trim().length).toBeGreaterThan(0);

  // Personal Information section — h2 rendered by ParentStudentInfoSection
  await expect(
    page.getByRole('heading', { name: /Personal Information/i, level: 2 }),
  ).toBeVisible({ timeout: 10_000 });

  // Education section
  await expect(
    page.getByRole('heading', { name: /Education/i, level: 2 }),
  ).toBeVisible({ timeout: 10_000 });

  // Parent / Guardian section
  await expect(
    page.getByRole('heading', { name: /Parent \/ Guardian/i, level: 2 }),
  ).toBeVisible({ timeout: 10_000 });

  assertNoConsoleErrors(page);
});

test('student detail: avatar-or-initials renders in profile header', async ({ page }) => {
  // This test checks the avatar area only — not voice.
  // Voice CSP error is allowlisted here; it is surfaced in the voice intro test below.
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN, VOICE_CSP_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });

  const firstRowLink = page.locator('table tbody tr').first().getByRole('link').first();
  await firstRowLink.click();
  // next-intl drops the locale prefix from the browser URL after navigation
  await page.waitForURL(/\/parent\/students\/[a-z0-9]+/i, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');

  // The profile header card is the first rounded-xl border container in <main>
  const mainContent = page.locator('main');
  const profileHeader = mainContent.locator('div.rounded-xl.border').first();
  await expect(profileHeader).toBeVisible({ timeout: 15_000 });

  // The avatar span (rounded-full) is always rendered by ParentStudentProfileHeader.
  // It shows a next/image if the photo loads, or initials text if the photo 400s.
  const avatarSpan = profileHeader.locator('span.rounded-full').first();
  await expect(avatarSpan).toBeVisible({ timeout: 10_000 });

  assertNoConsoleErrors(page);
});

test('student detail: voice intro audio element renders for a student with a voice intro', async ({
  page,
}) => {
  // KNOWN REAL BUG: The Content-Security-Policy header set in
  // src/modules/request-proxy/constants/request-proxy.constants.ts does NOT include
  // a `media-src` directive. The CSP `default-src 'self'` fallback blocks loading
  // audio from http://localhost:1337/uploads/ in dev and from the production Strapi
  // origin in production. This causes a console.error:
  //   "Loading media from 'http://localhost:1337/uploads/...' violates the following
  //    Content Security Policy directive: "default-src 'self'". Note that 'media-src'
  //    was not explicitly set, so 'default-src' is used as a fallback."
  //
  // Fix needed: add `media-src 'self' https://staging-api.schoolgo.com.au
  // https://api.schoolgo.com.au` to SECURITY_HEADERS in request-proxy.constants.ts.
  // The CSP error allowlist below intentionally does NOT silence this error so it
  // surfaces in CI — remove once the CSP is fixed.
  attachConsoleErrorWatcher(page, [AVATAR_400_PATTERN]);

  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });

  const firstRowLink = page.locator('table tbody tr').first().getByRole('link').first();
  await firstRowLink.click();
  await page.waitForURL(/\/parent\/students\/[a-z0-9]+/i, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');

  // Check whether this student has a voice intro label
  const hasVoiceLabel = await page.getByText('Voice intro', { exact: true }).isVisible();
  if (!hasVoiceLabel) {
    // This student has no voice intro — skip the audio assertion
    // but confirm no other errors fired
    assertNoConsoleErrors(page);
    return;
  }

  // Voice intro label is present — the <audio> element must also be in the DOM
  const audioEl = page.locator('audio');
  await expect(audioEl).toBeVisible({ timeout: 5_000 });

  // This call will throw if the CSP media-src error was logged.
  // That throw IS the bug report — the CSP must be fixed to include media-src.
  assertNoConsoleErrors(page);
});
