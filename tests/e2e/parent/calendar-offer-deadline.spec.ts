/**
 * E2E: Parent calendar shows an offer-deadline event for an offer_made app.
 *
 * Auth fixture: the `setup` project writes tests/e2e/.auth/parent.json and the
 * `parent` project loads it, so this spec starts logged in as parent@schoolgo.test.
 *
 * Seeded fixture (verified in DB):
 *   application documentId vy00f06ft3gqtmndn1utu6qd
 *     - status        = offer_made
 *     - offer_deadline = 2026-06-15
 *     - owned by parent@schoolgo.test (via student link)
 *
 * The aggregate maps offerDeadline -> a `deadline` CalendarEvent rendered in the
 * agenda with the localized "Offer deadline" badge and a link to the application.
 */
import { test, expect } from '@playwright/test';
import { attachConsoleErrorWatcher, assertNoConsoleErrors, shot, waitForApp } from './_helpers';

const CALENDAR_URL = '/en/parent/calendar';
const APPLICATION_DOC_ID = 'vy00f06ft3gqtmndn1utu6qd';
const DEADLINE_BADGE = 'Offer deadline';

test('calendar agenda renders an offer-deadline event linking to the offer_made application', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  await page.goto(CALENDAR_URL);
  await waitForApp(page);

  // The deadline event renders as an agenda <a> linking to the application.
  const deadlineLink = page.locator(`a[href$="/parent/applications/${APPLICATION_DOC_ID}"]`).filter({
    hasText: DEADLINE_BADGE,
  });
  await expect(deadlineLink).toBeVisible({ timeout: 20_000 });

  // The localized deadline badge text is present on that event.
  await expect(deadlineLink.getByText(DEADLINE_BADGE)).toBeVisible();

  await shot(page, 'parent-calendar-offer-deadline');

  assertNoConsoleErrors(page);
});
