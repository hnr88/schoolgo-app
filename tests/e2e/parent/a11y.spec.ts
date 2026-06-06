import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility sweep (WCAG 2.2 AA) across every parent-portal page enumerated
 * in the build GAP (portalPages.parent) at desktop (1440) + mobile (375).
 * Runs axe-core and FAILS on any serious/critical violation; moderate/minor
 * violations are logged as report output only (non-gating). Authenticated via
 * the shared parent storageState (parent project).
 */

// A seeded application owned by the parent fixture (parent@schoolgo.test),
// verified to render full detail in parent/application-detail.spec.ts.
const APPLICATION_DOC_ID = 'dxrtqut51x597ppfn5qhm1hm';

const PAGES: { name: string; path: string }[] = [
  { name: 'dashboard', path: '/en/parent/dashboard' },
  { name: 'search', path: '/en/parent/search' },
  { name: 'compare', path: '/en/parent/compare' },
  { name: 'applications', path: '/en/parent/applications' },
  { name: 'application-detail', path: `/en/parent/applications/${APPLICATION_DOC_ID}` },
  { name: 'offers', path: '/en/parent/offers' },
  { name: 'messages', path: '/en/parent/messages' },
  { name: 'calendar', path: '/en/parent/calendar' },
  { name: 'documents', path: '/en/parent/documents' },
  { name: 'results', path: '/en/parent/results' },
  { name: 'students', path: '/en/parent/students' },
  { name: 'students-new', path: '/en/parent/students/new' },
  { name: 'settings', path: '/en/parent/settings' },
  { name: 'notifications', path: '/en/parent/notifications' },
  { name: 'saved-schools', path: '/en/parent/saved-schools' },
  { name: 'saved-searches', path: '/en/parent/saved-searches' },
  { name: 'payments', path: '/en/parent/payments' },
];

const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const vp of VIEWPORTS) {
  for (const p of PAGES) {
    test(`a11y ${p.name} @ ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);

      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      const advisory = results.violations.filter(
        (v) => v.impact !== 'serious' && v.impact !== 'critical',
      );

      if (advisory.length > 0) {
        const advisorySummary = advisory
          .map((v) => `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`)
          .join('\n');
        console.info(`[a11y] ${p.name} @ ${vp.label} — moderate/minor (non-gating):\n${advisorySummary}`);
      }

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
