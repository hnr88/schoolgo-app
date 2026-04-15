import { test, expect } from '@playwright/test';

test('home page renders navbar and search bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /find schools/i })).toBeVisible();
  await expect(
    page.getByPlaceholder(/search by school name/i),
  ).toBeVisible();
});
