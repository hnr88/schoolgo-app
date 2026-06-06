import { test, expect } from '@playwright/test';

const SHOT_DIR = '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots';

const RAW_KEY_RE = /\b[A-Z][A-Za-z]+\.[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)?\b/g;

test('parent sidebar shows Tests + no raw NS.key leaks', async ({ page }) => {
  await page.goto('/parent/dashboard', { waitUntil: 'networkidle' });
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();

  // The dynamic nav key ParentNav.tests must render as "Tests".
  await expect(nav.getByText('Tests', { exact: true })).toBeVisible();

  const navText = (await nav.innerText()) ?? '';
  const leaks = (navText.match(RAW_KEY_RE) ?? []).filter(
    (m) => /^(Dashboard|ParentNav|Auth|Common)\./.test(m),
  );
  expect(leaks, `raw key leaks in parent sidebar: ${leaks.join(', ')}`).toEqual([]);

  await page.screenshot({ path: `${SHOT_DIR}/650-parent-sidebar-tests.png`, fullPage: false });
});

test('parent tests page renders real labels', async ({ page }) => {
  await page.goto('/parent/tests', { waitUntil: 'networkidle' });
  await expect(page.locator('body')).toBeVisible();
  const body = (await page.locator('body').innerText()) ?? '';
  const leaks = (body.match(RAW_KEY_RE) ?? []).filter((m) =>
    /^(ParentTests|TestRunner|ParentNav)\./.test(m),
  );
  expect(leaks, `raw key leaks on parent tests page: ${leaks.join(', ')}`).toEqual([]);
  await page.screenshot({ path: `${SHOT_DIR}/650-parent-tests-page.png`, fullPage: true });
});
