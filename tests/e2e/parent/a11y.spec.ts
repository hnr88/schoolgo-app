import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility sweep (WCAG 2.2 AA) across parent pages at desktop + mobile.
 * Runs axe-core and fails on any serious/critical violation. Authenticated via
 * the shared parent storageState (chromium project).
 */
const PAGES: { name: string; path: string }[] = [
  { name: 'dashboard', path: '/en/parent/dashboard' },
  { name: 'students', path: '/en/parent/students' },
  { name: 'students-new', path: '/en/parent/students/new' },
  { name: 'applications', path: '/en/parent/applications' },
  { name: 'results', path: '/en/parent/results' },
  { name: 'settings', path: '/en/parent/settings' },
  { name: 'notifications', path: '/en/parent/notifications' },
  { name: 'saved-schools', path: '/en/parent/saved-schools' },
  { name: 'saved-searches', path: '/en/parent/saved-searches' },
  { name: 'payments', path: '/en/parent/payments' },
  { name: 'search-spec', path: '/en/parent/search?preview=spec' },
];

const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

for (const vp of VIEWPORTS) {
  for (const p of PAGES) {
    test(`a11y ${p.name} @ ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      if (serious.length > 0) {
        const summary = serious
          .map(
            (v) =>
              `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))\n    e.g. ${v.nodes[0]?.target?.join(' ')}`,
          )
          .join('\n');
        console.error(`\n[a11y] ${p.name} @ ${vp.label} — ${serious.length} serious/critical:\n${summary}`);
      }
      expect(serious, `serious/critical a11y violations on ${p.name} @ ${vp.label}`).toEqual([]);
    });
  }
}
