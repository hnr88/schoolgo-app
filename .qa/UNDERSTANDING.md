# App Understanding — source of truth for intended behavior

**Primary spec docs (read these for any feature; do NOT guess behavior):**
- `plans/parent-improvement/TASKS.md` — current improvement pass (A/B/C/D/E tracks). Authoritative task + runbook.
- `plans/parent-flow/00-API-CONTRACTS.md` — v1 parent API contracts (source of truth).
- `plans/parent-flow-v2/00-API-CONTRACTS.md` — v2 contracts (notifications, docs, timeline, pre-enrolment, saved schools/searches, edit/archive).
- Memories: parent-flow-build, parent-flow-v2, parent-improvement-run-env (architecture, gotchas, run topology).

## The app
SchoolGo: a school-discovery + enrolment platform. Multiple portals (parent, school, agent) on one Next.js 16 app (parent = plain `localhost`, others = `*.localhost`) backed by one Strapi v5 API. This QA run scopes the **parent portal** end-to-end (+ the shared search/school surfaces it uses) and the backend endpoints it touches.

## Parent portal surface (intended)
- **Auth**: login (`/api/auth/local`), forgot/reset password. Parent user has custom UP role `type='parent'`.
- **Dashboard** `/parent/dashboard`: 3 summary cards (students, applications/tests), quick actions.
- **Students** `/parent/students`: list (search/sort/paginate), archive toggle; `/new` multi-step wizard (personal→education→guardian→media: photo + voiceIntro) → `POST /api/students`; `/[id]` detail; `/[id]/edit` → `PUT /api/students/{id}`.
- **Applications** `/parent/applications`: list + filters; `/[id]` detail = header (status badge, daysInStatus computed in controller), info, offer, **timeline**, **pre-enrolment checklist**, **document-requests + student-documents (upload)**.
- **Results** `/parent/results`: per-student English test results via `GET /api/english-test-results` (scoped to parent's students); verification badges.
- **Settings** `/parent/settings` (Radix tabs): Profile (`PUT /api/users/me`), Password (`POST /api/auth/change-password`), Preferences (language + email/SMS toggles, `PUT /api/users/me`).
- **Notifications** `/parent/notifications` + header bell: `GET /notifications/me`, `/unread-count`, `POST /:id/read`, `/read-all`. Bell polls via TanStack `refetchInterval`.
- **Saved schools** `/parent/saved-schools`: `GET/POST/DELETE /api/bookmarks`. **Saved searches** `/parent/saved-searches`: `GET/POST/DELETE /api/saved-searches` + "run search".
- **Search** `/parent/search`: `POST /api/search/schools` (Meilisearch-backed) + autocomplete; **School detail** `/parent/schools/[slug]`.
- **Payments** `/parent/payments`: intentional "coming soon" page (no backend).

## Backend parent-scoping pattern (binding)
- Route policy `global::is-agent-or-parent` + controller ownership filter on `student.parent.documentId` derived from JWT `ctx.state.user.documentId` (NOT the X-User-Type header — header only selects the scoping branch). Non-owned → 404 (detail) / empty (collections).
- Parents have NO separate profile record — scope directly by user `documentId`.
- Core-router exposes URL id as `ctx.params.id` (the documentId value), read `ctx.params.documentId ?? ctx.params.id`.

## Live baseline verified 2026-05-27 (this run, vs :1337 real DB)
- Parent login OK; users/me 200; students 200; applications 200 (3); notifications/me 5, unread obj; english-test-results 4; bookmarks/saved-searches 200 but **0 rows**.
- **DEFECT B9 (live):** `students?pagination[pageSize]=2` → 12 rows; `applications?pageSize=2` → 3. pageSize ignored / no correct pagination meta.
- `/api/test-results` 404 but FE results hook actually calls `/api/english-test-results` (200) — orphan route, B16 likely a non-issue (verify page renders).
