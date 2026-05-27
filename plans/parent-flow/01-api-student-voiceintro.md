# Task 01 — `Student.voiceIntro` audio field (+ migration)

**Repo:** `schoolgo-api` · **Depends on:** — · **Contract:** §A, §B

## Objective
Add a single audio media field `voiceIntro` to the `Student` content-type so parents can attach a voice introduction. Keep existing `photo`. Ensure it is readable/writable through the existing student endpoints and returned (populated) in parent responses.

## Read first (binding)
- `schoolgo-api/CLAUDE.md`
- `.claude/rules/scaffolding.md` (content-types, media fields), `.claude/docs/15-models.md`, `.claude/docs/12-migrations.md`
- `.claude/rules/controllers.md` (populate/sanitize)

## Files to touch
- `src/api/student/content-types/student/schema.json` — add:
  ```json
  "voiceIntro": { "type": "media", "multiple": false, "allowedTypes": ["audios"] }
  ```
  (**⚠ VERIFY** the correct Strapi allowedTypes token for audio is `audios`.)
- `database/migrations/2026.05.26T<time>.add-student-voiceintro.ts` — reversible knex migration creating the media relation join (mirror how `photo` is stored; Strapi media uses the polymorphic `files_related_morphs` table, so the migration may be a **no-op data migration**/comment — confirm in `docs/12-migrations.md` whether a schema migration is even needed for a new media field; if Strapi manages it via content-type sync, document that and provide an empty reversible migration only if required).
- `src/api/student/controllers/student.ts` — ensure list/detail populate includes `voiceIntro` with `fields: ['url','mime']`; ensure create/update accept `voiceIntro` (whitelist) and sanitize output. Do **not** break existing `photo` populate or parent/agent scoping.

## Sub-agent breakdown (3)
1. **Schema agent** — edit `schema.json`, run `pnpm strapi ts:generate-types`, confirm types regenerate; verify allowedTypes token.
2. **Controller agent** — update populate shapes + create/update field whitelist + sanitize, without altering ownership logic.
3. **Migration agent** — author reversible migration per `docs/12-migrations.md`; if no DDL is needed for media, document why and provide a safe `up()/down()` stub.

## Acceptance / DoD
- `pnpm tsc --noEmit` passes; `pnpm strapi content-types:list` shows `voiceIntro`.
- `pnpm strapi routes:list` unchanged (no new routes).
- Creating a student with `voiceIntro: <id>` persists; `GET /students/:documentId` returns `voiceIntro: { url, mime }`.
- No `entityService`, no `populate:'*'`, `down()` present, existing `photo` behavior intact.
