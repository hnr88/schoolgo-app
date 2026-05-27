# Task 15 — i18n sync + sidebar/nav + final integration

**Repo:** `schoolgo-app` · **Depends on:** 08–14 · **Contract:** —

## Objective
Synchronize all new translation keys across the 6 locales, wire the parent sidebar/nav to the new pages, and run a full typecheck/lint integration pass over the whole parent flow.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/i18n.md`, `.claude/rules/imports.md`, `.claude/rules/quality.md`
- **Use the `i18n-sync` agent** for translation synchronization.
- Existing nav: `src/modules/dashboard/components/DashboardSidebar.tsx`, `navigation` module; locales in `src/i18n/messages/{en,ko,ms,th,vi,zh}.json`.

## Work
- **i18n sync**: collect every `en` key added by Tasks 08–14 (namespaces: `ParentStudents`, `StudentWizard`, `ParentDashboard`, `ParentTestResults`, `ParentSettings`, `ParentPayments`, plus any `Dashboard`/`Applications` additions). Run the **i18n-sync agent** to add matching keys to `ko, ms, th, vi, zh` with translations consistent with existing locale style; ensure identical key structure across all 6 files.
- **Sidebar/nav**: add parent menu entries → Dashboard, Students, Applications, Results, Settings, Payments. Use `next-intl` `Link`; active states; icons (lucide). Keep agent/school nav unaffected.
- **Integration pass**: run `pnpm tsc --noEmit` and `pnpm lint` across the repo; fix any cross-task type/lint issues. Verify all parent routes resolve and the protected layout wraps them.

## Sub-agent breakdown (3)
1. **i18n-sync agent** — synchronize all 6 locale files for the new namespaces (identical keys, quality translations).
2. **Nav agent** — parent sidebar entries wired to the new routes with active states/icons.
3. **Integration QA agent** — full `tsc`/`lint`; confirm routes + protected layout + auth gating; report any residual issues.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass for the whole repo.
- All 6 locale files have identical key structure; no missing keys (i18n-sync clean).
- Parent sidebar links to Dashboard/Students/Applications/Results/Settings/Payments; agent/school nav unchanged.
- End-to-end: parent can log in → see dashboard → create a student (photo+voice) → view list/profile → see applications/results → edit settings → see payments coming-soon.
