import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('parent dashboard renders with seeded summary data', async ({ page }) => {
  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // Seeded students should surface somewhere on the dashboard summary.
  await expect(page.getByText(/Aarav|Sharma/).first()).toBeVisible({ timeout: 15_000 });
  await shot(page, '01-dashboard');
});
