import { existsSync, readFileSync } from 'node:fs';
import type { APIRequestContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { PortalCreds } from './creds';

// Shared, hardened auth bootstrap for the 3 portal setup projects.
//
// Three reliability fixes over the original per-portal setups:
//  1. Short-circuit: if a storageState file already exists and its persisted JWT
//     still validates against /api/users/me with the expected userType, reuse it
//     instead of re-driving the login form (the flaky path that timed out). This
//     also relieves Strapi auth rate-limit pressure for the other verify tasks.
//  2. Robust login wait: a /dashboard URL regex with a generous timeout, then an
//     explicit assertion that we actually left the sign-in screen.
//  3. Re-login resilience: each attempt races the dashboard redirect against the
//     sign-in error alert (Strapi 429 'Too many attempts' / transient 5xx surface
//     there). On the alert we retry with a short backoff (up to 3 attempts) rather
//     than burning the full redirect timeout on a request that already failed.

const DASHBOARD_URL = /\/(en\/)?dashboard/;
const LOGIN_REDIRECT_TIMEOUT = 30_000;
const EMAIL_FIELD_TIMEOUT = 45_000;
const MAX_LOGIN_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = 3_000;

interface PersistedAuthState {
  readonly state?: { readonly jwt?: string; readonly userType?: string };
}

function readPersistedJwt(authFile: string): string | null {
  if (!existsSync(authFile)) return null;
  try {
    const raw = readFileSync(authFile, 'utf8');
    const storageState = JSON.parse(raw) as {
      origins?: { localStorage?: { name: string; value: string }[] }[];
    };
    for (const origin of storageState.origins ?? []) {
      const entry = origin.localStorage?.find((item) => item.name === 'schoolgo-auth');
      if (!entry) continue;
      const persisted = JSON.parse(entry.value) as PersistedAuthState;
      const jwt = persisted.state?.jwt;
      if (typeof jwt === 'string' && jwt.length > 0) return jwt;
    }
  } catch {
    return null;
  }
  return null;
}

async function storedJwtIsValid(
  request: APIRequestContext,
  baseUrl: string,
  jwt: string,
  expectedUserType: string,
): Promise<boolean> {
  try {
    const res = await request.get(`${baseUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
      timeout: 15_000,
    });
    if (!res.ok()) return false;
    const me = (await res.json()) as { userType?: string };
    return me.userType === expectedUserType;
  } catch {
    return false;
  }
}

interface AuthenticateOptions {
  readonly creds: PortalCreds;
  readonly authFile: string;
  readonly expectedUserType: string;
  // Some accounts may have a password left rotated by an interrupted test run.
  readonly fallbackPassword?: string;
}

async function submitLogin(page: Page, creds: PortalCreds, password: string): Promise<void> {
  await page.locator('input[type="email"]').fill(creds.email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
}

// Race the dashboard redirect against the in-form sign-in error alert. Resolves
// 'ok' when the redirect lands first, or 'error' when the form surfaces a failure
// (invalid creds, Strapi 429 'Too many attempts', transient 5xx — all render the
// form's role='alert' summary). Scoped to `form [role="alert"]` so the sonner
// success toast (a body-level portal) can never win the race against the redirect.
async function awaitLoginOutcome(page: Page): Promise<'ok' | 'error'> {
  const redirected = page
    .waitForURL(DASHBOARD_URL, { timeout: LOGIN_REDIRECT_TIMEOUT })
    .then(() => 'ok' as const);
  const errored = page
    .locator('form [role="alert"]')
    .first()
    .waitFor({ state: 'visible', timeout: LOGIN_REDIRECT_TIMEOUT })
    .then(() => 'error' as const);
  const outcome = await Promise.race([redirected, errored]);

  // The alert can surface a beat before the success navigation commits; confirm we
  // are genuinely still on the sign-in screen before treating it as a failure.
  if (outcome === 'error' && DASHBOARD_URL.test(page.url())) return 'ok';
  return outcome;
}

// Drive the sign-in form with the given password, retrying with a short backoff
// when the attempt surfaces the error alert (transient 429/5xx). Returns true once
// the dashboard redirect lands, false if every attempt failed.
async function attemptLogin(page: Page, creds: PortalCreds, password: string): Promise<boolean> {
  for (let attempt = 1; attempt <= MAX_LOGIN_ATTEMPTS; attempt += 1) {
    await expect(page.locator('input[type="password"]')).toBeVisible({ timeout: EMAIL_FIELD_TIMEOUT });
    await submitLogin(page, creds, password);

    if ((await awaitLoginOutcome(page)) === 'ok') return true;

    if (attempt < MAX_LOGIN_ATTEMPTS) {
      await page.waitForTimeout(RETRY_BACKOFF_MS * attempt);
    }
  }
  return false;
}

export async function authenticatePortal(
  page: Page,
  request: APIRequestContext,
  options: AuthenticateOptions,
): Promise<void> {
  const { creds, authFile, expectedUserType, fallbackPassword } = options;

  const existingJwt = readPersistedJwt(authFile);
  if (existingJwt && (await storedJwtIsValid(request, creds.baseUrl, existingJwt, expectedUserType))) {
    return;
  }

  // Navigate to the portal origin absolutely (the 'setup' project has no per-portal
  // baseURL). The proxy resolves the portal by host, so /en/sign-in serves the
  // matching portal sign-in and login maps userType (not the Strapi role).
  await page.goto(`${creds.baseUrl}/en/sign-in`);
  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: EMAIL_FIELD_TIMEOUT });

  let loggedIn = await attemptLogin(page, creds, creds.password);
  if (!loggedIn && fallbackPassword) {
    // The seeded password may have been left rotated by an interrupted test run.
    loggedIn = await attemptLogin(page, creds, fallbackPassword);
  }

  // Confirm we actually left the sign-in screen before snapshotting.
  await expect(page).toHaveURL(DASHBOARD_URL, { timeout: LOGIN_REDIRECT_TIMEOUT });

  // Let zustand persist + initialize() settle before snapshotting storage.
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: authFile });
}
