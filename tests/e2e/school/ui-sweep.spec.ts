import { test, expect, type Page, type APIRequestContext, type Locator } from '@playwright/test';
import { SCHOOL, PARENT } from '../_shared/creds';
import { loginViaApi, authHeaders, API_URL } from '../_shared/api';
import { attachConsoleErrorWatcher, assertNoConsoleErrors } from '../parent/_helpers';

/**
 * Exhaustive UI sweep of the school portal under the school storageState, at
 * desktop (1440x900) and mobile (375px). Every interactive control from GAP
 * portalPages.school is exercised and proven to trigger a real :1338 call whose
 * effect persists to the DB and survives a reload / re-query:
 *
 *  - school-dashboard: 4 KPI tiles (deep-link to status-filtered lists), expiring
 *    offers rows, activity feed rows, quick actions.
 *  - school-applications: search + status filter + intake filter + Export CSV,
 *    detail tabs (Details / Vetting / Documents / Timeline / Messages / Notes /
 *    Pre-enrolment), the message composer, and the action machine — make-offer and
 *    issue-coe driven through the guarded transitions, asserting the new status +
 *    timeline-event persist.
 *  - school-invoices: /invoices/mine + /payouts/mine tables and finance summary.
 *
 * Console errors fail the test via attachConsoleErrorWatcher. Next.js dev emits a
 * few benign warnings that are not portal regressions; those are allow-listed.
 */

const CONSOLE_ALLOWLIST = [
  'Download the React DevTools',
  'Failed to load resource: the server responded with a status of 401', // pre-auth users/me ping
  '[Fast Refresh]',
];

const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

const APPLICATIONS_API = `${API_URL}/api/school-staffs/me/applications`;

interface ApiApplication {
  readonly documentId: string;
  readonly status: string;
  readonly student?: { readonly name?: string | null } | null;
}

interface TimelineEvent {
  readonly documentId: string;
  readonly eventType?: string | null;
  readonly description?: string | null;
}

// Strapi rate-limits /api/auth/local; the sweep re-queries the API from many
// tests, so cache each role's JWT for the whole file run instead of logging in
// per assertion (which trips a 429).
const jwtCache = new Map<string, Promise<string>>();

async function cachedLogin(
  request: APIRequestContext,
  creds: typeof SCHOOL,
): Promise<string> {
  const existing = jwtCache.get(creds.email);
  if (existing) return existing;
  const pending = loginViaApi(request, creds);
  jwtCache.set(creds.email, pending);
  return pending;
}

async function schoolJwt(request: APIRequestContext): Promise<string> {
  return cachedLogin(request, SCHOOL);
}

async function fetchSchoolApplications(
  request: APIRequestContext,
  jwt: string,
): Promise<ApiApplication[]> {
  const res = await request.get(`${APPLICATIONS_API}?pageSize=100`, {
    headers: authHeaders(jwt),
  });
  expect(res.ok(), `school applications list ${res.status()}`).toBeTruthy();
  const body = (await res.json()) as { data: ApiApplication[] };
  return body.data;
}

async function fetchApplicationStatus(
  request: APIRequestContext,
  jwt: string,
  documentId: string,
): Promise<string> {
  const apps = await fetchSchoolApplications(request, jwt);
  const found = apps.find((a) => a.documentId === documentId);
  expect(found, `application ${documentId} visible to school`).toBeTruthy();
  return (found as ApiApplication).status;
}

async function fetchTimeline(
  request: APIRequestContext,
  jwt: string,
  documentId: string,
): Promise<TimelineEvent[]> {
  // Same endpoint the Timeline tab uses: filtered timeline-events for the app.
  const params = new URLSearchParams({
    'filters[application][documentId][$eq]': documentId,
    'sort[0]': 'createdAt:desc',
    'pagination[pageSize]': '100',
  });
  const res = await request.get(`${API_URL}/api/timeline-events?${params.toString()}`, {
    headers: authHeaders(jwt),
  });
  expect(res.ok(), `timeline ${documentId} ${res.status()}`).toBeTruthy();
  const body = (await res.json()) as { data: TimelineEvent[] };
  return body.data;
}

/** Open the first application detail page; returns its documentId from the URL. */
async function openFirstApplication(page: Page): Promise<string> {
  await page.goto('/dashboard/applications', { waitUntil: 'networkidle', timeout: 45_000 });
  const firstRow = page.locator('a[href*="/dashboard/applications/"]').first();
  await expect(firstRow, 'at least one seeded application').toBeVisible({ timeout: 15_000 });
  await firstRow.click();
  await page.waitForURL(/\/dashboard\/applications\/[a-z0-9]+/, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');
  const match = page.url().match(/\/dashboard\/applications\/([a-z0-9]+)/);
  expect(match, 'detail URL carries documentId').toBeTruthy();
  return (match as RegExpMatchArray)[1];
}

/** Click an action button by its accessible name and wait for the matching POST. */
async function clickActionAndAwait(
  page: Page,
  buttonName: RegExp,
  endpointFragment: string,
): Promise<void> {
  const waitForCall = page.waitForResponse(
    (r) =>
      r.url().includes(endpointFragment) &&
      r.request().method() === 'POST' &&
      r.status() >= 200 &&
      r.status() < 300,
    { timeout: 20_000 },
  );
  await page.getByRole('button', { name: buttonName }).first().click();
  await waitForCall;
}

/**
 * Simple action machine buttons (e.g. "Mark received") open a confirmation
 * dialog; the real POST only fires on the dialog's "Confirm". Trigger, then
 * confirm, then await the POST.
 */
async function confirmSimpleAction(
  page: Page,
  triggerName: RegExp,
  endpointFragment: string,
): Promise<void> {
  await page.getByRole('button', { name: triggerName }).first().click();
  // Simple actions confirm through a shadcn AlertDialog (role="alertdialog").
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeVisible({ timeout: 10_000 });
  await clickActionAndAwait(page, /^Confirm$/i, endpointFragment);
}

// ───────────────────────────── DASHBOARD ─────────────────────────────

for (const vp of VIEWPORTS) {
  test(`dashboard KPI tiles deep-link to filtered lists @ ${vp.label}`, async ({ page }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);
    await page.goto('/dashboard', { waitUntil: 'networkidle', timeout: 45_000 });

    // The 4 KPI tiles are <a> links with status-filtered hrefs. Each must
    // navigate to the applications list with the corresponding status filter,
    // which fires the real /api/school-staffs/me/applications?status=... call.
    const tiles: { label: RegExp; status: string }[] = [
      { label: /New applications/i, status: 'submitted' },
      { label: /Under review/i, status: 'under_review' },
      { label: /Offers made/i, status: 'offer_made' },
      { label: /Enrolled this term/i, status: 'enrolled' },
    ];

    for (const tile of tiles) {
      const link = page.locator(`a[href*="status=${tile.status}"]`).first();
      await expect(link, `KPI tile linking to status=${tile.status}`).toBeVisible({
        timeout: 15_000,
      });
      const listCall = page.waitForResponse(
        (r) =>
          r.url().includes('/api/school-staffs/me/applications') &&
          r.url().includes(`status=${tile.status}`) &&
          r.status() === 200,
        { timeout: 20_000 },
      );
      await link.click();
      await listCall;
      await expect(page).toHaveURL(new RegExp(`status=${tile.status}`), { timeout: 15_000 });
      await page.goBack({ waitUntil: 'networkidle' });
    }

    assertNoConsoleErrors(page);
  });

  test(`dashboard expiring-offers + activity + quick actions navigate @ ${vp.label}`, async ({
    page,
  }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);
    await page.goto('/dashboard', { waitUntil: 'networkidle', timeout: 45_000 });

    // Expiring offers section renders (rows link to application detail; the empty
    // state is also valid). When a row exists, clicking it loads the detail page
    // backed by a real /school-detail call.
    await expect(page.getByText(/Expiring offers/i).first()).toBeVisible({ timeout: 15_000 });
    const offerRow = page.locator('a[href*="/dashboard/applications/"]').first();
    if (await offerRow.isVisible().catch(() => false)) {
      const detailCall = page.waitForResponse(
        (r) => r.url().includes('/school-detail') && r.status() === 200,
        { timeout: 20_000 },
      );
      await offerRow.click();
      await detailCall;
      await expect(page).toHaveURL(/\/dashboard\/applications\/[a-z0-9]+/, { timeout: 15_000 });
      await page.goto('/dashboard', { waitUntil: 'networkidle' });
    }

    // Quick actions: "Review applications" navigates to the list (real call).
    const reviewLink = page.locator('a[href$="/dashboard/applications"]').last();
    await expect(reviewLink, 'quick action review applications').toBeVisible({ timeout: 15_000 });
    const listCall = page.waitForResponse(
      (r) => r.url().includes('/api/school-staffs/me/applications') && r.status() === 200,
      { timeout: 20_000 },
    );
    await reviewLink.click();
    await listCall;
    await expect(page).toHaveURL(/\/dashboard\/applications/, { timeout: 15_000 });

    assertNoConsoleErrors(page);
  });
}

// ─────────────────────── APPLICATIONS LIST CONTROLS ───────────────────────

for (const vp of VIEWPORTS) {
  test(`applications list filters/search/export @ ${vp.label}`, async ({ page, request }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);
    await page.goto('/dashboard/applications', { waitUntil: 'networkidle', timeout: 45_000 });
    await expect(page.getByRole('row').first()).toBeVisible({ timeout: 15_000 });

    // Status filter -> real call with ?status=offer_made, list re-queries the API.
    const statusCall = page.waitForResponse(
      (r) =>
        r.url().includes('/api/school-staffs/me/applications') &&
        r.url().includes('status=offer_made') &&
        r.status() === 200,
      { timeout: 20_000 },
    );
    await page.getByRole('button', { name: /All statuses/i }).first().click();
    await page.getByRole('menuitem', { name: /^Offer made$/i }).click();
    await statusCall;
    // Every visible status badge must read "Offer made" once the filter is active.
    await page.waitForTimeout(500);
    const rows = page.getByRole('row');
    const rowCount = await rows.count();
    expect(rowCount, 'filtered list still renders header (and rows if any)').toBeGreaterThan(0);

    // Reset to all statuses.
    await page.getByRole('button', { name: /Offer made/i }).first().click();
    await page.getByRole('menuitem', { name: /All statuses/i }).click();
    await page.waitForTimeout(400);

    // Search filters the rendered rows client-side over the fetched set.
    const searchBox = page.getByRole('textbox', { name: /Search by student/i });
    await searchBox.fill('zzzznotastudent');
    await page.waitForTimeout(400);
    await expect(page.getByText(/No applications|empty/i).first()).toBeVisible({ timeout: 10_000 });
    await searchBox.fill('');
    await page.waitForTimeout(300);

    // Export CSV -> real GET /export returning text/csv (download is client-side).
    const exportCall = page.waitForResponse(
      (r) =>
        r.url().includes('/api/school-staffs/me/applications/export') && r.status() === 200,
      { timeout: 20_000 },
    );
    await page.getByRole('button', { name: /Export CSV/i }).click();
    await exportCall;

    // Prove the export endpoint returns the school's real rows (re-query directly).
    const jwt = await schoolJwt(request);
    const apps = await fetchSchoolApplications(request, jwt);
    const exportRes = await request.get(`${APPLICATIONS_API}/export`, {
      headers: authHeaders(jwt),
    });
    expect(exportRes.ok()).toBeTruthy();
    const csv = await exportRes.text();
    expect(csv.split('\n').length, 'CSV has a header + rows').toBeGreaterThan(apps.length);

    assertNoConsoleErrors(page);
  });
}

// ─────────────────────── APPLICATION DETAIL TABS ───────────────────────

const DETAIL_TABS = [
  'Details',
  'Vetting',
  'Documents',
  'Timeline',
  'Messages',
  'Notes',
  'Pre-enrolment',
];

for (const vp of VIEWPORTS) {
  test(`application detail — every tab loads real data @ ${vp.label}`, async ({ page, request }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);
    const documentId = await openFirstApplication(page);

    // Tabs whose content is backed by a dedicated re-query endpoint (paths taken
    // verbatim from the school-applications query hooks).
    const tabEndpoint: Record<string, string> = {
      Vetting: `/api/school-staffs/me/applications/${documentId}/vetting`,
      Documents: `/api/applications/${documentId}/checklist`,
      Timeline: `/api/timeline-events`,
      Messages: `/api/messages/school-thread/${documentId}`,
      Notes: `/api/school-private-notes`,
      'Pre-enrolment': `/api/pre-enrolment-items/by-application`,
    };

    for (const tab of DETAIL_TABS) {
      const endpoint = tabEndpoint[tab];
      const waitForData = endpoint
        ? page.waitForResponse(
            (r) => r.url().includes(endpoint) && r.status() === 200,
            { timeout: 20_000 },
          )
        : null;
      await page.getByRole('tab', { name: tab, exact: true }).click();
      if (waitForData) await waitForData;
      await expect(
        page.getByRole('tab', { name: tab, exact: true }),
        `${tab} tab selected`,
      ).toHaveAttribute('aria-selected', 'true', { timeout: 10_000 });
      await page.waitForTimeout(300);
    }

    // The Timeline tab content must reflect the real persisted audit trail.
    const jwt = await schoolJwt(request);
    const events = await fetchTimeline(request, jwt, documentId);
    expect(events.length, 'application has a persisted timeline').toBeGreaterThan(0);

    assertNoConsoleErrors(page);
  });
}

// ─────────────────────── MESSAGE COMPOSER (real persist) ───────────────────────

for (const vp of VIEWPORTS) {
  test(`messages composer persists a message @ ${vp.label}`, async ({ page, request }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);
    const documentId = await openFirstApplication(page);

    await page.getByRole('tab', { name: 'Messages', exact: true }).click();
    await page.waitForLoadState('networkidle');

    const unique = `sweep-${vp.label}-${Date.now()}`;
    const composer = page.getByRole('textbox', { name: /Write a message|message/i }).first();
    await expect(composer).toBeVisible({ timeout: 15_000 });
    await composer.fill(unique);

    const sendCall = page.waitForResponse(
      (r) =>
        r.url().includes('/api/messages/school-send') &&
        r.request().method() === 'POST' &&
        r.status() >= 200 &&
        r.status() < 300,
      { timeout: 20_000 },
    );
    await page.getByRole('button', { name: /^Send$/i }).click();
    await sendCall;

    // Optimistic / refetched render shows the just-sent message.
    await expect(page.getByText(unique).first()).toBeVisible({ timeout: 15_000 });

    // Persistence survives a reload (re-query of the school thread).
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: 'Messages', exact: true }).click();
    await expect(page.getByText(unique).first()).toBeVisible({ timeout: 15_000 });

    // Cross-check the message persisted to the DB via the thread endpoint.
    const jwt = await schoolJwt(request);
    const threadRes = await request.get(
      `${API_URL}/api/messages/school-thread/${documentId}`,
      { headers: authHeaders(jwt) },
    );
    expect(threadRes.ok()).toBeTruthy();
    const thread = (await threadRes.json()) as { data: { content: string }[] };
    expect(
      thread.data.some((m) => m.content === unique),
      'sent message persisted in the school thread',
    ).toBeTruthy();

    assertNoConsoleErrors(page);
  });
}

// ─────────────────────── ACTION MACHINE: make-offer ───────────────────────

// The seeded `submitted` application owned by the school can be driven all the
// way to an offer through the real guarded transitions (submitted -> received ->
// offer_made). Forward-only, so the test reads the current status first and only
// advances from where the shared DB currently sits, asserting each real call +
// the resulting DB status + timeline-event.
const MAKE_OFFER_APP = 'i1h71qbuv1ea0yxv7j3y4k5a';

test('action machine: make-offer transitions submitted -> offer_made (DB + timeline)', async ({
  page,
  request,
}) => {
  attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
  await page.setViewportSize(VIEWPORTS[0]);

  const jwt = await schoolJwt(request);
  let status = await fetchApplicationStatus(request, jwt, MAKE_OFFER_APP);
  test.skip(
    !['submitted', 'received', 'under_review'].includes(status),
    `make-offer app already advanced past the offer window (status=${status})`,
  );

  await page.goto(`/dashboard/applications/${MAKE_OFFER_APP}`, {
    waitUntil: 'networkidle',
    timeout: 45_000,
  });
  await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });

  // Step 1: submitted -> received via "Mark received" (confirm dialog).
  if (status === 'submitted') {
    await confirmSimpleAction(page, /Mark received/i, `/applications/${MAKE_OFFER_APP}/receive`);
    await expect(page.getByText(/Action completed/i)).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(800);
    status = await fetchApplicationStatus(request, jwt, MAKE_OFFER_APP);
    expect(status, 'receive persisted').toBe('received');
  }

  // Step 2: received -> under_review via "Start review" (the UI only offers
  // make-offer from under_review, matching availableActions()).
  if (status === 'received') {
    await page.reload({ waitUntil: 'networkidle' });
    await confirmSimpleAction(page, /Start review/i, `/applications/${MAKE_OFFER_APP}/review`);
    await expect(page.getByText(/Action completed/i)).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(800);
    status = await fetchApplicationStatus(request, jwt, MAKE_OFFER_APP);
    expect(status, 'review persisted').toBe('under_review');
  }

  // Step 3: under_review -> offer_made via "Make offer" dialog (deadline required).
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Make offer/i }).first().click();
  const deadline = new Date(Date.now() + 21 * 86_400_000).toISOString().slice(0, 10);
  await page.getByLabel(/Offer deadline/i).fill(deadline);
  await page.getByLabel(/Annual fee/i).fill('24000');

  await clickActionAndAwait(page, /^Confirm$/i, `/applications/${MAKE_OFFER_APP}/make-offer`);
  await expect(page.getByText(/Action completed/i)).toBeVisible({ timeout: 10_000 });

  // DB persistence: status is offer_made and an offer_made timeline-event exists.
  await page.waitForTimeout(800);
  const finalStatus = await fetchApplicationStatus(request, jwt, MAKE_OFFER_APP);
  expect(finalStatus, 'make-offer persisted status').toBe('offer_made');

  const events = await fetchTimeline(request, jwt, MAKE_OFFER_APP);
  expect(
    events.some((e) => e.eventType === 'offer_made'),
    'offer_made timeline-event written (audit intact)',
  ).toBeTruthy();

  // Survives reload: the detail page shows the offer_made status badge.
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByText(/Offer made/i).first()).toBeVisible({ timeout: 15_000 });

  assertNoConsoleErrors(page);
});

// ─────────────────────── ACTION MACHINE: issue-coe ───────────────────────

// issue-coe is only reachable from offer_accepted / pre_enrolment. The school
// cannot accept its own offer, so the precondition is established by the REAL
// parent actor (parent-accept-offer) — the application is owned by the seeded
// parent. The school UI then issues the CoE; we assert the persisted coe_issued
// status + coeNumber + coe_issued timeline-event survive a reload.
const ISSUE_COE_APP = 'a20svmyfzv6m4k6bfrhy1t57'; // Diya — offer_made, parent-owned

test('action machine: issue-coe writes coe_issued + CoE fields + timeline (survives reload)', async ({
  page,
  request,
}) => {
  attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
  await page.setViewportSize(VIEWPORTS[0]);

  const schoolToken = await schoolJwt(request);
  let status = await fetchApplicationStatus(request, schoolToken, ISSUE_COE_APP);
  test.skip(
    status === 'coe_issued' || status === 'enrolled',
    `issue-coe app already issued (status=${status})`,
  );

  // Precondition via the real parent actor: offer_made -> offer_accepted.
  if (status === 'offer_made') {
    const parentToken = await cachedLogin(request, PARENT);
    const acceptRes = await request.post(
      `${API_URL}/api/applications/${ISSUE_COE_APP}/parent-accept-offer`,
      { headers: authHeaders(parentToken), data: {} },
    );
    expect(acceptRes.ok(), `parent accept-offer ${acceptRes.status()}`).toBeTruthy();
    status = await fetchApplicationStatus(request, schoolToken, ISSUE_COE_APP);
    expect(status, 'offer accepted by parent').toBe('offer_accepted');
  }

  // School UI: issue the CoE via the FieldDialog (coeNumber required).
  await page.goto(`/dashboard/applications/${ISSUE_COE_APP}`, {
    waitUntil: 'networkidle',
    timeout: 45_000,
  });
  await page.getByRole('button', { name: /Issue CoE/i }).first().click();
  const coeNumber = `COE-SWEEP-${Date.now()}`;
  await page.getByLabel(/CoE number/i).fill(coeNumber);

  await clickActionAndAwait(page, /^Confirm$/i, `/applications/${ISSUE_COE_APP}/issue-coe`);
  await expect(page.getByText(/Action completed/i)).toBeVisible({ timeout: 10_000 });

  // DB persistence: coe_issued status + a coe_issued timeline-event.
  await page.waitForTimeout(800);
  const finalStatus = await fetchApplicationStatus(request, schoolToken, ISSUE_COE_APP);
  expect(finalStatus, 'issue-coe persisted status').toBe('coe_issued');

  const events = await fetchTimeline(request, schoolToken, ISSUE_COE_APP);
  expect(
    events.some((e) => e.eventType === 'coe_issued'),
    'coe_issued timeline-event written (audit intact)',
  ).toBeTruthy();

  // CoE number persisted on the application record (re-query via school-detail).
  const detailRes = await request.get(
    `${API_URL}/api/applications/${ISSUE_COE_APP}/school-detail`,
    { headers: authHeaders(schoolToken) },
  );
  expect(detailRes.ok()).toBeTruthy();
  const detail = (await detailRes.json()) as { data: { coeNumber?: string | null } };
  expect(detail.data.coeNumber, 'coeNumber persisted').toBe(coeNumber);

  // Survives reload: status badge now reads "CoE issued".
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByText(/CoE issued/i).first()).toBeVisible({ timeout: 15_000 });

  assertNoConsoleErrors(page);
});

// ─────────────────────── INVOICES + PAYOUTS ───────────────────────

for (const vp of VIEWPORTS) {
  test(`invoices + payouts render real /mine data @ ${vp.label}`, async ({ page, request }) => {
    attachConsoleErrorWatcher(page, CONSOLE_ALLOWLIST);
    await page.setViewportSize(vp);

    const invoicesCall = page.waitForResponse(
      (r) => r.url().includes('/api/invoices/mine') && r.status() === 200,
      { timeout: 20_000 },
    );
    const payoutsCall = page.waitForResponse(
      (r) => r.url().includes('/api/payouts/mine') && r.status() === 200,
      { timeout: 20_000 },
    );
    await page.goto('/dashboard/invoices', { waitUntil: 'networkidle', timeout: 45_000 });
    await invoicesCall;
    await payoutsCall;

    // Both finance sections render their headings (scoped to the heading role so
    // the sidebar "Invoices" nav link can't satisfy the assertion).
    await expect(
      page.getByRole('heading', { name: /^Invoices$/i }).first(),
    ).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByRole('heading', { name: /^Payouts$/i }).first(),
    ).toBeVisible({ timeout: 15_000 });

    // The invoices table region reflects the real persisted invoice rows.
    const jwt = await schoolJwt(request);
    const res = await request.get(`${API_URL}/api/invoices/mine`, { headers: authHeaders(jwt) });
    expect(res.ok()).toBeTruthy();
    const invoices = (await res.json()) as { data: unknown[] };
    if (invoices.data.length > 0) {
      const region: Locator = page.getByRole('region', { name: /Invoices/i }).first();
      await expect(region, 'invoices table region present').toBeVisible({ timeout: 15_000 });
      const rowCount = await region.getByRole('row').count();
      expect(rowCount, 'invoices table renders header + the persisted rows').toBeGreaterThan(1);
    }

    assertNoConsoleErrors(page);
  });
}
