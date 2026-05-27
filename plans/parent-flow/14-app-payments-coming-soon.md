# Task 14 — Payments "Coming soon" section

**Repo:** `schoolgo-app` · **Depends on:** — · **Contract:** §F (none)

## Objective
A parent **Payments** page that is a polished **"Coming soon"** placeholder (real Stripe later). No API calls. Optionally preview the Phase-2 test-mode plans as informational cards (Practice / Placement / Progress) marked "coming soon".

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/module-pattern.md`, `.claude/rules/tailwind.md`, `.claude/rules/i18n.md`
- Look at existing "coming soon"/empty-state styling (e.g. `launching-soon` route, `DashboardPlaceholder`) for visual consistency.

## Work
- **Route**: `src/app/[locale]/parent/(protected)/payments/page.tsx`.
- **Component**: a `PaymentsComingSoon` view (place in `src/modules/dashboard` or a small `payments` module) — heading, explanatory copy, an illustration/icon (lucide), and optional informational plan cards (no buttons that imply purchase; clearly labelled "coming soon").
- No payment SDK, no API calls, no env keys. Static + i18n only.
- i18n: `ParentPayments` `en` keys; flag for Task 15.

## Sub-agent breakdown (2)
1. **Component agent** — `PaymentsComingSoon` (responsive, on-brand, lucide icon, optional plan cards) following tailwind rules.
2. **Route + QA agent** — wire the route; `tsc`/`lint`; verify no network calls and no hardcoded copy.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- `/parent/payments` renders a clean coming-soon page; no API/SDK calls; all copy via `t()`.
