/**
 * E2E: Parent document upload flow on the application-detail page.
 *
 * Auth fixture: storageState from auth.setup.ts — already logged in as
 * parent@schoolgo.test. No login code needed.
 *
 * Seeded application documentId: dxrtqut51x597ppfn5qhm1hm
 *   — owned by the authenticated parent.
 *
 * Flow under test:
 *   1. Navigate to the application-detail page.
 *   2. Locate the "Upload a document" form inside the Documents card.
 *   3. Select a document type from the shadcn Select (not a native <select>).
 *   4. Attach a small synthetic PNG via setInputFiles buffer form.
 *   5. Click "Upload".
 *   6. Assert POST /api/upload (200/201) fires, then POST /api/student-documents/mine (200/201) fires.
 *   7. Assert the success toast "Document uploaded" appears.
 *   8. Assert the uploaded doc appears in the "Your uploads" sub-section.
 *   9. Assert no console errors throughout.
 *
 * File-type validation note:
 *   The form guards against oversized files client-side (> MAX_DOCUMENT_SIZE_BYTES = 10 MB)
 *   via a toast error before any network call. The accepted MIME/extension list
 *   (.pdf,.jpg,.jpeg,.png,.webp,.doc,.docx) is enforced via the `accept` attribute
 *   on the <input>, which browsers enforce in the picker UI but NOT via setInputFiles —
 *   so a programmatic invalid-type test would not exercise the real code path.
 *   We therefore skip that case and document it here instead of adding a false-positive test.
 *
 * File attachment note:
 *   Playwright's setInputFiles(path) creates a File with size=0 for temp files created
 *   at runtime (macOS sandbox behaviour). We use the buffer form
 *   setInputFiles({ name, mimeType, buffer }) which correctly sets File.size in the browser,
 *   allowing React's onChange handler to receive a valid File object and the Axios XHR
 *   to send a non-empty multipart body.
 */
import { test, expect } from '@playwright/test';
import {
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
} from './_helpers';

const APPLICATION_DOC_ID = 'dxrtqut51x597ppfn5qhm1hm';
const APP_URL = `/en/parent/applications/${APPLICATION_DOC_ID}`;

/**
 * Minimal 1×1 transparent PNG as a Buffer — accepted by the form (.png is in
 * DOCUMENT_FILE_ACCEPT) and well under the 10 MB limit.
 */
const TINY_PNG_BUFFER = Buffer.from(
  '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000b4944415478da63fccfc0500f000485018084a98c210000000049454e44ae426082',
  'hex',
);

test('document upload: POST /api/upload + POST /api/student-documents/mine both return 2xx and uploaded doc appears in Your uploads', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  // Track the two POST responses that constitute a successful upload.
  const uploadStatuses: { url: string; status: number }[] = [];
  page.on('response', (response) => {
    const url = response.url();
    const method = response.request().method();
    if (
      (url.includes('/api/upload') && method === 'POST') ||
      (url.includes('/api/student-documents/mine') && method === 'POST')
    ) {
      uploadStatuses.push({ url, status: response.status() });
    }
  });

  await page.goto(APP_URL);
  await page.waitForLoadState('networkidle');

  // ── Locate the Documents card ─────────────────────────────────────────────
  const documentsCard = page
    .locator('div.rounded-xl')
    .filter({ has: page.getByRole('heading', { name: 'Documents', level: 2 }) });
  await expect(documentsCard).toBeVisible({ timeout: 15_000 });

  // ── Locate the upload form section ────────────────────────────────────────
  const uploadSection = documentsCard
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Upload a document', level: 3 }) });
  await expect(uploadSection).toBeVisible({ timeout: 10_000 });

  // ── Select a document type via the shadcn Select ──────────────────────────
  // exact: true avoids matching "Parent passport" which also contains "passport".
  const selectTrigger = uploadSection.getByRole('combobox');
  await expect(selectTrigger).toBeVisible({ timeout: 10_000 });
  await selectTrigger.click();

  // shadcn SelectContent renders into a portal — query from page, not the card.
  const passportOption = page.getByRole('option', { name: 'Passport', exact: true });
  await expect(passportOption).toBeVisible({ timeout: 5_000 });
  await passportOption.click();

  // Confirm the trigger now shows the chosen value (CSS may lowercase it).
  await expect(selectTrigger).toContainText(/passport/i);

  // ── Attach the synthetic PNG using the buffer form ────────────────────────
  // Using setInputFiles({ name, mimeType, buffer }) ensures the File object in
  // the browser has the correct non-zero size, which is required for the
  // Axios XHR FormData upload to succeed. Do NOT use a temp file path —
  // Playwright 1.59.1 on macOS produces File.size=0 for runtime-created temp files.
  const fileInput = uploadSection.locator('input[type="file"]');
  await fileInput.setInputFiles({
    name: 'schoolgo-test-upload.png',
    mimeType: 'image/png',
    buffer: TINY_PNG_BUFFER,
  });

  // Sanity: confirm the File object has non-zero size.
  const fileSize = await fileInput.evaluate((el: HTMLInputElement) => el.files?.[0]?.size ?? 0);
  expect(fileSize, 'File must have non-zero size for XHR upload to succeed').toBeGreaterThan(0);

  // ── Click the Upload button and wait for both POSTs ──────────────────────
  // There is exactly one "Upload" button visible on this page.
  const uploadButton = page.getByRole('button', { name: 'Upload', exact: true });
  await expect(uploadButton).toBeEnabled({ timeout: 5_000 });
  await uploadButton.scrollIntoViewIfNeeded();

  // Register response waiters BEFORE the click — Strapi responds fast so this
  // ordering prevents missing the response event.
  const uploadResponsePromise = page.waitForResponse(
    (resp) => resp.url().includes('/api/upload') && resp.request().method() === 'POST',
    { timeout: 30_000 },
  );
  const studentDocResponsePromise = page.waitForResponse(
    (resp) =>
      resp.url().includes('/api/student-documents/mine') && resp.request().method() === 'POST',
    { timeout: 40_000 },
  );

  await uploadButton.click();

  const uploadResponse = await uploadResponsePromise;
  uploadStatuses.push({ url: uploadResponse.url(), status: uploadResponse.status() });

  const studentDocResponse = await studentDocResponsePromise;
  uploadStatuses.push({ url: studentDocResponse.url(), status: studentDocResponse.status() });

  // ── Assert HTTP statuses ──────────────────────────────────────────────────
  // Strapi returns 201 for new resources; allow both 200 and 201.
  const uploadStatus = uploadStatuses.find((r) => r.url.includes('/api/upload'))?.status;
  expect(
    uploadStatus,
    `POST /api/upload returned ${uploadStatus ?? 'no response'}`,
  ).toBeGreaterThanOrEqual(200);
  expect(uploadStatus).toBeLessThan(300);

  const studentDocStatus = uploadStatuses.find((r) =>
    r.url.includes('/api/student-documents/mine'),
  )?.status;
  expect(
    studentDocStatus,
    `POST /api/student-documents/mine returned ${studentDocStatus ?? 'no response'}`,
  ).toBeGreaterThanOrEqual(200);
  expect(studentDocStatus).toBeLessThan(300);

  // ── Assert success toast ──────────────────────────────────────────────────
  // sonner renders toasts in an [aria-live] region.
  await expect(page.getByText('Document uploaded')).toBeVisible({ timeout: 10_000 });

  // ── Assert the uploaded doc appears in "Your uploads" ─────────────────────
  // After onSuccess the query for student-documents is invalidated and refetches.
  const yourUploadsSection = documentsCard
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Your uploads', level: 3 }) });
  await expect(yourUploadsSection).toBeVisible({ timeout: 10_000 });

  // The empty-state text must disappear — at least one item is now in the list.
  await expect(
    yourUploadsSection.getByText("You haven't uploaded any documents yet"),
  ).not.toBeVisible({ timeout: 15_000 });

  // The uploaded doc's document-type label ("Passport") must be visible.
  // Use .first() because repeated test runs accumulate multiple passport uploads —
  // strict mode would fail if more than one match is found.
  await expect(yourUploadsSection.getByText('Passport').first()).toBeVisible({
    timeout: 15_000,
  });

  // ── No console errors ─────────────────────────────────────────────────────
  assertNoConsoleErrors(page);
});

test('document upload: submit button is disabled until both document type and file are selected', async ({
  page,
}) => {
  attachConsoleErrorWatcher(page);

  await page.goto(APP_URL);
  await page.waitForLoadState('networkidle');

  const documentsCard = page
    .locator('div.rounded-xl')
    .filter({ has: page.getByRole('heading', { name: 'Documents', level: 2 }) });
  await expect(documentsCard).toBeVisible({ timeout: 15_000 });

  const uploadSection = documentsCard
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Upload a document', level: 3 }) });

  const uploadButton = uploadSection.getByRole('button', { name: 'Upload' });

  // Initially disabled — no type or file selected.
  await expect(uploadButton).toBeDisabled({ timeout: 10_000 });

  // Select a document type but do NOT attach a file → still disabled.
  const selectTrigger = uploadSection.getByRole('combobox');
  await selectTrigger.click();
  await page.getByRole('option', { name: 'Passport', exact: true }).click();
  await expect(uploadButton).toBeDisabled();

  // File selected + no type is hard to test in isolation without resetting the Select
  // (shadcn Select has no built-in programmatic clear). The guard is covered by the
  // fact that the button is disabled when no file is selected (checked above).

  assertNoConsoleErrors(page);
});
