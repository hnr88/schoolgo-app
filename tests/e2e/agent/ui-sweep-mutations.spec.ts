import { test, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import path from 'node:path';
import {
  VIEWPORTS,
  agentApi,
  firstDocumentId,
  attachConsoleErrorWatcher,
  assertNoConsoleErrors,
  settle,
} from './_sweep-helpers';

// Task 051 — persistence-bearing agent controls. Each mutation is triggered
// from the real UI, fires a real :1338 call, and is proven to survive a
// reload / re-query against the live DB. Created rows are cleaned up.

const FIXTURE_PDF = path.resolve(__dirname, '../fixtures/photo.png');

let ctx: APIRequestContext;
let studentId = '';

test.beforeAll(async () => {
  const api = await agentApi();
  ctx = api.ctx;
  studentId = await firstDocumentId(ctx, 'students');
});

test.afterAll(async () => {
  await ctx.dispose();
});

async function deleteStudent(documentId: string): Promise<void> {
  await ctx.delete(`/api/students/${documentId}`).catch(() => undefined);
}

for (const vp of VIEWPORTS) {
  test(`agent create student persists @ ${vp.label}`, async ({ page }) => {
    attachConsoleErrorWatcher(page);
    await page.setViewportSize(vp);

    const first = `Sweep${vp.label}`;
    const last = `Agent${Date.now()}`;

    await page.goto('/en/agent/dashboard/students/new');
    await settle(page);

    await page.getByLabel('First name').fill(first);
    await page.getByLabel('Last name').fill(last);

    const createReq = page.waitForResponse(
      (r) => r.url().endsWith('/api/students') && r.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'Create Student' }).click();
    const res = await createReq;
    expect(res.status(), 'POST /api/students 2xx').toBeLessThan(300);

    // Prove the row persisted in the DB via an independent re-query.
    const created = (await res.json()) as { data: { documentId: string } };
    const documentId = created.data.documentId;
    const reread = await ctx.get(`/api/students/${documentId}?fields[0]=firstName&fields[1]=lastName`);
    const body = (await reread.json()) as { data: { firstName: string; lastName: string } };
    expect(body.data.firstName).toBe(first);
    expect(body.data.lastName).toBe(last);

    // ...and reflected in the UI list after reload.
    await page.goto('/en/agent/dashboard/students');
    await settle(page);
    await expect(page.getByText(`${first} ${last}`)).toBeVisible();

    assertNoConsoleErrors(page);
    await deleteStudent(documentId);
  });
}

test('agent edit student persists', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  await page.setViewportSize(VIEWPORTS[0]);

  const newNationality = `Probe-${Date.now()}`;
  const before = (await (await ctx.get(`/api/students/${studentId}?fields[0]=nationality`)).json()) as {
    data: { nationality: string | null };
  };

  await page.goto(`/en/agent/dashboard/students/${studentId}/edit`);
  await settle(page);

  await page.getByLabel('Nationality').fill(newNationality);
  const updateReq = page.waitForResponse(
    (r) => r.url().includes(`/api/students/${studentId}`) && r.request().method() === 'PUT',
  );
  await page.getByRole('button', { name: 'Save Changes' }).click();
  const res = await updateReq;
  expect(res.status(), 'PUT /api/students/:id 2xx').toBeLessThan(300);

  const after = (await (await ctx.get(`/api/students/${studentId}?fields[0]=nationality`)).json()) as {
    data: { nationality: string };
  };
  expect(after.data.nationality).toBe(newNationality);
  assertNoConsoleErrors(page);

  // Restore the original value so the seed row is unchanged.
  await ctx.put(`/api/students/${studentId}`, {
    data: { data: { nationality: before.data.nationality ?? '' } },
  });
});

test('agent student document upload + delete persists', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  await page.setViewportSize(VIEWPORTS[0]);

  await page.goto(`/en/agent/dashboard/students/${studentId}`);
  await settle(page);
  await page.getByRole('tab', { name: 'Documents' }).click();
  await settle(page);

  // Open the upload dialog and submit a real file via the dropzone input.
  await page.getByRole('button', { name: 'Upload Document' }).first().click();
  await page.locator('input[type="file"]').setInputFiles(FIXTURE_PDF);
  await page.getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Passport' }).click();

  const uploadReq = page.waitForResponse(
    (r) => r.url().includes('/api/student-documents') && r.request().method() === 'POST',
  );
  await page.getByRole('button', { name: 'Upload', exact: true }).click();
  const uploadRes = await uploadReq;
  expect(uploadRes.status(), 'POST /api/student-documents 2xx').toBeLessThan(300);
  const uploaded = (await uploadRes.json()) as { data: { documentId: string } };
  const docId = uploaded.data.documentId;

  // Proven persisted: re-query the documents list filtered to this student.
  const list = (await (
    await ctx.get(`/api/student-documents?filters[student][documentId][$eq]=${studentId}`)
  ).json()) as { data: { documentId: string }[] };
  expect(list.data.some((d) => d.documentId === docId)).toBeTruthy();

  // Delete via the UI and prove the row is gone.
  await settle(page);
  await page.getByRole('row').filter({ hasText: 'Passport' }).getByRole('button').last().click();
  const deleteReq = page.waitForResponse(
    (r) => r.url().includes(`/api/student-documents/${docId}`) && r.request().method() === 'DELETE',
  );
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  const delRes = await deleteReq;
  expect(delRes.status(), 'DELETE /api/student-documents/:id 2xx').toBeLessThan(300);
  const after = await ctx.get(`/api/student-documents/${docId}`);
  expect(after.status(), 'document gone after delete').toBe(404);
  assertNoConsoleErrors(page);
});

test('agent public profile save persists', async ({ page }) => {
  attachConsoleErrorWatcher(page);
  await page.setViewportSize(VIEWPORTS[0]);

  const before = (await (await ctx.get('/api/agents/me')).json()) as { data: { bio?: string | null } };
  const newBio = `Sweep bio ${Date.now()}`;

  await page.goto('/en/agent/dashboard/profile');
  await settle(page);
  await page.getByLabel('Bio').fill(newBio);

  const saveReq = page.waitForResponse(
    (r) => r.url().includes('/api/agents/me') && r.request().method() === 'PUT',
  );
  await page.getByRole('button', { name: 'Save changes' }).click();
  const res = await saveReq;
  expect(res.status(), 'PUT /api/agents/me 2xx').toBeLessThan(300);

  const after = (await (await ctx.get('/api/agents/me')).json()) as { data: { bio?: string | null } };
  expect(after.data.bio).toBe(newBio);
  assertNoConsoleErrors(page);

  await ctx.put('/api/agents/me', { data: { data: { bio: before.data.bio ?? '' } } });
});
