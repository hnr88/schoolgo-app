# Task 03 — Parent-scoped students list/detail (verify + harden)

**Repo:** `schoolgo-api` · **Depends on:** 01 · **Contract:** §B

## Objective
Guarantee a parent can list and read **only their own** students, that create auto-assigns `parent` + `status:"active"`, and that `photo` + `voiceIntro` are populated. This is mostly verification + hardening of the existing `student` controller — change only what's required.

## Read first (binding)
- `schoolgo-api/CLAUDE.md`
- `.claude/rules/controllers.md` + `.claude/docs/02-controllers.md`
- `.claude/rules/document-service.md` + `.claude/docs/01-document-service.md`
- `.claude/rules/policies.md` (if a parent policy is cleaner than inline checks)

## Investigate then act
- Read `src/api/student/controllers/student.ts` fully. Determine how actor scope (parent vs agent) is resolved today (the `X-User-Type` header + `ctx.state.user`).
- **List (`find`)**: ensure parents are filtered to `filters[parent] = ctx.state.user.id`. Never allow a parent to pass their own arbitrary `filters[parent]`.
- **Detail (`findOne`)**: ensure `404`/`403` when the student isn't owned by the caller.
- **Create**: ensure `parent` is set from `ctx.state.user` and `status:"active"`; ignore client `parent`/`agent`/`status`.
- **Populate**: list + detail include `photo` and `voiceIntro` (`fields:['url','mime']`).
- Keep agent behavior **unchanged**.

## Sub-agent breakdown (3)
1. **Audit agent** — map current scope logic; produce a short note of exactly what's missing vs Contract §B; identify the minimal diff.
2. **Implementation agent** — apply the minimal scope/populate hardening to `find`/`findOne`/`create`.
3. **Verification agent** — `pnpm tsc --noEmit`; reason through the ownership cases (own student, other parent's student, agent path) and document expected status codes.

## Acceptance / DoD
- A parent listing students sees only their own; detail of a non-owned student → `404`.
- Create assigns `parent` + `status:"active"`; `photo`/`voiceIntro` populate on read.
- Agent flow untouched. No `entityService`, no `populate:'*'`, sanitize/transform intact.
