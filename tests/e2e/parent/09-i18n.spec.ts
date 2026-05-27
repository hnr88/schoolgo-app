import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('parent dashboard renders under a non-English locale', async ({ page }) => {
  // Visit the Thai locale directly; storageState (auth) applies on the same origin.
  await page.goto('/th/parent/dashboard');
  await page.waitForLoadState('networkidle');

  // next-intl sets <html lang> to the active locale.
  await expect(page.locator('html')).toHaveAttribute('lang', 'th', { timeout: 15_000 });

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);
  // No raw i18n keys leaked into the UI.
  expect(body).not.toMatch(/Parent(Nav|Dashboard|Students)\.[a-zA-Z]/);
  await shot(page, '09-i18n-th-dashboard');
});
