import { test, expect } from '@playwright/test';

const SHOT_DIR = '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots';

const RAW_KEY_RE = /\b[A-Z][A-Za-z]+\.[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)?\b/g;

test('agent sidebar renders all nav labels with no raw NS.key leaks', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();

  const navText = (await nav.innerText()) ?? '';
  const leaks = (navText.match(RAW_KEY_RE) ?? []).filter(
    (m) => /^(Dashboard|ParentNav|Auth|Common)\./.test(m),
  );
  expect(leaks, `raw key leaks in agent sidebar: ${leaks.join(', ')}`).toEqual([]);

  await page.screenshot({ path: `${SHOT_DIR}/650-agent-sidebar.png`, fullPage: false });
});
