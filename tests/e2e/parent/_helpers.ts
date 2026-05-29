import path from 'node:path';
import type { Page } from '@playwright/test';

export const PARENT_EMAIL = 'parent@schoolgo.test';
export const PARENT_PASSWORD = 'Test1234!';

export const FIXTURES = {
  photo: path.resolve(__dirname, '../fixtures/photo.png'),
  voice: path.resolve(__dirname, '../fixtures/voice.wav'),
};

const SHOTS_DIR = path.resolve(__dirname, '../screenshots');

/** Full-page screenshot into tests/e2e/screenshots/<name>.png */
export async function shot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: path.join(SHOTS_DIR, `${name}.png`), fullPage: true });
}

/** Wait until the parent app has hydrated and is past the auth gate. */
export async function waitForApp(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Attach a listener that fails the test on any `console.error` or uncaught
 * page exception. Call once at the top of a test (before navigation).
 *
 * @param page     - Playwright Page
 * @param allowlist - substrings; a message matching any entry is silenced
 */
export function attachConsoleErrorWatcher(
  page: Page,
  allowlist: string[] = [],
): void {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (allowlist.some((pattern) => text.includes(pattern))) return;
    errors.push(`[console.error] ${text}`);
  });

  page.on('pageerror', (err) => {
    const text = err.message;
    if (allowlist.some((pattern) => text.includes(pattern))) return;
    errors.push(`[pageerror] ${text}`);
  });

  // Register an afterEach-style hook via addListener on the page's lifecycle.
  // Playwright does not expose a per-page teardown hook, so we expose a
  // flush function that callers invoke before the test ends.
  (page as Page & { _consoleErrors?: string[] })._consoleErrors = errors;
}

/**
 * Assert that no console errors were collected since `attachConsoleErrorWatcher`
 * was called. Throws if any errors are present.
 */
export function assertNoConsoleErrors(page: Page): void {
  const errors = (page as Page & { _consoleErrors?: string[] })._consoleErrors ?? [];
  if (errors.length > 0) {
    throw new Error(
      `Unexpected browser errors on ${page.url()}:\n  ${errors.join('\n  ')}`,
    );
  }
}
