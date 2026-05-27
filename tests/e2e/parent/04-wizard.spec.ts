import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import { FIXTURES, shot } from './_helpers';

async function fillToMediaStep(page: Page) {
  await page.goto('/en/parent/students/new');

  await expect(page.locator('input[name="firstName"]')).toBeVisible({ timeout: 30_000 });
  await page.locator('input[name="firstName"]').fill('Wizardchild');
  await page.locator('input[name="lastName"]').fill('Testkid');
  await page.locator('input[name="nationality"]').fill('India');
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect(page.locator('input[name="targetEntryYear"]')).toBeVisible({ timeout: 15_000 });
  await page.locator('input[name="targetEntryYear"]').fill('2027');
  await page.getByText('Select intake').click();
  await page.getByRole('option', { name: 'Term 1' }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect(page.locator('input[name="parentGuardianName"]')).toBeVisible({ timeout: 15_000 });
  await page.locator('input[name="parentGuardianName"]').fill('Priya Sharma');
  await page.locator('input[name="parentGuardianPhone"]').fill('+61400999888');
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect(page.locator('input[type="file"][accept="image/*"]')).toBeAttached({ timeout: 15_000 });
}

test('wizard creates a student with photo + voice', async ({ page }) => {
  await fillToMediaStep(page);

  // Force the MIME type so the client-side validator accepts the fixtures
  // regardless of Playwright's extension→MIME inference.
  await page.locator('input[type="file"][accept="image/*"]').setInputFiles({
    name: 'photo.png', mimeType: 'image/png', buffer: fs.readFileSync(FIXTURES.photo),
  });
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1, { timeout: 20_000 });

  await page.locator('input[type="file"][accept="audio/*"]').setInputFiles({
    name: 'voice.wav', mimeType: 'audio/wav', buffer: fs.readFileSync(FIXTURES.voice),
  });
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(2, { timeout: 20_000 });
  await expect(page.locator('audio')).toBeAttached();
  await shot(page, '04-wizard-media');

  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await expect(page.getByText('Wizardchild').first()).toBeVisible({ timeout: 15_000 });
  await shot(page, '04-wizard-review');
  await page.getByRole('button', { name: 'Create Student' }).click();

  // Must land on a real student documentId (not stay on /students/new).
  await page.waitForURL(/\/parent\/students\/[a-z0-9]{10,}/i, { timeout: 25_000 });
  expect(page.url()).not.toContain('/students/new');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Wizardchild').first()).toBeVisible();
});

test('media upload shows a localized invalid-type toast', async ({ page }) => {
  await fillToMediaStep(page);
  // An image dropped into the audio slot must be rejected client-side.
  await page.locator('input[type="file"][accept="audio/*"]').setInputFiles({
    name: 'photo.png', mimeType: 'image/png', buffer: fs.readFileSync(FIXTURES.photo),
  });
  await expect(page.getByText(/invalid file type/i)).toBeVisible({ timeout: 10_000 });
  await shot(page, '04-wizard-invalid-toast');
});

test('the newly created student appears in the list', async ({ page }) => {
  await page.goto('/en/parent/students');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Wizardchild').first()).toBeVisible({ timeout: 15_000 });
});
