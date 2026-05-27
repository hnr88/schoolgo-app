# Task 09 — Parent dashboard home (wired)

**Repo:** `schoolgo-app` · **Depends on:** 03, 04, 05 · **Contract:** §B, §D, §E

## Objective
Replace the placeholder `(protected)/dashboard` `<h1>` with a real parent dashboard: overview cards/summaries wired to live data — students count + quick "Add student" CTA, recent applications & their statuses, latest English test results, and quick links. Reuse existing dashboard components where present.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/state-data.md`, `.claude/rules/module-pattern.md`, `.claude/rules/nextjs-patterns.md`, `.claude/rules/i18n.md`
- Existing: `src/modules/dashboard/components/*` (ActionBanner, ActivityFeed, DeadlinesList, PipelineCards, QuickActions), `src/app/[locale]/parent/(protected)/dashboard/page.tsx`, `(protected)/layout.tsx`

## Work
- Build/compose a `ParentDashboard` view in `src/modules/dashboard` (or a `parent-dashboard` sub-folder) that uses the queries from Tasks 03/04/05 (students list, applications list, test results). Add small summary queries if needed (e.g., counts) in the relevant module `queries/`.
- Cards: **Students** (count + Add CTA → `/parent/(protected)/students/new`), **Applications** (recent statuses via `ApplicationStatusBadge` reuse), **Test results** (latest per student), **Quick actions**.
- Loading + empty + error states for each card (Suspense/skeletons per `create-loading-state` conventions; error boundaries where appropriate).
- Render in `dashboard/page.tsx` (Server Component shell → client cards reading TanStack Query). No client `fetch`.
- i18n: `Dashboard`/`ParentDashboard` `en` keys; flag for Task 15.

## Sub-agent breakdown (4)
1. **Data agent** — confirm/extend queries (students, applications, results); add count/summary helpers in `queries/`.
2. **Cards agent** — summary card components (students, applications, results, quick actions) reusing existing dashboard + applications components.
3. **States agent** — loading skeletons, empty states, error handling per card.
4. **Page wiring + QA agent** — assemble in `dashboard/page.tsx`; `tsc`/`lint`; verify gated-by-auth queries and graceful empties.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Dashboard shows real counts/lists for a logged-in parent; empty states when no students/applications/results.
- "Add student" links to the wizard. No client `fetch`; queries gated by `isAuthenticated`. No hardcoded copy.
