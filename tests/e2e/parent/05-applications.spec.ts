import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('applications list renders statuses and an offer', async ({ page }) => {
  await page.goto('/en/parent/applications');
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);
  await expect(page.getByText(/offer|review|submitted/i).first()).toBeVisible({ timeout: 15_000 });
  await shot(page, '05-applications-list');
});

test('application detail shows a numeric days-in-status (not "undefined")', async ({ page }) => {
  await page.goto('/en/parent/applications');
  await page.waitForLoadState('networkidle');

  // Open the first application via its detail link (robust across table/card layouts).
  await page.locator('a[href*="/parent/applications/"]').first().click();
  await page.waitForURL(/\/parent\/applications\/[a-z0-9]{10,}/i, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');

  // Positive content assertion: the detail actually renders the days-in-status meta.
  await expect(page.getByText('Days in current status')).toBeVisible({ timeout: 15_000 });
  const body = await page.locator('body').innerText();
  expect(body).not.toContain('undefined');
  await shot(page, '05-application-detail');
});
