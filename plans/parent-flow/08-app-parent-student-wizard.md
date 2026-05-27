# Task 08 — Parent student creation wizard

**Repo:** `schoolgo-app` · **Depends on:** 01, 03, 06, 07 · **Contract:** §A, §B

## Objective
A parent-facing **multi-step wizard** to create a Student, composing the generic Wizard (Task 06) and MediaUpload (Task 07). Steps: Personal → Education → Guardian → Media (photo + voiceIntro) → Review & submit. On finish, upload media (already uploaded inline via Task 07, so just collect ids) and `POST /api/students`. Leave the agent `StudentForm` untouched.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/module-pattern.md`, `.claude/rules/state-data.md`, `.claude/rules/imports.md`, `.claude/rules/i18n.md`, `.claude/rules/quality.md`
- Existing: `src/modules/students/` (schema, create mutation, types — reuse where possible), `src/modules/forms/` (Tasks 06–07)
- Reference: `src/modules/applications` split conventions

## Work
- **Schema** (`src/modules/students/schemas/parent-student.schema.ts`): zod schema matching Contract §B1 required/optional fields; split-able per step (`personalSchema`, `educationSchema`, `guardianSchema`, `mediaSchema`) merged for final validation.
- **Mutation**: reuse/extend `use-create-student.mutation.ts` to accept `photo`/`voiceIntro` media ids; `POST /api/students`; invalidate `['parent','students']` on success; success/error toast (`sonner`).
- **Components** (`src/modules/students/components/parent-wizard/`):
  - `ParentStudentWizard.tsx` — orchestrates `Wizard` + shared `react-hook-form`; ≤120 lines.
  - `StepPersonal.tsx`, `StepEducation.tsx`, `StepGuardian.tsx`, `StepMedia.tsx` (uses two `MediaUpload`s: image + audio), `StepReview.tsx` (summary + listen/preview).
- **Hook** (`hooks/use-parent-student-wizard.ts`): form instance, per-step field groups for `form.trigger`, submit handler.
- **Route**: `src/app/[locale]/parent/(protected)/students/new/page.tsx` renders the wizard (Server Component shell → client wizard).
- i18n: add `en` keys under a `ParentStudents`/`StudentWizard` namespace; flag for Task 15 sync.

## Sub-agent breakdown (5)
1. **Schema agent** — per-step + merged zod schemas + types.
2. **Mutation agent** — create-student mutation w/ media ids + query invalidation + toasts.
3. **Steps agent** — the 5 step components (RHF-bound fields, shadcn inputs).
4. **Wizard wiring agent** — `ParentStudentWizard.tsx` + `use-parent-student-wizard.ts` + route page.
5. **QA agent** — `tsc`/`lint`; walk the happy path + validation-block path; confirm media ids flow into the create payload.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Wizard blocks advancing past an invalid step; Review shows entered data + image preview + audio playback.
- Submit creates the student with `photo`/`voiceIntro` ids and lands on the students list (or detail) with a success toast.
- Agent `StudentForm` unchanged. `@/` imports, barrel exports, size limits, no hardcoded copy.
