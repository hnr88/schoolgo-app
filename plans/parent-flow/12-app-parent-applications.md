# Task 12 — Applications status & offers page (wired)

**Repo:** `schoolgo-app` · **Depends on:** 04 · **Contract:** §E

## Objective
A parent page listing their students' applications with status and offers, wired to the parent-scoped applications endpoint (Task 04). Reuse the existing `applications` module components (the gold-standard module).

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/state-data.md`, `.claude/rules/module-pattern.md`, `.claude/rules/nextjs-patterns.md`, `.claude/rules/i18n.md`
- Existing: `src/modules/applications/*` (ApplicationListPage, ApplicationTable, ApplicationStatusBadge, ApplicationDetailPage, use-applications.query, constants/format).

## Work
- **Queries**: reuse `use-applications.query.ts` / `use-application.query.ts`. Ensure parent query keys/params align with Contract §E (`['parent','applications',params]` or keep existing keys — be consistent). Confirm populate of `student` + `school`.
- **List page**: `src/app/[locale]/parent/(protected)/applications/page.tsx` → reuse `ApplicationListPage` (status filter, search, pagination). Columns show student name, school, status badge, offer info.
- **Detail page**: `src/app/[locale]/parent/(protected)/applications/[documentId]/page.tsx` → reuse `ApplicationDetailPage` (status timeline, offer details). Read-only for parents (no agent-only actions) — **hide/omit** agent-only mutations.
- Loading/empty/error states.
- i18n: reuse existing `Applications` keys; add any new parent-specific `en` keys; flag for Task 15.

## Sub-agent breakdown (3)
1. **Query alignment agent** — confirm queries/keys/populate for parent scope; adjust minimally.
2. **List + detail page agent** — wire routes reusing applications components; ensure parent read-only.
3. **States + QA agent** — loading/empty/error; `tsc`/`lint`; verify no agent-only actions render for parents.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Parent sees their students' applications + statuses + offers; detail shows timeline/offer; no agent-only controls.
- Reuses `applications` module (no duplicate components). No client `fetch`; auth-gated; no hardcoded copy.
