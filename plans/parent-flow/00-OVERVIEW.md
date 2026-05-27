# Parent Flow — Implementation Plan (Overview)

Cross-repo feature build for the **parent portal**: login → student creation (multi-step wizard with photo + voice upload) → dashboard wired to live data (students, English test results, applications/offers) → parent settings → payments "coming soon".

- **Frontend repo:** `/Users/hunor.nagy/Code/schoolgo-app` (Next.js 16, App Router, next-intl, TanStack Query, Zustand, Axios).
- **Backend repo:** `/Users/hunor.nagy/Code/schoolgo-api` (Strapi v5, Document Service API).
- **Contracts:** see `00-API-CONTRACTS.md` — the single source of truth for every endpoint. Implement against it; do not invent shapes.

## Locked decisions (from product owner)

1. **Payments** → static **"Coming soon"** section now. Real Stripe later. No backend payment work in this plan.
2. **Student media** → add **`voiceIntro`** (single audio media) to the `Student` content-type; keep existing `photo`. Requires schema change + reversible migration + `ts:generate-types`.
3. **Wizard** → build a **generic, reusable multi-step form primitive** + a **generic media-upload-with-preview** component (image preview + audio playback). The agent's existing single-step `StudentForm` stays untouched. The parent student wizard composes the generic primitives.
4. **Dashboard surfaces** → students list/profiles (core), English test results (Phase 1, external tests), application status & offers, parent settings.

## What already exists (DO NOT rebuild)

- **Auth is complete**: `/api/auth/local` login, register, forgot/reset password, Zustand JWT store (`use-auth-store.ts`), `privateApi`/`publicApi` axios with `X-User-Type` header + 401 redirect, role-based `ProtectedLayout` + `useRequireAuth`. Parent login works today.
- **Parent routes**: `/[locale]/parent/{sign-in,sign-up,forgot-password,reset-password,search,schools/[slug]}` + `(protected)/dashboard` (placeholder `<h1>` only) + `(protected)/layout.tsx` (sidebar + header).
- **Student data model**: `Student` content-type with 16 fields incl. `photo`. Parent ownership via `parent` relation. Parent-scoped CRUD exists in `student` controller.
- **Gold-standard module to copy**: `src/modules/applications` (queries/types/constants/lib/hooks/components split + barrel `index.ts`).

## Task DAG (15 tasks)

Backend foundation first, then reusable FE primitives, then vertical UI slices, then i18n/integration. Dependencies in brackets.

| # | Task | Repo | Depends on |
|---|---|---|---|
| 01 | `Student.voiceIntro` audio field + migration + controller/populate | api | — |
| 02 | Parent profile self-update `PUT /users/me` + `preferences` field + migration | api | — |
| 03 | Parent-scoped students list/detail (verify ownership, populate photo+voiceIntro) | api | 01 |
| 04 | Parent-scoped applications list/detail (ownership scope, populate) | api | — |
| 05 | Parent-scoped English test results list (ownership-verified) | api | — |
| 06 | Generic multi-step wizard primitive (`modules/forms`) | app | — |
| 07 | Generic media upload + preview component (image preview + audio player) | app | — |
| 08 | Parent student creation wizard (composes 06+07; create + media upload) | app | 01,03,06,07 |
| 09 | Parent dashboard home (overview cards, wired) | app | 03,04,05 |
| 10 | Parent students list + profile pages (wired; photo + voice playback) | app | 01,03,07 |
| 11 | English test results page (wired) | app | 05 |
| 12 | Applications status & offers page (wired; reuse applications module) | app | 04 |
| 13 | Parent settings page (profile, password, notifications, language) | app | 02 |
| 14 | Payments "Coming soon" section + nav entry | app | — |
| 15 | i18n sync (6 locales) + sidebar/nav + final `tsc`/`lint` integration | app | 08–14 |

Parallelizable at the start: **01, 02, 04, 05** (api) and **06, 07** (app) have no intra-plan dependencies.

## Loop protocol

Tasks are executed **one at a time, in DAG order** (lowest unblocked ID first). For each task:

1. **Read the rules first.** Backend tasks: read `/Users/hunor.nagy/Code/schoolgo-api/CLAUDE.md` + the matching `.claude/rules/*.md`. Frontend tasks: read `/Users/hunor.nagy/Code/schoolgo-app/CLAUDE.md` + the matching `.claude/rules/*.md`. The launching agent MUST tell sub-agents to do this.
2. **Spawn 3–5 sub-agents** for the task, each owning a clear slice (e.g. schema, controller, route; or query-layer, component, wiring). Sub-agents must be told which repo and to follow that repo's CLAUDE.md exactly.
3. **Implement strictly against `00-API-CONTRACTS.md`.** No shape drift across repos.
4. **Definition of done (every task):**
   - Backend: `pnpm tsc --noEmit` passes; no `entityService`; no `populate: '*'`; custom routes `01-`-prefixed; sanitize/transform in overrides; `@strapi/utils` errors; migration has `down()`; `pnpm strapi ts:generate-types` run after schema changes.
   - Frontend: `pnpm tsc --noEmit` and `pnpm lint` pass; Server Components by default; no client `fetch` (typed Axios only); types in `types/`; logic in `hooks/`/`lib/`; queries/mutations in `queries/`; `@/` imports; barrel exports.
   - No user-facing hardcoded strings — use `t()` and add keys (Task 15 syncs all locales; per-task, add `en` keys at minimum and flag for sync).
5. **Never run** `dev`/`build`/`start` in either repo.
6. On completion, mark the task done and proceed to the next unblocked task.

## Conventions cheat-sheet

- FE module layout mirrors `src/modules/applications`: `components/ hooks/ queries/ schemas/ types/ constants/ lib/ index.ts`. Files ≤200 lines, components ≤120.
- API calls from the client go through relative `/api/...` (Next proxy → Strapi). Use `privateApi` (auth) / `publicApi`.
- Strapi v5: `documentId` everywhere, list response `{ data: [...], meta: { pagination } }`, single `{ data: {...} }`, media `multiple:false` returns an object.
- i18n namespaces are PascalCase (`Auth`, `Dashboard`, `ParentStudents`…), keys camelCase, 6 locales: `en, ko, ms, th, vi, zh`.
