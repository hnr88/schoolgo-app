import { chromium } from '@playwright/test';
const b = await chromium.launch();
const ctx = await b.newContext({ storageState: 'tests/e2e/.auth/parent.json', viewport: {width:1440,height:900} });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/en/parent/search?preview=spec', { waitUntil:'networkidle', timeout:45000 });
await page.waitForTimeout(2000);
console.log('final URL:', page.url());
console.log('title:', await page.title());
const h1 = await page.locator('h1').allInnerTexts();
console.log('h1s:', JSON.stringify(h1));
const bodyText = (await page.locator('body').innerText()).slice(0, 400);
console.log('body text (400):', JSON.stringify(bodyText));
console.log('header count:', await page.locator('header').count());
console.log('aside count:', await page.locator('aside').count());
console.log('main count:', await page.locator('main').count());
// auth store in localStorage?
const ls = await page.evaluate(() => JSON.stringify(Object.keys(localStorage)));
console.log('localStorage keys:', ls);
await b.close();
