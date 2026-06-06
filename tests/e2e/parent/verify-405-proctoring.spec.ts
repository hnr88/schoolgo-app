import { test, expect } from '@playwright/test';
import crypto from 'crypto';

// VERIFY-405: proctoring telemetry / camera client.
// Drives the live runner, asserts the consent UI renders REAL i18n labels
// (not raw TestRunner.proctoring.* keys), exercises the camera-grant happy path,
// and forces a telemetry POST so a real proctoring-event persists.

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

test.use({
  permissions: ['camera'],
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
});

test('proctoring consent UI renders real labels, grants camera, persists a telemetry event', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['camera']);

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

  // Capture every proctoring-events POST status + the URL (carries session documentId).
  const events: { status: number; url: string }[] = [];
  const requested: string[] = [];
  page.on('request', (req) => {
    const u = req.url();
    if (u.includes('/api/student-test-sessions/') && u.endsWith('/proctoring-events')) {
      requested.push(u);
    }
  });
  page.on('response', (res) => {
    const u = res.url();
    if (u.includes('/api/student-test-sessions/') && u.endsWith('/proctoring-events')) {
      events.push({ status: res.status(), url: u });
    }
  });
  page.on('console', (msg) => {
    // eslint-disable-next-line no-console
    if (msg.type() === 'error') console.log('PAGE_CONSOLE_ERROR=' + msg.text());
  });

  await page.goto(`/en/test/run?test=${TEST_DOC}`, { waitUntil: 'networkidle' });

  // Runner is in progress -> ProctoringCapture is mounted.
  await expect(page.getByText('Question 1 of 6')).toBeVisible({ timeout: 15000 });

  // The consent section renders with the REAL aria-label (regionLabel), not a raw key.
  const region = page.getByRole('region', { name: 'Proctoring camera' });
  await expect(region).toBeVisible();

  // Title + consent copy are real strings, NOT raw "TestRunner.proctoring.*".
  await expect(region.getByText('Exam monitoring')).toBeVisible();
  await expect(region.getByText(/This test is monitored/i)).toBeVisible();
  await expect(region.getByRole('button', { name: 'Enable camera' })).toBeVisible();

  // No raw i18n key leaked anywhere on the page.
  await expect(page.getByText(/TestRunner\.proctoring/)).toHaveCount(0);

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/405-proctoring-consent.png',
    fullPage: true,
  });

  // HAPPY PATH: click Enable camera -> getUserMedia granted (fake camera) -> preview renders.
  await region.getByRole('button', { name: 'Enable camera' }).click();
  await expect(region.getByLabel('Your camera preview')).toBeVisible({ timeout: 15000 });

  await page.screenshot({
    path: '/Users/hunor.nagy/Code/schoolgo/.qa-build/full-build-2026-06-05/screenshots/405-proctoring-granted.png',
    fullPage: true,
  });

  // FORCE a live telemetry POST. The hook listens for window 'blur' ->
  // client_telemetry, posted to the existing capture endpoint.
  const postPromise = page.waitForResponse(
    (r) =>
      r.url().includes('/api/student-test-sessions/') &&
      r.url().endsWith('/proctoring-events'),
    { timeout: 20000 },
  );
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await postPromise;
  // Also fire an offline event -> connection_lost (severity high) for a 2nd row.
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await page.waitForTimeout(2000);
  void requested;

  // Every capture POST that fired must be a real 2xx from the live backend.
  expect(events.length).toBeGreaterThan(0);
  expect(events.every((e) => e.status >= 200 && e.status < 300)).toBeTruthy();

  // Expose the session documentId for the persistence assertion in the runner output.
  const sessionId = events[0].url.match(/student-test-sessions\/([^/]+)\/proctoring-events/)?.[1];
  // eslint-disable-next-line no-console
  console.log('PROCTORING_SESSION_DOCUMENT_ID=' + sessionId);
  // eslint-disable-next-line no-console
  console.log('PROCTORING_POST_STATUSES=' + JSON.stringify(events.map((e) => e.status)));
});
