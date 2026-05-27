# Parent Flow v2 — API Contracts (single source of truth)

All endpoints Strapi v5 under `/api/*`. FE calls via relative paths (Next proxy → `STRAPI_API_URL`) with `privateApi` (auth) — adds `Authorization: Bearer <jwt>` + `X-User-Type: parent`. Conventions: `documentId` identifiers; list `{ data: T[], meta: { pagination } }`; single `{ data: T }`; errors `{ error: { status, name, message } }` via `@strapi/utils`; responses flattened; media `multiple:false` → object.

Legend: **[EXISTING]** verified against the live controller — reuse as-is, FE only. **[NEW]** must be added this build (backend slice).

---

## 1. Notifications — `notification` — **[EXISTING, FE only]**

Verified in `schoolgo-api/src/api/notification/`. All gated `global::is-authenticated`, scoped by `ctx.state.user.documentId`. Parents authorized.

### 1.1 List — `GET /api/notifications/me`  **[EXISTING]**
Query: `page` (default 1), `pageSize` (default 10, max 100), `eventType` (single enum), `read` (`"true"|"false"`), `dateFrom`, `dateTo` (ISO). Invalid `read`/`pageSize`/date → 400.
Response: `{ data: NotificationItem[], meta: { pagination: { page, pageSize, total } } }`.
```jsonc
// NotificationItem (enriched server-side)
{
  "documentId": "string",
  "eventType": "application_submitted|application_received|status_changed|documents_requested|documents_uploaded|message_received|offer_made|offer_accepted|offer_deadline_approaching|offer_deadline_expired|application_declined|application_withdrawn|interview_scheduled|coe_issued|enrolled|intake_closed|template_updated|capacity_low|checklist_item_updated|test_results_ready|application_viewed|weekly_pipeline_summary|score_revoked",
  "title": "string",
  "body": "string|null",
  "priority": "high|medium|low",
  "readAt": "ISO|null",
  "createdAt": "ISO",
  "application": { "documentId": "string" } | null,
  "student": { "documentId": "string" } | null,
  "timeGroup": "today|yesterday|this_week|older",
  "entityType": "application|student|message|null",
  "entityDocumentId": "string|null"
}
```
- `entityType`/`entityDocumentId` give the FE a click-through target (e.g. `application` → `/parent/applications/:entityDocumentId`).

### 1.2 Unread count — `GET /api/notifications/unread-count`  **[EXISTING]**
Response: `{ data: { count: number } }`.

### 1.3 Mark one read — `PUT /api/notifications/:documentId/read`  **[EXISTING]**
Idempotent. `404` if not found; `403` if not owned. Response: `{ data: Notification }`.

### 1.4 Mark all read — `PUT /api/notifications/read-all`  **[EXISTING]**
Response: `{ data: { updated: number } }`.

> FE: badge polling uses TanStack Query `refetchInterval` on 1.2 (e.g. 60s). No raw `setInterval`.

---

## 2. Bookmarks — `bookmark` — **[EXISTING, FE already wired]**

Verified in `schoolgo-api/src/api/bookmark/`. `is-authenticated`, user-scoped. **FE hooks already exist** in `src/modules/school-search/queries/` — reuse them; do not re-implement.

- `POST /api/bookmarks` body `{ "schoolId": "<school documentId>" }` → `{ data: { documentId, schoolId, createdAt } }`. Idempotent (returns existing).
- `GET /api/bookmarks` → `{ data: SchoolHit[] }` where each hit: `{ id, slug, name, photoUrl, logoUrl, coverImageUrl, suburb, state, lat, lng, enrolmentStatus, sector, curriculumCodes: string[], accommodation, annualTuitionFrom: number|null }`.
- `DELETE /api/bookmarks/:schoolDocumentId` → `204`.

FE task: a parent `Saved schools` page rendering `useBookmarks()` results as school cards (reuse `school-search` card/grid). No backend, no new query hook.

---

## 3. Saved searches — `saved-search` — **[EXISTING, FE already wired]**

Verified in `schoolgo-api/src/api/saved-search/`. `is-authenticated`, user-scoped. **FE hooks already exist** in `src/modules/school-search/queries/`.

- `POST /api/saved-searches` body `{ "name": "string (≤100, HTML-stripped)", "filterState": object }` → `{ data: { documentId, name, filterState, lastResultCount, createdAt } }`. Stamps `lastResultCount` by running the search once; invalid `filterState` → 400.
- `GET /api/saved-searches` → `{ data: SavedSearch[] }` (each `{ documentId, name, filterState, lastResultCount, createdAt }`).
- `DELETE /api/saved-searches/:documentId` → `204`; `404` if missing, `403` if not owned.

FE task: a parent `Saved searches` page rendering `useSavedSearches()`, each row re-runs the search by navigating to `/parent/search` with `filterState` applied (reuse `SavedSearchesPanel` if portable). No backend, no new query hook.

---

## 4. Document requests + upload — **[NEW backend]**

### 4.1 `document-request` parent list — `GET /api/document-requests`  **[NEW — add parent branch]**
Core route exposes `find` (`is-authenticated`) + `create` (`is-school`). Controller `find` currently branches `agent`/`school` only; **add a `parent` branch** filtering `application: { student: { parent: { documentId: { $eq: ctx.state.user.documentId } } } }` (mirror existing branches; non-parent/agent/school → `ForbiddenError`). Keep `super.find(ctx)`.
FE query: `filters[application][documentId][$eq]=<appDocumentId>` + `populate[requestedBy][fields][0]=documentId`.
Response (per request):
```jsonc
{
  "documentId": "string",
  "documentTypes": ["passport","english_test", ...],   // json array of student-document documentType values
  "note": "string|null",
  "status": "pending|partially_fulfilled|fulfilled",
  "fulfilledAt": "ISO|null",
  "createdAt": "ISO"
}
```

### 4.2 `student-document` parent list — `GET /api/student-documents/mine/by-application/:applicationDocumentId`  **[NEW custom route + handler]**
New `01-`-prefixed parent route (the existing `by-application` is `is-school` — do not touch it). Policy `global::is-agent-or-parent` (handler then re-checks parent ownership) OR `is-authenticated` + ownership check. Ownership: application → `student.parent.documentId === user.documentId`; non-owned → `403`/`404`. Returns the student-documents the parent has uploaded for that application (`status: 'active'`).
Response (per doc): `{ documentId, documentType, fileName, status, expiresAt, notes, flowDirection, uploadedByRole, file: { url, name, mime, size } | null, createdAt }`.

### 4.3 `student-document` parent create (upload) — `POST /api/student-documents/mine`  **[NEW custom route + handler]**
New `01-`-prefixed parent route. Body:
```jsonc
{
  "documentType": "passport|school_reports|english_test|birth_certificate|parent_passport|immunisation|personal_statement|guardian_nomination|current_visa|welfare_docs|financial_evidence|oshc|written_agreement|conditions_of_entry|offer_acceptance|coe|caaw_letter|photo|other",
  "file": 123,                         // numeric media id from POST /api/upload (field `files`)
  "fileName": "string (optional, ≤255)",
  "notes": "string (optional)",
  "student": "<student documentId>",   // REQUIRED; must be owned by the parent
  "application": "<application documentId>"  // optional; if present must belong to the student
}
```
Handler: verify `student.parent.documentId === user.documentId` (else `403`); if `application` given, verify it belongs to that student; create with server-set `status: 'active'`, `flowDirection: 'parent_to_school'`, `uploadedByRole: 'parent'`. Never trust client `status`/`flowDirection`/`uploadedByRole`. Sanitize output.
Response: `{ data: StudentDocument }` (4.2 shape).

### 4.4 Schema migration — `student-document` enums  **[NEW migration + ts:generate-types]**
Add `"parent"` to `uploadedByRole` enum and `"parent_to_school"` to `flowDirection` enum in `student-document/content-types/.../schema.json`. Reversible knex migration (`up` adds, `down` removes — follow `schoolgo-api/.claude/docs/12-migrations.md`; SQLite stores enums as strings, Postgres may use a check constraint — handle both per the docs). Run `pnpm strapi ts:generate-types` after.

> FE upload: POST file to `/api/upload` (field `files`, `Content-Type: multipart/form-data`) → take `response[0].id` → POST 4.3. Reuse `useMediaUpload` mutation; allowedTypes for the field are `files`+`images` (PDF/image). Do not modify the shared `MediaUpload` component unless confirmed non-breaking.

---

## 5. Application timeline — `timeline-event` — **[NEW backend]**

### 5.1 Parent list — `GET /api/timeline-events`  **[NEW — add parent branch]**
Core route exposes `find`+`findOne` (`is-authenticated`). Controller `find` branches `agent`/`school` only; **add a `parent` branch** injecting filter `application: { student: { parent: { documentId: { $eq: ctx.state.user.documentId } } } }` then `super.find(ctx)` (mirror existing branches; unknown userType → `ForbiddenError`). Read-only (no parent create/update).
FE query (per application detail):
```
filters[application][documentId][$eq]=<appDocumentId>
sort[0]=createdAt:desc
pagination[pageSize]=100
```
Response (per event):
```jsonc
{
  "documentId": "string",
  "eventType": "status_change|document_uploaded|document_requested|message_sent|message_received|test_results|offer_made|offer_extended|offer_withdrawn|offer_accepted|coe_issued|interview_scheduled|interview_completed|application_submitted|application_withdrawn|checklist_item_updated|capacity_impact",
  "description": "string",
  "actorRole": "agent|school_staff|system|null",
  "metadata": {} | null,
  "createdAt": "ISO"
}
```
- Do NOT populate `actor` (a user) for the parent — keep it out of the FE query (privacy). `actorRole` is sufficient for the UI label.

---

## 6. Pre-enrolment checklist — `pre-enrolment-item` — **[NEW backend, parent read-only]**

### 6.1 Parent list — `GET /api/pre-enrolment-items/mine/by-application/:applicationDocumentId`  **[NEW custom route + handler]**
New `01-`-prefixed parent route (existing `by-application` is `is-school`; `summary/:applicationDocumentId` lacks ownership — do not rely on or alter them). Policy `global::is-agent-or-parent` + handler ownership re-check: application → `student.parent.documentId === user.documentId`; non-owned → `403`. **Read-only** — parents do not submit/approve (those stay agent/school).
Response (per item):
```jsonc
{
  "documentId": "string",
  "itemType": "written_agreement|oshc|guardian_nomination|financial_evidence|custom",
  "customLabel": "string|null",
  "status": "pending|submitted|approved|rejected",
  "note": "string|null",
  "submittedAt": "ISO|null",
  "reviewedAt": "ISO|null",
  "oshcProvider": "string|null",
  "oshcPolicyNumber": "string|null",
  "oshcCoverStartDate": "YYYY-MM-DD|null",
  "oshcCoverEndDate": "YYYY-MM-DD|null",
  "oshcArrangement": "school_arranged|agent_arranged|either|null",
  "createdAt": "ISO"
}
```
- Sort `createdAt:asc`. Do NOT populate `reviewedBy` for the parent.
- The handler MAY also return a small summary `{ total, approved, pending, submitted, rejected, allComplete }` for the FE progress header (compute inline; do not call the unowned `summary` route).

---

## 7. Edit / archive student — `student` — **[EXISTING, FE only]**

Verified in `schoolgo-api/src/api/student/`. All `is-authenticated` + parent ownership via `assertStudentAccess`.

- **Edit** — `PUT /api/students/:documentId` **[EXISTING]**. Body = the create subset (all optional); controller strips `agent`/`parent`/`status`. Same `Student` response shape as v1 contracts §B5. `403`/`404` if not owned.
- **Archive** — `POST /api/students/:documentId/archive` **[EXISTING]**. Sets `status: 'archived'`. Idempotent. Response `{ data: Student }`.
- **Unarchive** — `POST /api/students/:documentId/unarchive` **[EXISTING]**. Sets `status: 'active'`. Idempotent.
- List (`GET /api/students`) already **excludes archived** unless `filters[status]` is sent explicitly — so a "Show archived" toggle sends `filters[status][$eq]=archived`.

FE task: reuse the existing parent student wizard in **edit mode** (prefill via `GET /api/students/:documentId`, submit via PUT) + archive/restore buttons on the student profile/list (new mutations consuming the existing endpoints). No backend.

---

## Cross-cutting (both repos)

- Parent must only see/act on **own** data; enforce server-side via `student.parent.documentId === ctx.state.user.documentId` (or `application.student.parent...`). Never trust client `parent`/`agent`/`status`/`role`/`flowDirection`/`uploadedByRole`.
- Never send `private` fields; rely on `sanitizeOutput`.
- New FE query/mutation hooks live in the owning module's `queries/`, gated by `useAuthStore(s => s.isAuthenticated)`. Invalidate the matching `['parent', ...]` key after mutations.
- i18n: add `en` keys per feature; i18n-sync mirrors to the other 5 locales.
</content>
