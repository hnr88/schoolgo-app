/**
 * Smoke test: authenticated parent dashboard.
 *
 * Auth fixture: the `setup` project in playwright.config.ts runs
 * auth.setup.ts which logs in as parent@schoolgo.test and writes
 * tests/e2e/.auth/parent.json. The `chromium` project loads that
 * storageState before every spec in parent/, so this test starts
 * already logged in — no manual login needed.
 *
 * To use attachConsoleErrorWatcher in your own spec:
 *   import { attachConsoleErrorWatcher, assertNoConsoleErrors } from './_helpers';
 *   // Call before navigation:
 *   attachConsoleErrorWatcher(page);
 *   // Assert at the end of the test:
 *   assertNoConsoleErrors(page);
 */
import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
} from './_helpers';

test('parent dashboard renders without console errors', async ({ page }) => {
  // Attach the watcher BEFORE navigating so all errors are captured.
  attachConsoleErrorWatcher(page, [
    // Silence known-noisy Next.js dev-overlay hydration hints if present.
    'hydration',
    // Known backend permission gaps tracked in Task #1 (applications +
    // test-sessions endpoints not yet granted to the authenticated-user role
    // on the local Strapi instance). Remove once Task #1 is resolved.
    '403 (Forbidden)',
  ]);

  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  // The page must not show a fatal error boundary.
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // A stable heading rendered by ParentDashboard — always present regardless
  // of time-of-day greeting or seeded data.
  await expect(
    page.getByRole('heading', { name: /Quick actions/i }),
  ).toBeVisible({ timeout: 15_000 });

  // Fail the test if any console.error or uncaught error fired.
  assertNoConsoleErrors(page);
});
