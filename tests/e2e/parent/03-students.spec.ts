import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('students list shows the parent’s seeded students', async ({ page }) => {
  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  await expect(page.getByText('Aarav').first()).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText('Diya').first()).toBeVisible();
  await shot(page, '03-students-list');
});

test('student profile opens from the list', async ({ page }) => {
  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');

  await page.getByText('Aarav').first().click();
  await page.waitForURL(/\/parent\/students\/[a-z0-9]+/i, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);
  await expect(page.getByText('Aarav').first()).toBeVisible();
  await shot(page, '03-student-profile');
});
