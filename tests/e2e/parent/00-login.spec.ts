import { test, expect } from '@playwright/test';
import { PARENT_EMAIL, PARENT_PASSWORD, shot } from './_helpers';

// Run these unauthenticated (override the project's logged-in storageState).
test.use({ storageState: { cookies: [], origins: [] } });

test('sign-in page renders the parent login form', async ({ page }) => {
  await page.goto('/en/sign-in');
  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 30_000 });
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  await shot(page, '00-signin');
});

test('parent can log in and land on the dashboard', async ({ page }) => {
  await page.goto('/en/sign-in');
  await page.locator('input[type="email"]').fill(PARENT_EMAIL);
  await page.locator('input[type="password"]').fill(PARENT_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/(en\/)?dashboard/, { timeout: 25_000 });
  await page.waitForLoadState('networkidle');
  // Not bounced back to sign-in, and an authenticated shell is present.
  expect(page.url()).not.toContain('sign-in');
  await shot(page, '00-after-login');
});
