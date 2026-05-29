/**
 * settings.spec.ts — Comprehensive verification of the parent settings page.
 *
 * Covers three tabs: Profile, Preferences, Password.
 * Auth: storageState from auth.setup.ts (parent@schoolgo.test / Test1234!)
 *
 * Critical invariant: the account MUST be left with its original values.
 * Profile and Preferences tests read the live values first, mutate them, then
 * restore. The Password test exercises client-side validation ONLY — no real
 * password change is submitted.
 */
import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
} from './_helpers';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Navigate to settings and wait until the Profile tab content is visible. */
async function gotoSettings(page: import('@playwright/test').Page) {
  await page.goto('/en/parent/settings');
  // Wait for the page to fully hydrate: the Profile tab is default-open.
  // We know it's ready when the firstName input is visible.
  await expect(page.locator('input[name="firstName"]')).toBeVisible({
    timeout: 20_000,
  });
}

/** Click a tab by its translated label and wait for the panel to mount. */
async function clickTab(
  page: import('@playwright/test').Page,
  label: string | RegExp,
) {
  await page.getByRole('tab', { name: label }).click();
}

/** Wait for the sonner success toast to appear. */
async function waitForSuccessToast(page: import('@playwright/test').Page) {
  // Sonner renders toasts with [data-type="success"] or rich-color classes.
  // The toast text comes from the translation key saveSuccess / passwordSuccess.
  await expect(
    page.locator('[data-sonner-toast]').filter({ hasText: /saved|changed/i }),
  ).toBeVisible({ timeout: 15_000 });
}

// ─── TEST 1: Profile tab ────────────────────────────────────────────────────

test('PROFILE tab: edits persist after reload and account is restored', async ({ page }) => {
  attachConsoleErrorWatcher(page, [
    // Next.js dev-overlay noise
    'hydration',
    // Known: occasional 403 on unrelated endpoints (not settings)
    '403',
  ]);

  await gotoSettings(page);

  // ── Step 1: read the current (original) values ──
  const firstNameInput = page.locator('input[name="firstName"]');
  const lastNameInput = page.locator('input[name="lastName"]');
  const phoneInput = page.locator('input[name="phone"]');

  const originalFirstName = await firstNameInput.inputValue();
  const originalLastName = await lastNameInput.inputValue();
  const originalPhone = await phoneInput.inputValue();

  // ── Step 2: fill in test values ──
  const testFirstName = 'E2EFirst';
  const testLastName = 'E2ELast';
  const testPhone = '+60123456789';

  await firstNameInput.fill(testFirstName);
  await lastNameInput.fill(testLastName);
  await phoneInput.fill(testPhone);

  // ── Step 3: submit and assert success ──
  await page.getByRole('button', { name: /save changes/i }).click();
  await waitForSuccessToast(page);

  // ── Step 4: reload and verify persistence ──
  await page.reload();
  await page.waitForLoadState('networkidle');
  // Profile is the default tab — inputs should be pre-populated.
  await expect(page.locator('input[name="firstName"]')).toHaveValue(testFirstName, {
    timeout: 20_000,
  });
  await expect(page.locator('input[name="lastName"]')).toHaveValue(testLastName);
  await expect(page.locator('input[name="phone"]')).toHaveValue(testPhone);

  // ── Step 5: restore original values ──
  await page.locator('input[name="firstName"]').fill(originalFirstName);
  await page.locator('input[name="lastName"]').fill(originalLastName);
  await page.locator('input[name="phone"]').fill(originalPhone);
  await page.getByRole('button', { name: /save changes/i }).click();
  await waitForSuccessToast(page);

  // ── Step 6: verify restoration ──
  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('input[name="firstName"]')).toHaveValue(originalFirstName, {
    timeout: 20_000,
  });
  await expect(page.locator('input[name="lastName"]')).toHaveValue(originalLastName);
  await expect(page.locator('input[name="phone"]')).toHaveValue(originalPhone);

  assertNoConsoleErrors(page);
});

// ─── TEST 2: Preferences tab ────────────────────────────────────────────────

test('PREFERENCES tab: notification toggles persist after reload and are restored', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page, ['hydration', '403']);

  await gotoSettings(page);

  // ── Step 1: navigate to the Preferences tab ──
  await clickTab(page, /preferences/i);

  // The email switch has aria-label "Email notifications"
  // The sms switch has aria-label "SMS notifications"
  const emailSwitch = page.getByRole('switch', { name: /email notifications/i });
  const smsSwitch = page.getByRole('switch', { name: /sms notifications/i });

  await expect(emailSwitch).toBeVisible({ timeout: 15_000 });
  await expect(smsSwitch).toBeVisible();

  // ── Step 2: read original states via data-* attribute (Base UI Switch) ──
  // Base UI Switch renders data-checked when on, data-unchecked when off.
  const originalEmailChecked = await emailSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );
  const originalSmsChecked = await smsSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );

  // ── Step 3: toggle both switches to different state ──
  await emailSwitch.click();
  await smsSwitch.click();

  // Verify the visual state changed before submitting
  const newEmailChecked = await emailSwitch.evaluate((el) => el.hasAttribute('data-checked'));
  const newSmsChecked = await smsSwitch.evaluate((el) => el.hasAttribute('data-checked'));
  expect(newEmailChecked).toBe(!originalEmailChecked);
  expect(newSmsChecked).toBe(!originalSmsChecked);

  // ── Step 4: submit ──
  await page.getByRole('button', { name: /save changes/i }).click();
  await waitForSuccessToast(page);

  // ── Step 5: reload and verify persistence ──
  await page.reload();
  await page.waitForLoadState('networkidle');
  await clickTab(page, /preferences/i);

  const reloadedEmailSwitch = page.getByRole('switch', { name: /email notifications/i });
  const reloadedSmsSwitch = page.getByRole('switch', { name: /sms notifications/i });

  await expect(reloadedEmailSwitch).toBeVisible({ timeout: 15_000 });

  const persistedEmailChecked = await reloadedEmailSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );
  const persistedSmsChecked = await reloadedSmsSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );

  expect(persistedEmailChecked).toBe(!originalEmailChecked);
  expect(persistedSmsChecked).toBe(!originalSmsChecked);

  // ── Step 6: restore original states ──
  // Re-toggle both back to original
  await reloadedEmailSwitch.click();
  await reloadedSmsSwitch.click();
  await page.getByRole('button', { name: /save changes/i }).click();
  await waitForSuccessToast(page);

  // ── Step 7: verify restoration ──
  await page.reload();
  await page.waitForLoadState('networkidle');
  await clickTab(page, /preferences/i);

  const restoredEmailSwitch = page.getByRole('switch', { name: /email notifications/i });
  const restoredSmsSwitch = page.getByRole('switch', { name: /sms notifications/i });

  await expect(restoredEmailSwitch).toBeVisible({ timeout: 15_000 });

  const restoredEmailChecked = await restoredEmailSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );
  const restoredSmsChecked = await restoredSmsSwitch.evaluate(
    (el) => el.hasAttribute('data-checked'),
  );

  expect(restoredEmailChecked).toBe(originalEmailChecked);
  expect(restoredSmsChecked).toBe(originalSmsChecked);

  assertNoConsoleErrors(page);
});

// ─── TEST 3: Password tab — client-side validation only ─────────────────────

test('PASSWORD tab: mismatched confirmation shows validation error', async ({ page }) => {
  attachConsoleErrorWatcher(page, ['hydration', '403']);

  await gotoSettings(page);
  await clickTab(page, /password/i);

  const currentPasswordInput = page.locator('input[name="currentPassword"]');
  await expect(currentPasswordInput).toBeVisible({ timeout: 15_000 });

  // Fill with a mismatched confirmation — do NOT use the real current password
  // to avoid accidentally triggering an API call if validation somehow passes.
  await page.locator('input[name="currentPassword"]').fill('AnyCurrentPass1!');
  await page.locator('input[name="password"]').fill('NewPass123!');
  await page.locator('input[name="passwordConfirmation"]').fill('DifferentPass456!');

  await page.getByRole('button', { name: /change password/i }).click();

  // Client-side Zod validation should fire before any API call.
  // FormMessage renders a plain <p> with class text-destructive — locate by text.
  // The error message is defined in password.schema.ts: "Passwords do not match"
  await expect(page.getByText(/passwords do not match/i)).toBeVisible({
    timeout: 5_000,
  });

  assertNoConsoleErrors(page);
});

test('PASSWORD tab: too-short new password shows validation error', async ({ page }) => {
  attachConsoleErrorWatcher(page, ['hydration', '403']);

  await gotoSettings(page);
  await clickTab(page, /password/i);

  await expect(page.locator('input[name="currentPassword"]')).toBeVisible({ timeout: 15_000 });

  // PASSWORD_MIN_LENGTH is 6 — submit with a 3-char new password
  await page.locator('input[name="currentPassword"]').fill('AnyCurrentPass1!');
  await page.locator('input[name="password"]').fill('abc');
  await page.locator('input[name="passwordConfirmation"]').fill('abc');

  await page.getByRole('button', { name: /change password/i }).click();

  // Error message from schema: "Password must be at least 6 characters"
  await expect(page.getByText(/at least \d+ characters/i)).toBeVisible({
    timeout: 5_000,
  });

  assertNoConsoleErrors(page);
});

test('PASSWORD tab: empty current password shows required validation error', async ({ page }) => {
  attachConsoleErrorWatcher(page, ['hydration', '403']);

  await gotoSettings(page);
  await clickTab(page, /password/i);

  await expect(page.locator('input[name="currentPassword"]')).toBeVisible({ timeout: 15_000 });

  // Leave currentPassword empty, fill valid new password
  await page.locator('input[name="password"]').fill('ValidPass1!');
  await page.locator('input[name="passwordConfirmation"]').fill('ValidPass1!');

  await page.getByRole('button', { name: /change password/i }).click();

  // Error message from schema: "Current password is required"
  await expect(page.getByText(/current password is required/i)).toBeVisible({
    timeout: 5_000,
  });

  assertNoConsoleErrors(page);
});
