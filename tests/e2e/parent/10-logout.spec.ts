import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('parent can log out and the gate blocks the protected area', async ({ page }) => {
  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  // Open the account dropdown (Radix trigger) and click Log out.
  await page.locator('[aria-haspopup="menu"]').first().click();
  await page.getByRole('menuitem', { name: /log\s?out|sign\s?out/i }).click();

  await page.waitForURL(/sign-in/, { timeout: 15_000 });
  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 15_000 });
  await shot(page, '10-logout');

  // Visiting a protected route while logged out should bounce back to sign-in.
  await page.goto('/en/parent/dashboard');
  await page.waitForURL(/sign-in/, { timeout: 15_000 });
});
