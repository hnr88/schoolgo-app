# Task 05 — Parent-scoped English test results

**Repo:** `schoolgo-api` · **Depends on:** — · **Contract:** §D

## Objective
Allow a parent to list English test results for **their own** students only. Confirm the content-type's real fields, then enforce ownership on the list endpoint.

## Read first (binding)
- `schoolgo-api/CLAUDE.md`
- `.claude/rules/controllers.md`, `.claude/rules/policies.md`, `.claude/rules/document-service.md`

## Investigate then act
- **⚠ Confirm the content-type UID and schema** at `src/api/english-test-result/content-types/.../schema.json` (the exploration referenced `api::english-test-result.english-test-result`). Record the real field names (testType enum, score fields, testDate, verificationStatus, `student` relation) and update Contract §D if they differ — flag the diff in your completion note.
- Implement parent ownership on `find`: when `X-User-Type: parent`, force `filters[student][parent] = ctx.state.user.id` AND honor the required `filters[student][documentId][$eq]` from the client. A request for a non-owned student must return an **empty list** (do not leak existence).
- **Detail** (if used): `404` when not owned.
- Populate `student` (`firstName,lastName,documentId`).

## Sub-agent breakdown (3)
1. **Schema-confirm agent** — read the real schema, list exact fields/enums, reconcile with Contract §D, report diffs.
2. **Implementation agent** — add parent ownership filter to `find` (+ `findOne` if present), merge with client `student.documentId` filter.
3. **Verification agent** — `pnpm tsc --noEmit`; reason through owned vs non-owned cases.

## Acceptance / DoD
- Parent sees only their own students' results; non-owned student query → empty list.
- Contract §D updated to match real fields (note any changes).
- No `entityService`/`populate:'*'`; sanitize/transform intact.
