# Autonomous QA — Decisions Log

Operational/environment decisions only. Functional behavior is NEVER guessed (see prompt Zero-Tolerance).

## 2026-05-27 — Intake answers (user-confirmed)
- **Run servers:** Authorized to override frontend CLAUDE.md Rule 12 ("never run dev/build/start") for this QA run. May run `pnpm dev/build`, `strapi develop`, Playwright, etc.
- **Scope:** BOTH repos — `schoolgo-app` (Next.js 16) frontend and `schoolgo-api` (Strapi v5) backend.
- **Git baseline:** qa branch `qa/autonomous-2026-05-27` created from current working tree in BOTH repos, carrying existing uncommitted changes as baseline (nothing discarded).
- **Auth:** Run `database/seeds/seed-e2e.ts` and/or create dedicated test users (parent/school/agent) via real signup/admin flows in the local e2e DB. Seeded creds logged here.

## 2026-05-27 — Environment choices
- **Backend env:** Use `schoolgo-api/.env.e2e` (local Postgres :5433 + local Meili :7700), NOT `.env` (staging DB 192.168.0.234). Boot via `set -a; . ./.env.e2e; set +a; pnpm develop`.
- **DB:** Existing Docker `schoolgo-pg` (postgres:16-alpine, 127.0.0.1:5433, db/user/pass=schoolgo) already has 111 tables. Will inspect/seed there. No drops/truncates of existing data.
- **Package manager:** pnpm in both repos.

## Seeded / test data (additive only — all via real API path, persisted in DB)
- 2026-05-27 — Created 3 **bookmarks** for parent via real `POST /api/bookmarks {schoolId}` (schools: Abbotsleigh, Alphington Grammar, Amity College). DB bookmarks=3. Exercises B1 create path; enables D11/B14.
- 2026-05-27 — Created 2 **saved-searches** via real `POST /api/saved-searches {name,filterState}` ("Melbourne primary", "VIC secondary"). DB saved_searches=2. Exercises B2 create path; enables D12/B13.
- Prior-session seed (`scripts/seed-e2e.cjs`): parent `parent@schoolgo.test`/`Test1234!`, 12 students, 3 applications, 5 notifications, 9 timeline events, 2 doc-requests, 6 student-documents, 3 pre-enrolment items, 306 schools.

## Verified fixes (real evidence)
- 2026-05-27 — **B9 pagination** FIXED + verified live: student+application `find` now slice via start/limit + return correct `meta.pagination`. Evidence: students pageSize=2 p1/p2→2 rows each (total 12, pageCount 6); applications pageSize=1 p2→1 row (total 3, pageCount 3). Backend commit c56abf3.

## 2026-05-27 — Test-data hygiene + seed fix
- Removed 18 **test-debris students** (E2EWizard*/Wizardchild*/Curltest* from repeated wizard runs) via real DELETE /api/students. They had inflated the list to 19 and — once B9 pagination became real (pageSize=10) — pushed the canonical seeded Aarav/Diya off page 1, breaking 03-students.
- Found seed/test mismatch: seed-e2e created only 2 students (Aarav, Diya) but parent list/search/sort specs assert >= 6. Extended seed-e2e.ts to 6 canonical students (added Kabir/Ananya/Vihaan/Saanvi) and created the 4 in the live DB via real POST /api/students (parent-scoped). DB now = 6 canonical students. Backend commit on seed.
- Removed my earlier redundant bookmark/saved-search seed (3+2) — the saved-schools-searches specs create+delete their own data and assert empty state, which the pre-seed broke.

## 2026-05-27 — Console-error / wiring fixes (all verified via Playwright)
- Dashboard avatar 400s: Next 16 blocks loopback image upstreams -> next.config dangerouslyAllowLocalIP (local backend only). smoke.spec green.
- /parent/search 404: proxy redirected parent /parent/search -> /dashboard/search (no such route for parent). Scoped redirect to agent/school. search + saved-search specs green.
- Wizard photo preview 404 -> CSP block: useMediaUpload now returns absolute backend URL; CSP img-src adds localhost:1337. student-create-edit green.
- Select uncontrolled->controlled warning: gender (StepPersonal) + documentType (DocumentUploadDialog) value={field.value ?? ''}.
- saved-schools React key warning: SavedSchoolsPage key={school.id} (SchoolHit has no documentId).
- i18n MISSING_MESSAGE ParentsComparison.compareLabel: added to all 6 locales.
