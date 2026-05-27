import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('payments page is a static coming-soon view', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (r) => {
    const u = r.url();
    if (u.includes('/api/') && !u.includes('/users/me')) requests.push(u);
  });

  await page.goto('/en/parent/payments');
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);
  await expect(page.getByText(/coming soon/i).first()).toBeVisible({ timeout: 15_000 });
  await shot(page, '08-payments');
});
