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
