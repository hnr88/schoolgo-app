import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ storageState:'tests/e2e/.auth/parent.json', viewport:{width:1440,height:900} });
const page = await ctx.newPage();
for (const path of ['/en/parent/dashboard','/en/parent/settings']) {
  await page.goto('http://localhost:3000'+path,{waitUntil:'networkidle',timeout:45000});
  await page.waitForTimeout(1000);
  const r = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  for (const v of r.violations.filter(v=>['serious','critical'].includes(v.impact))) {
    console.log(`\n### ${path} :: [${v.impact}] ${v.id} — ${v.help}`);
    for (const n of v.nodes.slice(0,3)) {
      console.log('  target:', n.target.join(' '));
      console.log('  html:', n.html.slice(0,160));
      if (n.any?.[0]?.message) console.log('  why:', n.any[0].message.slice(0,140));
    }
  }
}
await b.close();
