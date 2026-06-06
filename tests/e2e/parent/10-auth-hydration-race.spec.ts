import { test, expect } from '@playwright/test';
import { PARENT } from '../_shared/creds';

// Regression for the hard-nav hydration bounce (task 609): a full page load
// (page.goto, not client nav) of a deep protected route must NOT redirect an
// authenticated parent to /sign-in while the Zustand auth store rehydrates from
// localStorage. The redirect is gated on isHydrated && isInitialized, and a
// transient /api/users/me failure must NOT wipe the persisted JWT — only a real
// 401 clears the session.

const SIGN_IN_URL = /\/(en\/)?sign-in/;
const DEEP_URL = /\/parent\/applications\/[a-z0-9]{10,}/i;

async function readStoredJwt(page: import('@playwright/test').Page): Promise<string | null> {
  return page.evaluate(() => {
    const raw = window.localStorage.getItem('schoolgo-auth');
    if (!raw) return null;
    try {
      return (JSON.parse(raw) as { state?: { jwt?: string | null } }).state?.jwt ?? null;
    } catch {
      return null;
    }
  });
}

test('hard reloads of a deep protected route never bounce an authed parent and preserve the JWT', async ({
  page,
}) => {
  // Reach a real application detail URL through the UI so the deep id is valid
  // and owned by the seeded parent.
  await page.goto('/en/parent/applications');
  await page.waitForLoadState('networkidle');
  await page.locator('a[href*="/parent/applications/"]').first().click();
  await page.waitForURL(DEEP_URL, { timeout: 15_000 });
  const deepUrl = page.url();

  const jwtBefore = await readStoredJwt(page);
  expect(jwtBefore).toBeTruthy();

  // ~6 reloads mixing rapid hard-loads and settled single reloads. None must
  // bounce to /sign-in and the persisted JWT must survive every reload.
  for (let i = 0; i < 6; i += 1) {
    await page.goto(deepUrl);
    if (i % 2 === 0) {
      // Settled reload: let initialize() + render fully complete.
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2_500);
    } else {
      // Rapid reload: assert on commit before the store has time to settle.
      await page.waitForLoadState('domcontentloaded');
    }

    expect(page.url(), `reload ${i} bounced to sign-in`).not.toMatch(SIGN_IN_URL);
    await expect(page).toHaveURL(DEEP_URL);

    const jwtAfter = await readStoredJwt(page);
    expect(jwtAfter, `reload ${i} wiped the persisted JWT`).toBe(jwtBefore);
  }

  // The protected detail content renders after a settled load.
  await page.goto(deepUrl);
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Days in status', { exact: false })).toBeVisible({ timeout: 15_000 });
});

test('logged-out hard-load of a deep protected route still redirects to sign-in', async ({ browser }) => {
  // Explicitly empty storageState => genuinely unauthenticated (the parent
  // project otherwise injects the seeded parent storageState into new contexts).
  const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page = await context.newPage();
  try {
    await page.goto(`${PARENT.baseUrl}/en/parent/applications/vy00f06ft3gqtmndn1utu6qd`);
    await page.waitForURL(SIGN_IN_URL, { timeout: 20_000 });
    await expect(page).toHaveURL(SIGN_IN_URL);
  } finally {
    await context.close();
  }
});
