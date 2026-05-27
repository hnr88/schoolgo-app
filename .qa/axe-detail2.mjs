import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const b = await chromium.launch();
const targets = [
  ['/en/parent/search?preview=spec', {width:1440,height:900}],
  ['/en/parent/payments', {width:375,height:812}],
];
for (const [path, vp] of targets) {
  const ctx = await b.newContext({ storageState:'tests/e2e/.auth/parent.json', viewport:vp });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000'+path,{waitUntil:'networkidle',timeout:45000});
  await page.waitForTimeout(1500);
  const r = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  for (const v of r.violations.filter(v=>['serious','critical'].includes(v.impact))) {
    console.log(`\n### ${path} @${vp.width} :: [${v.impact}] ${v.id} — ${v.help}`);
    for (const n of v.nodes.slice(0,4)) {
      console.log('  target:', n.target.join(' '));
      console.log('  html:', n.html.slice(0,170));
    }
  }
  await ctx.close();
}
await b.close();
