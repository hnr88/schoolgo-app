/**
 * Parent notifications E2E tests.
 *
 * Original seeded state for parent@schoolgo.test: 5 notifications, 3 unread.
 * These tests are designed to be resilient to prior test runs that may have
 * already mutated the read-state — they capture the initial unread count from
 * the bell badge and assert relative transitions (N → N-1 → 0).
 *
 * IMPORTANT: Tests run in declaration order and the suite mutates read-state.
 * Steps 1 & 2 assert the current count BEFORE step 3 clicks anything.
 *
 * Real FE bug found during authoring (do NOT remove ENVIRONMENT_FALLBACK from
 * allowlist until the bug is fixed — see finding at end of file):
 *   NotificationItem calls format.relativeTime(new Date(createdAt)) without a
 *   `now` argument, and next-intl has no global `now` configured. This fires
 *   ENVIRONMENT_FALLBACK console.error once per notification item rendered.
 */
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
} from './_helpers';

/**
 * Return the notification bell <a> scoped to the page <header>.
 * Necessary because the sidebar nav also has a "Notifications" link with the
 * same label, which causes strict-mode violations on getByRole/getByLabel.
 */
function getBell(page: Page) {
  return page.locator('header').getByLabel('Notifications', { exact: true });
}

/**
 * Read the current unread count from the bell badge on the dashboard.
 * Returns 0 if the badge is not present (all-read state).
 */
async function readBellCount(page: Page): Promise<number> {
  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');
  const bell = getBell(page);
  await expect(bell).toBeVisible({ timeout: 15_000 });
  const badge = bell.locator('span').filter({ hasText: /^\d+$/ });
  const count = await badge.count();
  if (count === 0) return 0;
  const text = await badge.first().innerText();
  return parseInt(text, 10);
}

test.describe('parent notifications', () => {
  /**
   * Step 1: Notification bell renders on an authenticated page.
   * - Bell link is always present in the header.
   * - Badge span appears only when unread count > 0; absent when count = 0.
   * - Logs the current count for the report.
   *
   * NOTE: The dashboard page triggers pre-existing backend 400 errors on
   * unrelated endpoints (timeline-events, document-requests filters). These are
   * tracked separately and are consistent with the smoke.spec.ts '403' pattern.
   */
  test('bell renders in header; badge present iff unread > 0', async ({ page }) => {
    attachConsoleErrorWatcher(page, [
      // Pre-existing BE 400s on dashboard (timeline-events / doc-request filter
      // endpoints). Same category as the '403 (Forbidden)' in smoke.spec.ts.
      '400 (Bad Request)',
    ]);

    await page.goto('/en/parent/dashboard');
    await page.waitForLoadState('networkidle');

    // The bell link must always be visible in the header.
    const bell = getBell(page);
    await expect(bell).toBeVisible({ timeout: 15_000 });

    // Read the badge: absent when 0, shows numeric count when > 0.
    const currentCount = await readBellCount(page);
    console.info(`[notifications] Bell unread count at start of suite: ${currentCount}`);

    const badge = bell.locator('span').filter({ hasText: /^\d+$/ });
    if (currentCount > 0) {
      await expect(badge.first()).toBeVisible({ timeout: 5_000 });
      await expect(badge.first()).toHaveText(String(currentCount));
    } else {
      // All read — badge must be absent (hasUnread = false hides the span).
      await expect(badge).toHaveCount(0, { timeout: 5_000 });
    }

    assertNoConsoleErrors(page);
  });

  /**
   * Step 2: Notifications list page renders all 5 seeded items (grouped by
   * date) and shows the correct number of visually-unread items matching the
   * bell badge count.
   *
   * NOTE: ENVIRONMENT_FALLBACK is a real FE bug (format.relativeTime without
   * `now`). Allowlisted here so it doesn't mask other errors; reported below.
   */
  test('notifications list shows 5 total items and unread count matches bell', async ({ page }) => {
    attachConsoleErrorWatcher(page, [
      // Real FE bug: format.relativeTime() called without `now` param in NotificationItem.
      'ENVIRONMENT_FALLBACK',
      // Pre-existing BE 400s triggered when readBellCount navigates to dashboard.
      '400 (Bad Request)',
    ]);

    // Read bell count first (before navigating to the list).
    const initialBellCount = await readBellCount(page);

    await page.goto('/en/parent/notifications');
    await page.waitForLoadState('networkidle');

    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

    // All 5 seeded notifications must render (each has a <time> element).
    await expect(page.locator('time')).toHaveCount(5, { timeout: 15_000 });

    // The number of "Unread" labels must equal the bell badge count.
    await expect(async () => {
      const unreadCount = await page.getByText(/^Unread$/).count();
      expect(unreadCount).toBe(initialBellCount);
    }).toPass({ timeout: 15_000 });
  });

  /**
   * Step 3: Clicking one unread notification fires PUT /api/notifications/:id/read
   * (200) and the unread count decrements by 1 (N → N-1) on both the list and bell.
   */
  test('clicking an unread notification marks it read and decrements count by 1', async ({ page }) => {
    attachConsoleErrorWatcher(page, [
      'ENVIRONMENT_FALLBACK',
      // Pre-existing BE 400s triggered when readBellCount navigates to dashboard.
      '400 (Bad Request)',
    ]);

    const markReadRequests: { url: string; status: number }[] = [];
    page.on('response', (response) => {
      if (
        response.request().method() === 'PUT' &&
        /\/api\/notifications\/[^/]+\/read$/.test(response.url())
      ) {
        markReadRequests.push({ url: response.url(), status: response.status() });
      }
    });

    // Capture the starting unread count from the bell.
    const initialCount = await readBellCount(page);

    // Navigate to list and wait for it to fully load.
    await page.goto('/en/parent/notifications');
    await page.waitForLoadState('networkidle');
    await expect(async () => {
      expect(await page.getByText(/^Unread$/).count()).toBe(initialCount);
    }).toPass({ timeout: 15_000 });

    if (initialCount === 0) {
      // All notifications already read — skip interaction assertions.
      console.warn('[notifications] No unread notifications remain; skipping click test.');
      return;
    }

    // Click the first unread notification (walks up to nearest <a> or <button>).
    // If the item has an entity href, clicking it navigates away to an application
    // or student page — that's correct behaviour. We wait for navigation to settle
    // and then return to the notifications list to verify the count decremented.
    const firstUnreadLabel = page.getByText(/^Unread$/).first();
    const clickTarget = firstUnreadLabel.locator('xpath=ancestor::a | ancestor::button').first();
    await expect(clickTarget).toBeVisible({ timeout: 10_000 });
    await clickTarget.click();

    // Wait for any navigation triggered by the click to settle.
    await page.waitForLoadState('networkidle');

    // The PUT must have fired and returned 200.
    await expect(async () => {
      expect(markReadRequests.length).toBeGreaterThanOrEqual(1);
      expect(markReadRequests[0].status).toBe(200);
    }).toPass({ timeout: 15_000 });

    // Return to notifications list to check the updated unread count.
    await page.goto('/en/parent/notifications');
    await page.waitForLoadState('networkidle');

    // List unread labels must drop by exactly 1.
    const expectedAfter = initialCount - 1;
    await expect(async () => {
      expect(await page.getByText(/^Unread$/).count()).toBe(expectedAfter);
    }).toPass({ timeout: 15_000 });

    // Bell badge on dashboard also shows N-1.
    const bellCountAfter = await readBellCount(page);
    expect(bellCountAfter).toBe(expectedAfter);
  });

  /**
   * Step 4: "Mark all as read" fires PUT /api/notifications/read-all (200)
   * and the bell badge disappears entirely (count → 0).
   */
  test('mark all as read fires PUT read-all and badge disappears', async ({ page }) => {
    attachConsoleErrorWatcher(page, [
      'ENVIRONMENT_FALLBACK',
      // Pre-existing BE 400s on dashboard (same as step 1).
      '400 (Bad Request)',
    ]);

    let readAllStatus = 0;
    page.on('response', (response) => {
      if (
        response.request().method() === 'PUT' &&
        response.url().includes('/api/notifications/read-all')
      ) {
        readAllStatus = response.status();
      }
    });

    await page.goto('/en/parent/notifications');
    await page.waitForLoadState('networkidle');

    // Wait for at least one notification to render.
    await expect(page.locator('time').first()).toBeVisible({ timeout: 15_000 });

    // Click "Mark all as read".
    const markAllBtn = page.getByRole('button', { name: /mark all as read/i });
    await expect(markAllBtn).toBeVisible({ timeout: 10_000 });
    await expect(markAllBtn).toBeEnabled();
    await markAllBtn.click();

    // PUT /api/notifications/read-all must return 200.
    await expect(async () => {
      expect(readAllStatus).toBe(200);
    }).toPass({ timeout: 15_000 });

    // No "Unread" labels must remain after invalidation.
    await expect(async () => {
      expect(await page.getByText(/^Unread$/).count()).toBe(0);
    }).toPass({ timeout: 15_000 });

    // Bell badge must be gone from the dashboard header.
    await page.goto('/en/parent/dashboard');
    await page.waitForLoadState('networkidle');

    const bell = getBell(page);
    await expect(bell).toBeVisible({ timeout: 15_000 });
    const badge = bell.locator('span').filter({ hasText: /^\d+$/ });
    await expect(badge).toHaveCount(0, { timeout: 15_000 });

    assertNoConsoleErrors(page);
  });
});

/*
 * REAL FE BUG FOUND — do not fix in this file, fix in the component:
 *
 * File:    src/modules/notifications/components/NotificationItem.tsx  line 65
 * Code:    format.relativeTime(new Date(createdAt))
 * Error:   IntlError: ENVIRONMENT_FALLBACK: The `now` parameter wasn't
 *          provided to `relativeTime` and there is no global default
 *          configured, therefore the current time will be used as a fallback.
 *
 * Root cause:
 *   next-intl's `useFormatter().relativeTime()` requires either a `now` option
 *   passed to the call site, or a global `now` value configured via
 *   `NextIntlClientProvider now={...}`. Neither is set up in this app.
 *   The component calls `format.relativeTime(new Date(createdAt))` with only
 *   the `date` argument and no `{ now }` option, triggering the fallback path
 *   which emits a console.error for every NotificationItem rendered.
 *
 * Fix (in NotificationItem.tsx):
 *   const now = useNow();   // import { useNow } from 'next-intl';
 *   format.relativeTime(new Date(createdAt), { now })
 *
 *   OR configure a global `now` in the NextIntlClientProvider in the layout.
 */
