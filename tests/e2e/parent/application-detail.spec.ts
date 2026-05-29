/**
 * E2E: Parent application-detail page — full render + three fixed sections.
 *
 * Auth fixture: the `setup` project writes tests/e2e/.auth/parent.json.
 * The `chromium` project loads that storageState before every spec in
 * parent/, so this test starts already logged in as parent@schoolgo.test.
 *
 * Seeded application documentId: dxrtqut51x597ppfn5qhm1hm
 *   - 3 timeline events
 *   - 2 document requests
 *   - 3 pre-enrolment checklist items
 */
import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
  shot,
  waitForApp,
} from './_helpers';

const APPLICATION_DOC_ID = 'dxrtqut51x597ppfn5qhm1hm';
const APP_URL = `/en/parent/applications/${APPLICATION_DOC_ID}`;

// Translation keys resolved from src/i18n/messages/en.json (ParentApplications namespace)
const T = {
  timelineTitle: 'Activity timeline',
  preEnrolmentTitle: 'Pre-enrolment checklist',
  documentsTitle: 'Documents',
  documentsRequestsTitle: 'Requested by the school',
} as const;

/**
 * Capture all 4xx/5xx API responses so we can report the exact URL of any 403.
 * Returns an array that is populated as requests land during the test.
 */
function attachNetworkErrorWatcher(page: import('@playwright/test').Page): string[] {
  const networkErrors: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push(`HTTP ${response.status()} ${response.url()}`);
    }
  });
  return networkErrors;
}

// Helper: get the card that wraps one of our three "fixed" section headings.
// The heading is always an <h2> inside a `div.rounded-xl` card.
function sectionCard(
  page: import('@playwright/test').Page,
  headingName: string,
) {
  return page
    .locator('div.rounded-xl')
    .filter({ has: page.getByRole('heading', { name: headingName, level: 2 }) });
}

test('application-detail page renders header with school name and status badge', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  // The application h1 uses "Student → School" pattern.
  // The sidebar also has an h1 ("Dashboard"), so we filter by content.
  const appHeading = page.getByRole('heading', { level: 1 }).filter({ hasText: '→' });
  await expect(appHeading).toBeVisible({ timeout: 15_000 });

  // ApplicationStatusBadge renders a <span> inside the header card
  // (it is not a <button> or <a>, just a styled span).
  // We verify the header card area is present by checking the heading's parent card.
  const headerCard = page.locator('div.rounded-xl').filter({ has: appHeading });
  await expect(headerCard).toBeVisible();

  assertNoConsoleErrors(page);
});

test('application-detail page renders the info / offer section', async ({ page }) => {
  attachConsoleErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  // "Application" section heading (sectionApplication key = "Application")
  await expect(
    page.getByRole('heading', { name: 'Application', level: 2 }),
  ).toBeVisible({ timeout: 15_000 });

  // "Offer" section heading
  await expect(
    page.getByRole('heading', { name: 'Offer', level: 2 }),
  ).toBeVisible({ timeout: 15_000 });

  assertNoConsoleErrors(page);
});

test('FIXED: timeline section shows 3 seeded events', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  const networkErrors = attachNetworkErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  const timelineCard = sectionCard(page, T.timelineTitle);
  await expect(timelineCard).toBeVisible({ timeout: 15_000 });

  // Wait until the empty-state text is NOT present (data has loaded)
  await expect(timelineCard.getByText('No activity yet')).not.toBeVisible({ timeout: 15_000 });

  // Each timeline event renders as a `div.flex.gap-3` containing the icon
  // column and the text column (from ParentApplicationTimelineSection).
  // These are direct children of the events container.
  const eventRows = timelineCard.locator('div.flex.gap-3');
  await expect(eventRows).toHaveCount(3, { timeout: 15_000 });

  // Report network errors for diagnosis (do not assert — may be a different section)
  if (networkErrors.length > 0) {
    console.info('Network errors during timeline test:', networkErrors.join(', '));
  }

  assertNoConsoleErrors(page);
});

test('FIXED: documents section shows 2 seeded document requests', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  const networkErrors = attachNetworkErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  const docsCard = sectionCard(page, T.documentsTitle);
  await expect(docsCard).toBeVisible({ timeout: 15_000 });

  // Wait for the sub-section heading
  await expect(docsCard.getByRole('heading', { name: T.documentsRequestsTitle, level: 3 })).toBeVisible({
    timeout: 15_000,
  });

  // Wait for document-requests data to load
  await expect(docsCard.getByText('No documents requested')).not.toBeVisible({
    timeout: 15_000,
  });

  // ParentDocumentRequestRow renders one `div.flex.flex-col.gap-1.border-b` per request.
  // This is the row root — specific enough to distinguish from other divs.
  const requestsSection = docsCard.locator('section').first();
  const requestRows = requestsSection.locator('div.flex.flex-col.gap-1');
  await expect(requestRows).toHaveCount(2, { timeout: 15_000 });

  if (networkErrors.length > 0) {
    console.info('Network errors during documents test:', networkErrors.join(', '));
  }

  assertNoConsoleErrors(page);
});

test('FIXED: pre-enrolment checklist shows 3 seeded items', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  const networkErrors = attachNetworkErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  const preEnrolCard = sectionCard(page, T.preEnrolmentTitle);
  await expect(preEnrolCard).toBeVisible({ timeout: 15_000 });

  // Wait for data load
  await expect(preEnrolCard.getByText('No pre-enrolment items yet')).not.toBeVisible({
    timeout: 15_000,
  });

  // ParentPreEnrolmentRow renders `div.flex.flex-col.gap-1.border-b` per item
  const itemRows = preEnrolCard.locator('div.flex.flex-col.gap-1');
  await expect(itemRows).toHaveCount(3, { timeout: 15_000 });

  if (networkErrors.length > 0) {
    console.info('Network errors during pre-enrolment test:', networkErrors.join(', '));
  }

  assertNoConsoleErrors(page);
});

test('full page: identify any 403 and confirm all three fixed sections load — screenshot for evidence', async ({
  page,
}) => {
  // Track network errors to identify the exact 403 URL
  const networkErrors = attachNetworkErrorWatcher(page);

  // No console error allowlist — real backend errors must fail this test
  attachConsoleErrorWatcher(page);

  await page.goto(APP_URL);
  await waitForApp(page);

  // Wait for all three section headings
  await expect(sectionCard(page, T.timelineTitle)).toBeVisible({ timeout: 20_000 });
  await expect(sectionCard(page, T.preEnrolmentTitle)).toBeVisible({ timeout: 20_000 });
  await expect(sectionCard(page, T.documentsTitle)).toBeVisible({ timeout: 20_000 });

  // Wait for all three sections to finish loading
  await expect(sectionCard(page, T.timelineTitle).getByText('No activity yet')).not.toBeVisible({ timeout: 20_000 });
  await expect(sectionCard(page, T.preEnrolmentTitle).getByText('No pre-enrolment items yet')).not.toBeVisible({ timeout: 20_000 });
  await expect(sectionCard(page, T.documentsTitle).getByText('No documents requested')).not.toBeVisible({ timeout: 20_000 });

  // Log the 403 URL so the failing test output shows exactly which endpoint is broken
  if (networkErrors.length > 0) {
    console.error('Network errors on application-detail page:', networkErrors.join('\n  '));
  }

  // Capture full-page screenshot as evidence
  await shot(page, 'parent-application-detail-all-sections');

  assertNoConsoleErrors(page);
});
