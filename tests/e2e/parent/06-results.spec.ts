import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

test('results page renders english test results for a student', async ({ page }) => {
  await page.goto('/en/parent/results');
  await page.waitForLoadState('networkidle');

  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);

  // The student picker is a native <select>; choose the seeded student with results.
  const select = page.getByRole('combobox', { name: 'Student' });
  await expect(select).toBeVisible({ timeout: 15_000 });
  await select.selectOption({ label: 'Aarav Sharma' });
  await page.waitForLoadState('networkidle');

  // Seeded IELTS 7.5 / AEAS results should render for the selected student.
  await expect(page.getByText(/IELTS|7\.5|AEAS/i).first()).toBeVisible({ timeout: 15_000 });
  await shot(page, '06-results');
});
