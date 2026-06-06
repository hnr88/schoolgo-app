import { test, expect } from '@playwright/test';
import crypto from 'crypto';

// VERIFY-404: proctored test-runner UI (start/sync-autosave/submit).
// Drives the real runner against the live backend through the same-origin /api proxy.
// Asserts the autosave-merge fix keeps the runner alive across the first sync.

const SECRET = '2+TXRYhy2DniIS2Y/Q6B/kspIRz9GW98apqEPUjpWaY=';
const STUDENT = 'l1i0z9smo9sehad2nc5j28ku';
const PARENT = 'gmke2n2b28kuaee1lhsxgwyo';
const TEST_DOC = 'x6s5v34ge553j2mzwptrutrl';

function mintStudentJwt(): string {
  const b64 = (i: string) => Buffer.from(i).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    type: 'student',
    studentDocumentId: STUDENT,
    parentDocumentId: PARENT,
    iat: now,
    exp: now + 8 * 3600,
  };
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

test('runner renders, survives autosave, submits and shows score', async ({ page }) => {
  const jwt = mintStudentJwt();
  const persisted = JSON.stringify({
    state: {
      jwt,
      student: {
        documentId: STUDENT,
        firstName: 'Kabir',
        email: 'kabir@schoolgo.test',
        parentDocumentId: PARENT,
      },
    },
    version: 0,
  });

  // Seed the Zustand persist store (sessionStorage) before any app code runs.
  await page.addInitScript((value) => {
    window.sessionStorage.setItem('schoolgo-student-session', value);
  }, persisted);

  const synced: string[] = [];
  const submitted: string[] = [];
  page.on('response', (res) => {
    const u = res.url();
    if (u.includes('/api/student-test-sessions/') && u.endsWith('/responses')) synced.push(String(res.status()));
    if (u.includes('/api/student-test-sessions/') && u.endsWith('/submit')) submitted.push(String(res.status()));
  });

  await page.goto(`/en/test/run?test=${TEST_DOC}`, { waitUntil: 'networkidle' });

  // Q1 renders (radio MCQ). The first option group is for q1.
  await expect(page.getByText('Question 1 of 6')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('The opposite of "ancient" is ___.')).toBeVisible();

  // Answer q1 = modern (correct).
  await page.getByRole('radio', { name: 'modern' }).check();

  // Wait past autosave debounce (1200ms) so the first sync fires.
  await page.waitForResponse(
    (r) => r.url().includes('/api/student-test-sessions/') && r.url().endsWith('/responses'),
    { timeout: 15000 },
  );

  // THE FIX: after autosave, the runner must STILL render (not flip to TestLinkError).
  await expect(page.getByText('Question 1 of 6')).toBeVisible();
  await expect(page.getByText(/could not reach the sign-in service/i)).toHaveCount(0);

  // Advance through all 6 questions to the last, where Submit appears.
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
  const submitBtn = page.getByRole('button', { name: 'Submit test' });
  await expect(submitBtn).toBeVisible();

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/404-runner-q6.png',
    fullPage: true,
  });

  await submitBtn.click();
  await page.waitForResponse(
    (r) => r.url().includes('/api/student-test-sessions/') && r.url().endsWith('/submit'),
    { timeout: 15000 },
  );

  // Score summary renders.
  await expect(page.getByText('Test submitted')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Your test has been scored.')).toBeVisible();

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/404-runner-score.png',
    fullPage: true,
  });

  expect(synced.every((s) => s === '200')).toBeTruthy();
  expect(synced.length).toBeGreaterThan(0);
  expect(submitted).toContain('200');
});
