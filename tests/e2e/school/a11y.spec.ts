import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility sweep (WCAG 2.2 AA) across the school portal at desktop + mobile.
 * Covers every route from GAP portalPages.school — school-dashboard,
 * school-applications (list + every application-detail tab) and school-invoices —
 * under the school storageState (school project / school.localhost subdomain).
 * Fails on any serious/critical violation; moderate/minor are logged only.
 */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const STATIC_PAGES: { name: string; path: string }[] = [
  { name: 'school-dashboard', path: '/dashboard' },
  { name: 'school-applications', path: '/dashboard/applications' },
  { name: 'school-invoices', path: '/dashboard/invoices' },
];

const DETAIL_TABS: { key: string; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'documents', label: 'Documents' },
  { key: 'messages', label: 'Messages' },
  { key: 'timeline', label: 'Timeline' },
];

const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

async function assertNoSeriousCritical(page: Page, label: string): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  const minor = results.violations.filter(
    (v) => v.impact !== 'serious' && v.impact !== 'critical',
  );
  if (minor.length > 0) {
    console.log(
      `[a11y] ${label} — ${minor.length} moderate/minor (non-gating): ${minor
        .map((v) => `${v.impact}:${v.id}`)
        .join(', ')}`,
    );
  }
  if (serious.length > 0) {
    const summary = serious
      .map(
        (v) =>
          `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))\n    e.g. ${v.nodes[0]?.target?.join(' ')}`,
      )
      .join('\n');
    console.error(`\n[a11y] ${label} — ${serious.length} serious/critical:\n${summary}`);
  }
  expect(serious, `serious/critical a11y violations on ${label}`).toEqual([]);
}

for (const vp of VIEWPORTS) {
  for (const p of STATIC_PAGES) {
    test(`a11y ${p.name} @ ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);
      await assertNoSeriousCritical(page, `${p.name} @ ${vp.label}`);
    });
  }

  test(`a11y school-application-detail tabs @ ${vp.label}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/dashboard/applications', { waitUntil: 'networkidle', timeout: 45_000 });
    await page.waitForTimeout(1200);

    const firstRow = page.locator('a[href*="/dashboard/applications/"]').first();
    await expect(firstRow, 'at least one seeded application to open').toBeVisible({
      timeout: 15_000,
    });
    await firstRow.click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('tab').first()).toBeVisible({ timeout: 15_000 });

    for (const tab of DETAIL_TABS) {
      await page.getByRole('tab', { name: tab.label, exact: true }).click();
      await page.waitForTimeout(800);
      await assertNoSeriousCritical(page, `school-application-detail [${tab.key}] @ ${vp.label}`);
    }
  });
}
