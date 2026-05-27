import { test, expect } from '@playwright/test';
import { PARENT_PASSWORD, shot } from './_helpers';

test('profile update persists across reload', async ({ page }) => {
  await page.goto('/en/parent/settings');
  await page.waitForLoadState('networkidle');

  const firstName = page.locator('input[name="firstName"]');
  await expect(firstName).toBeVisible({ timeout: 15_000 });

  const newValue = `Priya${Date.now() % 1000}`;
  await firstName.fill(newValue);
  await page.getByRole('button', { name: /save/i }).click();
  await page.waitForTimeout(1500);
  await shot(page, '07-settings-profile');

  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('input[name="firstName"]')).toHaveValue(newValue, { timeout: 15_000 });
});

test('notification preferences can be toggled and saved', async ({ page }) => {
  await page.goto('/en/parent/settings');
  await page.waitForLoadState('networkidle');

  // Preferences live behind a tab.
  await page.getByRole('tab', { name: 'Preferences' }).click();
  const smsSwitch = page.getByRole('switch').nth(1);
  await expect(smsSwitch).toBeVisible({ timeout: 15_000 });

  const before = await smsSwitch.getAttribute('aria-checked');
  await smsSwitch.click();
  await page.getByRole('button', { name: /save/i }).click();
  await page.waitForTimeout(1500);
  await shot(page, '07-settings-preferences');

  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.getByRole('tab', { name: 'Preferences' }).click();
  const after = await page.getByRole('switch').nth(1).getAttribute('aria-checked');
  expect(after).not.toEqual(before);
});

test('change password succeeds and reverts (JWT rotation keeps session)', async ({ page }) => {
  const tempPassword = 'Temp5678!';
  await page.goto('/en/parent/settings');
  await page.waitForLoadState('networkidle');
  await page.getByRole('tab', { name: 'Password' }).click();

  const current = page.locator('input[name="currentPassword"]');
  await expect(current).toBeVisible({ timeout: 15_000 });

  await current.fill(PARENT_PASSWORD);
  await page.locator('input[name="password"]').fill(tempPassword);
  await page.locator('input[name="passwordConfirmation"]').fill(tempPassword);
  await page.getByRole('button', { name: /change password/i }).click();
  // On success the form resets (fields cleared) — session stays valid via setJwt.
  await expect(page.locator('input[name="currentPassword"]')).toHaveValue('', { timeout: 15_000 });
  await shot(page, '07-settings-password');

  // Revert so the seeded credentials keep working for future runs.
  await page.locator('input[name="currentPassword"]').fill(tempPassword);
  await page.locator('input[name="password"]').fill(PARENT_PASSWORD);
  await page.locator('input[name="passwordConfirmation"]').fill(PARENT_PASSWORD);
  await page.getByRole('button', { name: /change password/i }).click();
  await expect(page.locator('input[name="currentPassword"]')).toHaveValue('', { timeout: 15_000 });
});
