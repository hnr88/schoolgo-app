import { test, expect } from '@playwright/test';

const SHOT_DIR = '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots';

// Raw i18n-key leak pattern: NS.key or NS.nav.key visible as literal text.
const RAW_KEY_RE = /\b[A-Z][A-Za-z]+\.[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)?\b/g;

test('school sidebar shows Analytics + no raw NS.key leaks', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();

  // The dynamic nav key Dashboard.nav.analytics must render as "Analytics".
  await expect(nav.getByText('Analytics', { exact: true })).toBeVisible();

  // Scan sidebar text for raw NS.key leaks.
  const navText = (await nav.innerText()) ?? '';
  const leaks = (navText.match(RAW_KEY_RE) ?? []).filter(
    (m) => /^(Dashboard|ParentNav|Auth|Common|SchoolApplications)\./.test(m),
  );
  expect(leaks, `raw key leaks in school sidebar: ${leaks.join(', ')}`).toEqual([]);

  await page.screenshot({ path: `${SHOT_DIR}/650-school-sidebar-analytics.png`, fullPage: false });
});

test('school application detail renders real labels (vetting/services)', async ({ page }) => {
  await page.goto('/dashboard/applications', { waitUntil: 'networkidle' });
  // Click first application row link if present to reach detail.
  const firstLink = page.locator('a[href*="/dashboard/applications/"]').first();
  if (await firstLink.count()) {
    await firstLink.click();
    await page.waitForLoadState('networkidle');
  }
  const body = (await page.locator('body').innerText()) ?? '';
  const leaks = (body.match(RAW_KEY_RE) ?? []).filter((m) =>
    /^SchoolApplications\./.test(m),
  );
  expect(leaks, `SchoolApplications.* raw key leaks: ${leaks.join(', ')}`).toEqual([]);
  await page.screenshot({ path: `${SHOT_DIR}/650-school-application-detail.png`, fullPage: true });
});
