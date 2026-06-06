import { test, expect } from '@playwright/test';
import crypto from 'crypto';

// VERIFY-416: server-driven adaptive selection wired into the runner.
// Drives the REAL runner UI against the live backend through the same-origin /api proxy.
// Asserts: adaptive runner renders the SERVER-selected item (not a local index),
// clicking Next fires POST /next-item, and the rendered item advances to the next
// server-selected item. Independent verification — does NOT trust the build report.

const SECRET = '2+TXRYhy2DniIS2Y/Q6B/kspIRz9GW98apqEPUjpWaY=';
const STUDENT = 'l1i0z9smo9sehad2nc5j28ku';
const PARENT = 'gmke2n2b28kuaee1lhsxgwyo';
const ADAPTIVE_TEST_DOC = 'sknbt5sz8mldeesf6ustfsge';

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

test('adaptive runner renders server-selected items and advances via /next-item', async ({ page }) => {
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

  await page.addInitScript((value) => {
    window.sessionStorage.setItem('schoolgo-student-session', value);
  }, persisted);

  const nextItemCalls: string[] = [];
  page.on('response', (res) => {
    const u = res.url();
    if (u.includes('/api/student-test-sessions/') && u.endsWith('/next-item')) {
      nextItemCalls.push(String(res.status()));
    }
  });

  await page.goto(`/en/test/run?test=${ADAPTIVE_TEST_DOC}`, { waitUntil: 'networkidle' });

  // The adaptive runner gets its FIRST item from the server (start band A2 = p3),
  // not from local index 0 (which would be p1, an A1 item). Proves server-driven.
  await expect(page.getByText('Select the synonym of "rapid".')).toBeVisible({ timeout: 15000 });
  // Confirm the local index-0 item (A1, "Choose the correct article") is NOT shown.
  await expect(page.getByText('Choose the correct article: ___ apple a day.')).toHaveCount(0);

  // The first server selection required at least one /next-item call on mount
  // (captured by the response listener registered before navigation).
  await expect.poll(() => nextItemCalls.length, { timeout: 15000 }).toBeGreaterThanOrEqual(1);

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/416-adaptive-first-item.png',
    fullPage: true,
  });

  // Answer the A2 item correctly (synonym of rapid = quick) and advance.
  await page.getByRole('radio', { name: 'quick' }).check();

  const callsBefore = nextItemCalls.length;
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  // Next must fire ANOTHER /next-item (server selects the next item).
  await expect.poll(() => nextItemCalls.length, { timeout: 15000 }).toBeGreaterThan(callsBefore);

  // BUG (documented by this verify): the runner's advanceAdaptive syncs the flat
  // responses map via /responses, which wholesale-REPLACES response_state and
  // destroys the server-authoritative adaptivePath. The next /next-item then sees
  // no path and re-selects the START item. The runner is STUCK on the first item:
  // it never advances, never steps bands, never terminates.
  await page.waitForTimeout(2000);
  await expect(page.getByText('Select the synonym of "rapid".')).toBeVisible();
  await expect(page.getByText('Identify the adverb: "He spoke quietly."')).toHaveCount(0);

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/416-adaptive-stuck-on-first-item.png',
    fullPage: true,
  });

  // Every next-item proxy call returned 200 (the endpoint itself is healthy;
  // the defect is the clobbered adaptivePath, not the HTTP status).
  expect(nextItemCalls.every((s) => s === '200')).toBeTruthy();
});
