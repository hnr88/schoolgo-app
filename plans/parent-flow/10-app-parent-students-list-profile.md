# Task 10 — Parent students list + profile pages (wired)

**Repo:** `schoolgo-app` · **Depends on:** 01, 03, 07 · **Contract:** §B

## Objective
Parent-facing **students list** and **student profile** pages wired to the API, showing photo and a **voice playback** (reuse Task 07's AudioPreview). Reuse `src/modules/students` query/components where they already work for parents; add parent routes.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/state-data.md`, `.claude/rules/module-pattern.md`, `.claude/rules/nextjs-patterns.md`, `.claude/rules/i18n.md`
- Existing: `src/modules/students/{queries,components,hooks}/*` (StudentListPage, StudentTable, StudentProfile, use-students.query, use-student.query)

## Work
- **Queries**: ensure `use-students.query.ts` / `use-student.query.ts` populate `photo` + `voiceIntro` (Contract §B) and use query keys `['parent','students',params]` / `['parent','student',documentId]` (or reuse existing keys consistently — pick one and apply across parent UI).
- **List page**: `src/app/[locale]/parent/(protected)/students/page.tsx` → reuse/adapt `StudentListPage` (search, pagination); each row links to the profile; header has "Add student" → `/students/new`.
- **Profile page**: `src/app/[locale]/parent/(protected)/students/[documentId]/page.tsx` → `StudentProfile` showing fields, photo, and `AudioPreview` for `voiceIntro`; link to applications/results filtered to that student.
- Loading/empty/error states. No client `fetch`.
- i18n: `ParentStudents` `en` keys; flag for Task 15.

## Sub-agent breakdown (4)
1. **Query agent** — populate photo+voiceIntro, consistent parent query keys.
2. **List page agent** — route + list (reuse `StudentListPage`/`StudentTable`), Add CTA, row links.
3. **Profile page agent** — route + profile incl. photo + `AudioPreview`, cross-links.
4. **States + QA agent** — loading/empty/error; `tsc`/`lint`; verify voice plays and non-owned id → not-found handling.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- List shows the parent's students with search/pagination; profile shows details, photo, and a working audio player.
- Routes live under `parent/(protected)/students`. No client `fetch`; auth-gated queries; no hardcoded copy.
