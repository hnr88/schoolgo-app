# Task 04 — Parent-scoped applications list/detail

**Repo:** `schoolgo-api` · **Depends on:** — · **Contract:** §E

## Objective
Ensure a parent can list/read applications for **their own** students only (`student.parent === ctx.state.user`), with `student` + `school` populated. Verify and extend the existing `application` controller scoping; keep agent/school scoping intact.

## Read first (binding)
- `schoolgo-api/CLAUDE.md`
- `.claude/rules/controllers.md`, `.claude/rules/document-service.md`
- `.claude/docs/02-controllers.md`, `docs/01-document-service.md`

## Investigate then act
- Read `src/api/application/controllers/application.ts` and `routes/` fully. Identify how the actor scope is applied today.
- **List (`find`)**: when `X-User-Type: parent`, constrain to `filters[student][parent] = ctx.state.user.id`. Support optional `filters[status][$eq]` and `filters[student][documentId][$eq]` from the client without breaking the ownership constraint (AND them).
- **Detail (`findOne`)**: `404` if the application's student isn't owned by the caller.
- **Populate**: `student` (`firstName,lastName,documentId`), `school` (`name,documentId`), plus offer fields per Contract §E.
- Do not change agent/school behavior.

## Sub-agent breakdown (3)
1. **Audit agent** — document current scope + the minimal change for parent scope.
2. **Implementation agent** — add parent ownership filter to `find`/`findOne`, merge with client filters safely.
3. **Verification agent** — `pnpm tsc --noEmit`; reason through ownership/status-filter combinations.

## Acceptance / DoD
- Parent sees only their students' applications; non-owned detail → `404`.
- Optional `status` / `student.documentId` filters work without bypassing ownership.
- `student` + `school` populated per contract. Agent/school flows untouched. No `entityService`/`populate:'*'`.
