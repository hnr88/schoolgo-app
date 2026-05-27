# Task 11 — English test results page (wired)

**Repo:** `schoolgo-app` · **Depends on:** 05 · **Contract:** §D

## Objective
A parent page that shows English test results per student (Phase 1 external tests), wired to the parent-scoped endpoint from Task 05.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/state-data.md`, `.claude/rules/module-pattern.md`, `.claude/rules/nextjs-patterns.md`, `.claude/rules/i18n.md`
- **Contract §D** (use the field names Task 05 confirmed — check 05's completion note for any corrections).

## Work
- **Module**: `src/modules/test-results/` (mirror `applications` split): `queries/use-test-results.query.ts` (key `['parent','test-results',studentDocumentId]`, gated by auth, `GET /api/english-test-results` with `filters[student][documentId][$eq]`), `types/test-result.types.ts`, `constants/` (testType labels, verification status badges), `components/TestResultsList.tsx`, `components/TestResultCard.tsx` (or table), `index.ts`.
- **Routes**:
  - Per-student: surfaced on the student profile (Task 10) and/or `parent/(protected)/students/[documentId]/results`.
  - Optional aggregate page `parent/(protected)/results` listing latest results across students (student selector).
- Loading/empty/error states; verification-status badge; section scores rendered if present.
- i18n: `ParentTestResults` `en` keys; flag for Task 15.

## Sub-agent breakdown (3)
1. **Query + types agent** — query hook + types/constants matching Task 05's confirmed schema.
2. **Components agent** — list/card with score + verification badge + section breakdown.
3. **Route + states + QA agent** — wire page(s), loading/empty/error, `tsc`/`lint`.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Results render for a selected/owned student; empty state when none; non-owned student → empty (per Task 05).
- No client `fetch`; auth-gated query; no hardcoded copy; module follows the `applications` pattern.
