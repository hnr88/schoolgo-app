import path from 'node:path';
import { test as setup, expect } from '@playwright/test';
import { PARENT_EMAIL, PARENT_PASSWORD } from './_helpers';

const authFile = path.resolve(__dirname, '../.auth/parent.json');

setup('authenticate parent', async ({ page }) => {
  await page.goto('/en/sign-in');

  // The proxy rewrites /en/sign-in -> /en/parent/sign-in (parent portal default).
  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 45_000 });
  await page.locator('input[type="email"]').fill(PARENT_EMAIL);
  await page.locator('input[type="password"]').fill(PARENT_PASSWORD);
  await page.locator('button[type="submit"]').click();

  // useLogin redirects to portalUrl('parent') + '/dashboard'. If the seeded
  // password was left rotated by an interrupted password test, fall back.
  try {
    await page.waitForURL(/\/(en\/)?dashboard/, { timeout: 12_000 });
  } catch {
    await page.locator('input[type="password"]').fill('Temp5678!');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/\/(en\/)?dashboard/, { timeout: 15_000 });
  }
  // Give zustand persist + initialize() a beat to settle, then persist storage.
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: authFile });
});
