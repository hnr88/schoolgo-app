# Task 06 — Generic multi-step wizard primitive

**Repo:** `schoolgo-app` · **Depends on:** — · **Contract:** (none — FE primitive)

## Objective
Build a reusable, headless **multi-step form wizard** usable for any flow (not just students). It manages step state, progress, per-step validation, and next/back/finish — agnostic of field content. The parent student wizard (Task 08) composes it.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/module-pattern.md`, `.claude/rules/imports.md`, `.claude/rules/state-data.md`, `.claude/rules/quality.md`
- Reference module structure: `src/modules/applications`
- Form rules: use `react-hook-form` + `zod` (see `create-form` skill conventions)

## Module to create: `src/modules/forms/`
```
forms/
  components/
    Wizard.tsx              # orchestrator: renders current step + WizardNav; ≤120 lines
    WizardStep.tsx          # wrapper for a single step's content
    WizardProgress.tsx      # step indicator / progress bar
    WizardNav.tsx           # Back / Next / Finish buttons (loading + disabled states)
  hooks/
    use-wizard.ts           # step index state, canNext/canBack, goNext/goBack/goTo, isFirst/isLast
  types/
    wizard.types.ts         # WizardStepConfig, WizardProps, etc.
  index.ts                  # barrel: public exports only
```

## Design constraints
- **Headless/generic**: a step is described by `{ id, title, fields? , validate? }`; the consumer supplies the per-step content + a single `react-hook-form` instance (recommend one shared form, validating a subset of fields per step via `form.trigger(fieldNames)` before `goNext`).
- `Wizard` accepts: `steps: WizardStepConfig[]`, `children` render per active step (or a render-map), `onFinish`, `isSubmitting`.
- Progress component shows completed/active/upcoming; accessible (`aria-current`, list semantics).
- No business logic, no API calls, no student-specific fields. `'use client'` only where state/handlers require it.
- Uses shadcn primitives (Button, Progress/Separator) by wrapping — never edit `components/ui/*`.
- All visible labels (Back/Next/Finish/step titles) come from the consumer via props or `t()`; the primitive ships no hardcoded copy.

## Sub-agent breakdown (3)
1. **Types + hook agent** — `wizard.types.ts` + `use-wizard.ts` (pure state machine; unit-testable).
2. **Components agent** — `Wizard`, `WizardStep`, `WizardProgress`, `WizardNav` using shadcn wrappers.
3. **Test + barrel agent** — Vitest unit test for `use-wizard` (step transitions, guards); `index.ts` barrel; `tsc`/`lint`.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- `use-wizard` covered by a passing unit test (`pnpm test --run`).
- Zero student/parent-specific code; reusable in isolation. Files within size limits; `@/` imports; barrel exports.
