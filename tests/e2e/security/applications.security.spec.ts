import { test, expect, request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { PARENT, AGENT, SCHOOL } from '../_shared/creds';
import { API_URL, loginViaApi, authHeaders } from '../_shared/api';

/**
 * Adversarial API-security sweep of the applications endpoint group.
 *
 * Proves three invariants against the live Strapi API (:1338) with real seeded
 * owners (agent@ / parent@ / school@schoolgo.test), discovering ownership at
 * runtime — no documentIds are hardcoded:
 *
 *   1. Object-level ownership — an agent/parent/school cannot read or mutate an
 *      application owned by a different owner (403/404).
 *   2. Mass-assignment — a raw agent create/update cannot client-set status, fee,
 *      offer*, coe* or *At server-managed fields; legitimate fields still persist.
 *   3. Transition integrity — status only advances via the guarded transition
 *      actions, each writes a timeline-event (audit log intact), and there is no
 *      raw status-write route an agent can call to bypass the guards.
 *
 * Created drafts are driven to the inert `withdrawn` terminal state in teardown —
 * the maximum cleanup the agent role permits (core delete is not granted).
 */

interface AppRow {
  readonly documentId: string;
  readonly status?: string;
}

interface ListResponse<T = AppRow> {
  readonly data: T[];
}

const SERVER_MANAGED_FIELDS = [
  'offerAnnualFee',
  'coeNumber',
  'coeStartDate',
  'coeEndDate',
  'caawIssued',
  'submittedAt',
  'offerMadeAt',
  'offerDeadline',
  'offerConditions',
  'offerAcceptedAt',
  'coeIssuedAt',
  'enrolledAt',
  'receivedAt',
] as const;

let api: APIRequestContext;
let agentJwt: string;
let parentJwt: string;
let schoolJwt: string;
let staffSchoolDocId: string;
let agentStudentDocId: string;

const createdDraftIds: string[] = [];

async function getList<T = AppRow>(jwt: string, path: string): Promise<T[]> {
  const res = await api.get(`${API_URL}${path}`, { headers: authHeaders(jwt) });
  expect(res.status(), `GET ${path} should succeed`).toBe(200);
  const body = (await res.json()) as ListResponse<T>;
  return body.data ?? [];
}

// Resolve a school documentId that the seeded school staff owns AND the seeded
// agent owns an application at — so the agent can create a draft there and the
// school scope can read its timeline — plus an agent-accessible student.
async function resolveFixtures(): Promise<void> {
  const agentApps = await getList(agentJwt, '/api/applications?pagination[pageSize]=50');
  const staffApps = await getList(schoolJwt, '/api/school-staffs/me/applications?pagination[pageSize]=50');
  const staffIds = new Set(staffApps.map((a) => a.documentId));
  const shared = agentApps.find((a) => staffIds.has(a.documentId));
  expect(shared, 'agent should own an application at the staff school').toBeTruthy();

  const res = await api.get(
    `${API_URL}/api/applications/${shared!.documentId}?populate[school][fields][0]=documentId`,
    { headers: authHeaders(agentJwt) },
  );
  expect(res.status()).toBe(200);
  const detail = (await res.json()) as { data?: { school?: { documentId?: string } } };
  expect(typeof detail.data?.school?.documentId).toBe('string');
  staffSchoolDocId = detail.data!.school!.documentId as string;

  const students = await getList(agentJwt, '/api/students?pagination[pageSize]=5&fields[0]=firstName');
  expect(students.length, 'seeded agent should have accessible students').toBeGreaterThan(0);
  agentStudentDocId = students[0].documentId;
}

async function createAgentDraft(
  extra: Record<string, unknown> = {},
): Promise<AppRow & Record<string, unknown>> {
  const res = await api.post(`${API_URL}/api/applications`, {
    headers: authHeaders(agentJwt),
    data: {
      data: {
        student: agentStudentDocId,
        school: staffSchoolDocId,
        targetYearLevel: 'Y10',
        targetIntake: '2027',
        boardingRequired: false,
        ...extra,
      },
    },
  });
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { data: AppRow & Record<string, unknown> };
  createdDraftIds.push(body.data.documentId);
  return body.data;
}

test.beforeAll(async () => {
  api = await playwrightRequest.newContext();
  [agentJwt, parentJwt, schoolJwt] = await Promise.all([
    loginViaApi(api, AGENT),
    loginViaApi(api, PARENT),
    loginViaApi(api, SCHOOL),
  ]);
  await resolveFixtures();
});

test.afterAll(async () => {
  // The agent role has no core-delete grant, so the deepest cleanup available is
  // to drive each created draft to the inert `withdrawn` terminal state. A draft
  // is first submitted (draft -> submitted) so the guarded submitted -> withdrawn
  // transition applies; both steps are owner-gated agent actions.
  for (const documentId of createdDraftIds) {
    const current = await api
      .get(`${API_URL}/api/applications/${documentId}`, { headers: authHeaders(agentJwt) })
      .catch(() => null);
    const status = current && current.status() === 200
      ? ((await current.json()) as { data?: { status?: string } }).data?.status
      : undefined;
    if (status === 'withdrawn') continue;
    if (status === 'draft') {
      await api
        .post(`${API_URL}/api/applications/${documentId}/submit`, {
          headers: authHeaders(agentJwt),
          data: { data: {} },
        })
        .catch(() => undefined);
    }
    await api
      .post(`${API_URL}/api/applications/${documentId}/withdraw`, {
        headers: authHeaders(agentJwt),
        data: { data: { reason: 'security-test teardown' } },
      })
      .catch(() => undefined);
  }
  await api.dispose();
});

test.describe('object-level ownership', () => {
  test('agent cannot read or mutate an application it does not own', async () => {
    const owned = await getList(agentJwt, '/api/applications?pagination[pageSize]=50');
    const parentOwned = await getList(parentJwt, '/api/applications?pagination[pageSize]=50');
    const ownedIds = new Set(owned.map((a) => a.documentId));
    const foreign = parentOwned.find((a) => !ownedIds.has(a.documentId));
    expect(foreign, 'expected an application not owned by the seeded agent').toBeTruthy();
    const target = foreign!.documentId;

    const read = await api.get(`${API_URL}/api/applications/${target}`, {
      headers: authHeaders(agentJwt),
    });
    expect([403, 404]).toContain(read.status());

    const withdraw = await api.post(`${API_URL}/api/applications/${target}/withdraw`, {
      headers: authHeaders(agentJwt),
      data: { data: {} },
    });
    expect([403, 404]).toContain(withdraw.status());

    const acceptOffer = await api.post(`${API_URL}/api/applications/${target}/accept-offer`, {
      headers: authHeaders(agentJwt),
      data: { data: {} },
    });
    expect([403, 404]).toContain(acceptOffer.status());
  });

  test('agent CAN read an application it owns (control)', async () => {
    const owned = await getList(agentJwt, '/api/applications?pagination[pageSize]=50');
    expect(owned.length, 'seeded agent should own applications').toBeGreaterThan(0);
    const read = await api.get(`${API_URL}/api/applications/${owned[0].documentId}`, {
      headers: authHeaders(agentJwt),
    });
    expect(read.status()).toBe(200);
  });

  test('parent cannot read or accept an offer on a foreign application', async () => {
    const agentOwned = await getList(agentJwt, '/api/applications?pagination[pageSize]=50');
    const parentOwned = await getList(parentJwt, '/api/applications?pagination[pageSize]=50');
    const parentIds = new Set(parentOwned.map((a) => a.documentId));
    const foreign = agentOwned.find((a) => !parentIds.has(a.documentId));
    expect(foreign, 'expected an application not owned by the seeded parent').toBeTruthy();
    const target = foreign!.documentId;

    const read = await api.get(`${API_URL}/api/applications/${target}`, {
      headers: authHeaders(parentJwt),
    });
    expect([403, 404]).toContain(read.status());

    const acceptOffer = await api.post(
      `${API_URL}/api/applications/${target}/parent-accept-offer`,
      { headers: authHeaders(parentJwt), data: { data: {} } },
    );
    expect([403, 404]).toContain(acceptOffer.status());
  });

  test('school cannot read or mutate an application at another school', async () => {
    const ownSchoolApps = await getList(
      schoolJwt,
      '/api/school-staffs/me/applications?pagination[pageSize]=50',
    );
    const ownIds = new Set(ownSchoolApps.map((a) => a.documentId));
    const agentOwned = await getList(agentJwt, '/api/applications?pagination[pageSize]=50');
    const foreign = agentOwned.find((a) => !ownIds.has(a.documentId));
    expect(foreign, 'expected an application outside the staff school').toBeTruthy();
    const target = foreign!.documentId;

    const detail = await api.get(`${API_URL}/api/applications/${target}/school-detail`, {
      headers: authHeaders(schoolJwt),
    });
    expect([403, 404]).toContain(detail.status());

    const makeOffer = await api.post(`${API_URL}/api/applications/${target}/make-offer`, {
      headers: authHeaders(schoolJwt),
      data: { data: {} },
    });
    expect([403, 404]).toContain(makeOffer.status());

    const issueCoe = await api.post(`${API_URL}/api/applications/${target}/issue-coe`, {
      headers: authHeaders(schoolJwt),
      data: { data: {} },
    });
    expect([403, 404]).toContain(issueCoe.status());
  });
});

test.describe('mass-assignment guards', () => {
  // A single draft carries every mass-assignment probe — none of them legitimately
  // advances status, so the row stays a draft across the block.
  let draft: AppRow & Record<string, unknown>;

  test.beforeAll(async () => {
    draft = await createAgentDraft({
      status: 'coe_issued',
      offerAnnualFee: 99999,
      coeNumber: 'FORGED-COE-CREATE',
      submittedAt: '2020-01-01T00:00:00.000Z',
      offerMadeAt: '2020-01-01T00:00:00.000Z',
      caawIssued: true,
      offerConditions: 'forged-conditions',
      coeStartDate: '2020-01-01',
      enrolledAt: '2020-01-01T00:00:00.000Z',
      // legit fields, asserted as persisted below
      targetYearLevel: 'Y9',
      boardingRequired: true,
      courseType: 'secondary',
      agentNotes: 'legit agent note',
    });
  });

  test('raw create cannot client-set status or server-managed fields', () => {
    expect(draft.status, 'status must be the server-forced draft').toBe('draft');
    for (const field of SERVER_MANAGED_FIELDS) {
      expect(draft[field] ?? null, `forged ${field} must not be persisted`).toBeFalsy();
    }
  });

  test('raw create persists only legitimate agent-editable fields', () => {
    expect(draft['targetYearLevel']).toBe('Y9');
    expect(draft['boardingRequired']).toBe(true);
    expect(draft['courseType']).toBe('secondary');
    expect(draft['agentNotes']).toBe('legit agent note');
  });

  test('re-fetch confirms forged create state did not persist', async () => {
    const res = await api.get(`${API_URL}/api/applications/${draft.documentId}`, {
      headers: authHeaders(agentJwt),
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { data: Record<string, unknown> };
    expect(body.data['status']).toBe('draft');
    expect(body.data['offerAnnualFee'] ?? null).toBeFalsy();
    expect(body.data['coeNumber'] ?? null).toBeFalsy();
  });

  test('raw update cannot advance status or set coe fields', async () => {
    // The core update action is not granted to the agent role (403). Even if it
    // were, the controller allow-list strips status/coe — so no privileged state
    // is reachable via a raw write.
    const res = await api.put(`${API_URL}/api/applications/${draft.documentId}`, {
      headers: authHeaders(agentJwt),
      data: { data: { status: 'enrolled', coeNumber: 'FORGED-VIA-UPDATE' } },
    });
    expect([403, 400, 404]).toContain(res.status());

    const after = await api.get(`${API_URL}/api/applications/${draft.documentId}`, {
      headers: authHeaders(agentJwt),
    });
    expect(after.status()).toBe(200);
    const body = (await after.json()) as { data: Record<string, unknown> };
    expect(body.data['status']).toBe('draft');
    expect(body.data['coeNumber'] ?? null).toBeFalsy();
  });
});

test.describe('transition integrity', () => {
  test('an invalid transition is rejected by the guard (draft cannot withdraw)', async () => {
    const draft = await createAgentDraft();
    // draft -> withdrawn is not a valid agent transition; the guard returns 403.
    const res = await api.post(`${API_URL}/api/applications/${draft.documentId}/withdraw`, {
      headers: authHeaders(agentJwt),
      data: { data: { reason: 'security-probe' } },
    });
    expect(res.status()).toBe(403);
  });

  test('a guarded transition advances status and writes a timeline-event', async () => {
    const draft = await createAgentDraft();
    expect(draft.status).toBe('draft');

    // submit is the guarded draft -> submitted transition.
    const submit = await api.post(`${API_URL}/api/applications/${draft.documentId}/submit`, {
      headers: authHeaders(agentJwt),
      data: { data: {} },
    });
    expect(submit.status()).toBe(200);
    const submitted = ((await submit.json()) as { data: AppRow }).data;
    expect(submitted.status).toBe('submitted');

    // The draft was created at the staff school, so the school scope can read its
    // timeline. The transition must have produced a timeline-event (audit intact).
    const timeline = await api.get(
      `${API_URL}/api/timeline-events?filters[application][documentId][$eq]=${draft.documentId}&pagination[pageSize]=50`,
      { headers: authHeaders(schoolJwt) },
    );
    expect(timeline.status()).toBe(200);
    const events = ((await timeline.json()) as ListResponse).data ?? [];
    expect(events.length, 'guarded submit must write a timeline-event').toBeGreaterThan(0);
  });
});
