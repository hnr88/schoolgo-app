import { test, expect } from '@playwright/test';
import { shot } from './_helpers';

const NAV = [
  { href: '/parent/students', url: /\/parent\/students/ },
  { href: '/parent/applications', url: /\/parent\/applications/ },
  { href: '/parent/results', url: /\/parent\/results/ },
  { href: '/parent/settings', url: /\/parent\/settings/ },
  { href: '/parent/payments', url: /\/parent\/payments/ },
];

test('parent sidebar links to all portal sections', async ({ page }) => {
  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  // Sidebar should expose parent-portal links (portal-aware nav).
  for (const item of NAV) {
    await expect(page.locator(`a[href*="${item.href}"]`).first()).toBeVisible({ timeout: 15_000 });
  }
  await shot(page, '02-sidebar');
});

test('clicking sidebar entries navigates to each section', async ({ page }) => {
  await page.goto('/en/parent/dashboard');
  await page.waitForLoadState('networkidle');

  for (const item of NAV) {
    await page.locator(`a[href*="${item.href}"]`).first().click();
    await page.waitForURL(item.url, { timeout: 15_000 });
    await page.waitForLoadState('networkidle');
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/Application error|could not be found|Something went wrong/i);
  }
});
