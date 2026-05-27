# Parent Flow — API Contracts (single source of truth)

All endpoints are Strapi v5 under `/api/*`. Frontend calls them via relative paths (Next proxy → `STRAPI_API_URL`) using `privateApi` (auth) or `publicApi`. Conventions:

- Identifiers are **`documentId`** (24-char string). Never numeric `id` in routes/filters/responses — **except media relations**, which connect by numeric file `id` returned from `/api/upload`.
- **List response:** `{ "data": T[], "meta": { "pagination": { page, pageSize, pageCount, total } } }`
- **Single response:** `{ "data": T }`
- **Auth:** `Authorization: Bearer <jwt>` + `X-User-Type: parent` (added by `privateApi` interceptor).
- **Errors:** `{ "error": { "status": number, "name": string, "message": string } }` via `@strapi/utils` classes.
- Strapi v5 responses are **flattened** (no `attributes` nesting); media `multiple:false` is an object, `multiple:true` is an array.

> Items marked **⚠ VERIFY** must be confirmed against the actual schema/controller before implementing. Do not assume.

---

## A. Media upload — `POST /api/upload`

Used by the wizard and settings to upload `photo` (image) and `voiceIntro` (audio) **before** create/update.

**Request:** `multipart/form-data`, field name **`files`** (single file). Auth required.
**Response `200`:** array of media objects:
```json
[{ "id": 123, "documentId": "abc…", "name": "intro.webm", "url": "/uploads/intro_xyz.webm", "mime": "audio/webm", "size": 84.2, "ext": ".webm" }]
```
- Take `response[0].id` and pass it to the `photo` / `voiceIntro` field on student create/update.
- Allowed types enforced by the field schema: `photo` → images; `voiceIntro` → audio (**⚠ VERIFY** allowedTypes once Task 01 lands).
- Frontend must send `Content-Type: multipart/form-data` (let Axios set the boundary; override the `privateApi` JSON default per-request).

---

## B. Student — `/api/students` (parent-scoped by controller)

`parent` is auto-assigned from `ctx.state.user`. A parent may only read/write **their own** students (controller enforces ownership; **⚠ VERIFY** existing scope in `student` controller and extend if needed).

### B1. Create — `POST /api/students`
**Request body:**
```json
{
  "data": {
    "firstName": "string (required, ≤100)",
    "lastName": "string (required, ≤100)",
    "email": "email (optional)",
    "dateOfBirth": "YYYY-MM-DD (optional)",
    "gender": "male|female|other|prefer_not_to_say (optional)",
    "nationality": "string (required, ≤100)",
    "currentSchool": "string (optional, ≤255)",
    "currentYearLevel": "string (optional, ≤20)",
    "targetEntryYear": "string (required, ≤20)",
    "targetEntryTerm": "string (required, ≤50)",
    "parentGuardianName": "string (required, ≤200)",
    "parentGuardianEmail": "email (optional)",
    "parentGuardianPhone": "string (required, ≤50)",
    "parentGuardianWechat": "string (optional, ≤100)",
    "preferredContactChannel": "whatsapp|wechat|email|sms (optional, default whatsapp)",
    "photo": 123,
    "voiceIntro": 456
  }
}
```
- `photo` / `voiceIntro` are optional numeric media `id`s from `/api/upload`.
- Do **not** accept `parent`, `agent`, `status`, `passportNumber` (private), or `agentNotes` (private/agent-only) from the parent client. Controller sets `parent` and `status: "active"`.
**Response `200`:** `{ "data": Student }` (see B5 shape).

### B2. List — `GET /api/students`
**Query params** (Strapi syntax):
```
pagination[page]=1
pagination[pageSize]=20
sort[0]=createdAt:desc
populate[photo][fields][0]=url
populate[voiceIntro][fields][0]=url
filters[status][$eq]=active            // optional
filters[$or][0][firstName][$containsi]=<search>   // optional
filters[$or][1][lastName][$containsi]=<search>    // optional
```
**Response:** list of `Student`.

### B3. Detail — `GET /api/students/:documentId`
**Query:** `populate[photo][fields][0]=url&populate[voiceIntro][fields][0]=url` (+ optional `populate[applications]`, counts).
**Response:** `{ "data": Student }`. `404` if not owned.

### B4. Update — `PUT /api/students/:documentId`
Same body subset as B1 (all optional). Ownership enforced; `403`/`404` otherwise.

### B5. `Student` response shape (parent-visible fields)
```json
{
  "documentId": "string",
  "firstName": "string", "lastName": "string", "email": "string|null",
  "dateOfBirth": "string|null", "gender": "string|null", "nationality": "string",
  "currentSchool": "string|null", "currentYearLevel": "string|null",
  "targetEntryYear": "string", "targetEntryTerm": "string",
  "parentGuardianName": "string", "parentGuardianEmail": "string|null",
  "parentGuardianPhone": "string", "parentGuardianWechat": "string|null",
  "preferredContactChannel": "string",
  "status": "active|archived|enrolled",
  "photo": { "url": "string" } | null,
  "voiceIntro": { "url": "string", "mime": "string" } | null,
  "createdAt": "ISO", "updatedAt": "ISO"
}
```
`passportNumber` and `agentNotes` are `private` and MUST NOT appear in parent responses (sanitization).

**CONFIRMED enrichments (Task 03) — the controller adds these beyond the base shape:**
- **List item** additionally includes: `activeApplicationCount: number` and `englishTestSummary: { testType, overallScore: string|null, verificationStatus } | null`.
- **Detail** additionally includes: `activeApplicationCount: number`, `documentsCount: number`, `englishTestSummary` (same shape).
- FE may use `englishTestSummary` for at-a-glance dashboard/list badges (Tasks 09/10) without calling §D.
- **List `fields` are server-fixed** (client `fields` ignored for scalars) but client **`populate` IS honored** — so always pass `populate[photo][fields][0]=url&populate[voiceIntro][fields][0]=url&populate[voiceIntro][fields][1]=mime` or media comes back empty.
- **Archived excluded by default** unless the client sends an explicit `filters[status]`.
- Extra non-Strapi list filters available: `appStatus` (`has_active_apps|has_offers|no_applications|enrolled`), `testStatus` (`has_verified_test|has_unverified_test|no_test`), `dateFrom`/`dateTo` (ISO). Invalid values → 400.
- Ownership is derived from the JWT `ctx.state.user.userType` (the `X-User-Type` header is informational only).

---

## C. Parent profile & settings

### C1. Current user — `GET /api/users/me`
Returns the authenticated user. Must include custom scalar fields. **⚠ VERIFY** these are returned by default; if not, Task 02 adds a populate/field selection.
```json
{
  "id": 1, "documentId": "string", "username": "string", "email": "string",
  "userType": "parent", "firstName": "string|null", "lastName": "string|null",
  "phone": "string|null",
  "preferences": { "language": "en", "notifications": { "email": true, "sms": false } } | null,
  "confirmed": true, "blocked": false
}
```
> Note: users-permissions `/users/me` returns the user **unwrapped** (no `data` envelope). Keep that contract.

### C2. Update profile — `PUT /api/users/me`  *(NEW custom route, Task 02)*
Self-update only; the authenticated user is the target (ignore any id in body). Custom route file `01-custom-user.ts` in the users-permissions extension or a `users-me` api (**⚠ VERIFY** where custom user routes belong — see `rules/plugins.md`).
**Request body (all optional):**
```json
{ "firstName": "string", "lastName": "string", "phone": "string",
  "preferences": { "language": "en|ko|ms|th|vi|zh", "notifications": { "email": true, "sms": false } } }
```
- Allowed fields ONLY: `firstName`, `lastName`, `phone`, `preferences`. Reject/ignore everything else (never let a client change `email`, `userType`, `role`, `password` here).
**Response:** updated user (same shape as C1, unwrapped).

### C3. Change password — `POST /api/auth/change-password`  *(users-permissions built-in)*
**Request:** `{ "currentPassword": "string", "password": "string", "passwordConfirmation": "string" }` (auth required).
**Response:** `{ "jwt": "string", "user": { … } }` — frontend must store the new `jwt` in the auth store.

### C4. `preferences` field — added to user content-type (Task 02)
`preferences` is a JSON field on `plugin::users-permissions.user`:
```json
{ "language": "en", "notifications": { "email": true, "sms": false } }
```
Reversible migration. Default `null` (treat as defaults on the client).

---

## D. English test results — `GET /api/english-test-results` (parent-scoped)

**⚠ VERIFY** content-type UID and field names against `schoolgo-api/src/api/english-test-result/content-types/.../schema.json` before implementing (Task 05). Parent may only see results for **their own** students (ownership-verified in controller or via a policy on the student relation).

**Query:**
```
filters[student][documentId][$eq]=<studentDocumentId>   // required for per-student view
pagination[page]=1&pagination[pageSize]=50
sort[0]=testDate:desc
populate[student][fields][0]=firstName
populate[student][fields][1]=lastName
```
**Response (per-result) — CONFIRMED real fields (Task 05):**
```json
{
  "documentId": "string",
  "testType": "aeas|ielts|pte|cambridge|toefl|duolingo|istart|idat|other",
  "overallScore": "string",            // STRING, maxLength 20 (not a number)
  "subScores": { } | null,             // field is `subScores` (NOT sectionScores), JSON
  "testDate": "YYYY-MM-DD",
  "verificationStatus": "unverified|verifying|issuer_verified|direct_delivered|revoked",
  "candidateNumber": "string|null",
  "notes": "string|null",
  "verifiedAt": "ISO|null",
  "student": { "documentId": "string", "firstName": "string", "lastName": "string" },
  "createdAt": "ISO"
}
```
This controller delegates to `super.find` and does NOT fix scalar fields — client `fields`/`populate` are honored normally. Route policy is `global::is-agent-or-parent`; ownership path `student.parent.documentId`; non-owned studentId → empty list. Note: the `englishTestSummary` enrichment on the student list/detail (§B) uses the **same** `verificationStatus` enum — UI status labels must cover all 5 values.
If a parent-scoped endpoint doesn't exist, Task 05 adds ownership enforcement (controller override filtering by `student.parent === ctx.state.user.id`, or a `01-` custom route). A request for a student not owned by the parent returns an empty list (not 403, to avoid leaking existence) — **confirm policy preference in Task 05**.

---

## E. Applications — `/api/applications` (parent-scoped)

The controller already scopes by actor (agent). Task 04 verifies/extends **parent** scoping: a parent sees applications whose `student.parent === ctx.state.user`. **⚠ VERIFY** current scope logic in `application` controller.

### E1. List — `GET /api/applications`
**Query:**
```
pagination[page]=1&pagination[pageSize]=20
sort[0]=createdAt:desc
populate[student][fields][0]=firstName
populate[student][fields][1]=lastName
populate[school][fields][0]=name
filters[status][$eq]=<status>                         // optional
filters[student][documentId][$eq]=<studentDocumentId> // optional
```
**Response (per-application):**
```json
{
  "documentId": "string",
  "status": "draft|submitted|received|under_review|documents_requested|assessment_required|interview_scheduled|interview_completed|offer_made|offer_accepted|waitlisted|pre_enrolment|coe_issued|enrolled|declined|withdrawn",
  "targetYearLevel": "string|null", "targetIntake": "string|null",
  "offerAnnualFee": "number|null", "offerDeadline": "YYYY-MM-DD|null",
  "submittedAt": "ISO|null", "statusChangedAt": "ISO|null",
  "student": { "documentId": "string", "firstName": "string", "lastName": "string" },
  "school": { "documentId": "string", "name": "string" },
  "createdAt": "ISO"
}
```

### E2. Detail — `GET /api/applications/:documentId`
Parent ownership enforced (`404` if not owned). Populate `student`, `school`, and offer fields. (Reuse existing detail populate where present.)

**CONFIRMED (Task 04):** parent access is via the `global::is-agent-or-parent` route policy; ownership path is `student.parent.documentId`. **`findOne` populate is HARDCODED server-side** (`student` {documentId,firstName,lastName}, `school` {documentId,name}, + offer relations) — the FE sends **no** populate for detail. **`find` populate is FE-driven** with server-fixed scalar fields — the FE list query MUST send:
```
populate[student][fields][0]=firstName&populate[student][fields][1]=lastName&populate[student][fields][2]=documentId
populate[school][fields][0]=name&populate[school][fields][1]=documentId
```
Optional `filters[status][$eq]` and `filters[student][documentId][$eq]` only narrow (cannot widen past ownership).

---

## F. Payments — none (this phase)

No payment endpoints. The parent payments page is a **static "Coming soon"** UI (Task 14). Stripe contracts will be specced in a future plan.

---

## Cross-cutting notes for implementers

- **Never** send `private` fields to the parent client; rely on Strapi sanitization in controller overrides.
- **Never** trust client-supplied `parent`/`agent`/`status`/`role` — set server-side.
- Frontend query keys: `['parent','students', params]`, `['parent','student', documentId]`, `['parent','applications', params]`, `['parent','test-results', studentDocumentId]`, `['parent','me']`. Invalidate the relevant key after mutations.
- All new query/mutation hooks live in the owning module's `queries/` and are gated by `useAuthStore(s => s.isAuthenticated)` (mirror `use-applications.query.ts`).
