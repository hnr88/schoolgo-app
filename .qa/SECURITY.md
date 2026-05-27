# API Security Sweep — evidence (2026-05-27)

Tested against the real backend (:1337) + real DB. Parent: `parent@schoolgo.test`. 2nd parent created for cross-tenant tests: `parent2-qa@schoolgo.test` (promoted to Parent role).

## S1 — AuthN/AuthZ enforced ✓
- No token → **403** on `/api/students`, `/api/applications`, `/api/notifications/me`, `/api/bookmarks`, `/api/saved-searches`, `/api/users/me`.
- Forged/garbage Bearer token → **401** on `/api/students`, `/api/users/me`.

## S2 — Object-level / cross-tenant access ✓ (FIXED a real LEAK)
- **DEFECT FOUND + FIXED:** `student.find` leaked **all tenants' students**. Root cause: `sanitizeQuery` strips filters on the private `parent`/`agent` relations, dropping the ownership filter set on `ctx.query`; `findMany` then returned every student. Latent until a 2nd parent existed (also silently affected agent scope). Fix: re-apply `studentOwnershipFilter(actorScope)` to the `findMany` query **after** `sanitizeQuery` (spread last so a client can't widen it). Backend commit on `src/api/student/controllers/student.ts`.
- Evidence — before fix: parent1 list (11) **included** "Parent2 Child" (owned by parent2). After fix: parent1 list (6) **excludes** it ("ISOLATED ✓").
- Direct access already denied: parent1 `GET`/`PUT`/`DELETE` parent2's student → **403**.
- Other parent-scoped finds audited and SAFE (they avoid the trap): english-test-result resolves owned student IDs then filters `student.documentId.$in`; timeline-event / document-request / pre-enrolment-item query via Document Service directly (not `super.find`); bookmark / saved-search filter by `user.documentId`; application `find` applies `combinedFilters` straight to `findMany`.

## S3 — Input validation / mass-assignment ✓
- `POST /api/students` with injected `parent:"<bogus>"`, `role:1`, `isAdmin:true` → created student's owner = the **JWT user** (not the injected id); `role`/`isAdmin` ignored. Ownership is server-assigned from `ctx.state.user`, never the body.

## S4 — Response data exposure ✓
- `GET /api/users/me` returns only `id, documentId, username, email, provider, confirmed, blocked, userType, firstName, lastName, phone, preferences, timestamps`. **No** `password`, `resetPasswordToken`, or `confirmationToken`.

## S6 — Transport / config ✓ (minor note)
- CORS configured with an `origin` allowlist (not `*`) in `config/middlewares.ts`.
- Real secrets gitignored: `.env`, `.env.staging`, `.env.production` not tracked. `.env.e2e` is tracked but holds only local-throwaway dev creds (localhost DB `schoolgo/schoolgo`, local Meili key) — low risk; flagged for awareness.

## S5 — File upload limits — RECOMMENDATION (not auto-fixed)
- `POST /api/upload` accepted a **25MB `application/octet-stream`** file (HTTP 201). No custom size/type restriction beyond Strapi's 200MB default; arbitrary MIME types accepted.
- NOT auto-fixed: the correct max size and allowed MIME set is a **product decision** (the endpoint is shared by student photos/voice, school logos, document uploads with distinct needs). Guessing a limit risks breaking legitimate flows (prompt rule: no functional assumptions). **Recommendation:** configure `plugin::upload` `sizeLimit` (e.g. 10–25MB) and validate allowed MIME types per upload context.
