import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Diagnostic route-crawl for the runtime truth-pass (run-overhaul). NOT a real
// assertion spec: it visits every protected route under the portal's
// storageState and RECORDS per-route health (http status, redirect-to-signin,
// console errors, failed /api calls, blank-body detection) so the operator gets
// a ground-truth frontend punch-list. Reports + screenshots go to /tmp (NEVER
// inside the app dir — Turbopack watches it and would reload-loop).

const OUT_DIR = '/tmp/schoolgo-crawl';

export interface RouteRecord {
  route: string;
  httpStatus: number;
  finalPath: string;
  redirectedToSignIn: boolean;
  bodyTextLen: number;
  headingCount: number;
  firstHeading: string;
  consoleErrors: string[];
  failedApi: { path: string; status: number }[];
}

export function runCrawl(portal: string, routes: string[]): void {
  test(`crawl-${portal}`, async ({ page }) => {
    test.setTimeout(routes.length * 35_000 + 60_000);
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const records: RouteRecord[] = [];

    for (const route of routes) {
      const consoleErrors: string[] = [];
      const failedApi: { path: string; status: number }[] = [];
      const onConsole = (msg: { type: () => string; text: () => string }) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300));
      };
      const onPageErr = (err: { message: string }) =>
        consoleErrors.push(`[pageerror] ${err.message.slice(0, 300)}`);
      const onResp = (r: { url: () => string; status: () => number }) => {
        const u = r.url();
        if (u.includes('/api/') && r.status() >= 400) {
          failedApi.push({ path: u.replace(/^https?:\/\/[^/]+/, ''), status: r.status() });
        }
      };
      page.on('console', onConsole);
      page.on('pageerror', onPageErr);
      page.on('response', onResp);

      let httpStatus = 0;
      try {
        const resp = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 45_000 });
        httpStatus = resp?.status() ?? 0;
      } catch (e) {
        consoleErrors.push(`[goto-failed] ${String(e).slice(0, 200)}`);
      }
      try {
        await page.waitForLoadState('networkidle', { timeout: 15_000 });
      } catch {
        /* settle anyway */
      }
      await page.waitForTimeout(700);

      const finalPath = page.url().replace(/^https?:\/\/[^/]+/, '');
      const bodyText = (await page.locator('body').innerText().catch(() => '')) || '';
      const headings = await page.locator('h1, h2').allInnerTexts().catch(() => []);
      const slug = route.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '');
      await page
        .screenshot({ path: path.join(OUT_DIR, `${portal}-${slug}.png`), fullPage: true })
        .catch(() => undefined);

      records.push({
        route,
        httpStatus,
        finalPath,
        redirectedToSignIn: /sign-in|sign_in|login/.test(finalPath),
        bodyTextLen: bodyText.trim().length,
        headingCount: headings.length,
        firstHeading: (headings[0] ?? '').slice(0, 80),
        consoleErrors,
        failedApi,
      });

      page.off('console', onConsole);
      page.off('pageerror', onPageErr);
      page.off('response', onResp);
    }

    fs.writeFileSync(
      path.join(OUT_DIR, `crawl-${portal}.json`),
      JSON.stringify(records, null, 2),
    );
    // eslint-disable-next-line no-console
    console.log(`[crawl-${portal}] wrote ${records.length} records to ${OUT_DIR}/crawl-${portal}.json`);
  });
}
