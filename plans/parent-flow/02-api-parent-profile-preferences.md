# Task 02 — Parent profile self-update + `preferences` field

**Repo:** `schoolgo-api` · **Depends on:** — · **Contract:** §C

## Objective
Let an authenticated parent (1) read their profile incl. custom fields, (2) update `firstName`/`lastName`/`phone`/`preferences` via a safe self-update endpoint, and (3) change password (built-in). Add a `preferences` JSON field to the user.

## Read first (binding)
- `schoolgo-api/CLAUDE.md`
- `.claude/rules/plugins.md` + `.claude/docs/09-plugins.md` (users-permissions extension, custom routes/controllers in the plugin)
- `.claude/rules/routes.md`, `.claude/rules/controllers.md`, `.claude/docs/12-migrations.md`

## Files to touch
- `src/extensions/users-permissions/content-types/user/schema.json` — add:
  ```json
  "preferences": { "type": "json" }
  ```
- `database/migrations/2026.05.26T<time>.add-user-preferences.ts` — reversible migration adding nullable `preferences` JSON column to the users table (**⚠ VERIFY** table name, typically `up_users`).
- `src/extensions/users-permissions/strapi-server.ts` (or a `01-custom-user.ts` route registered via the extension) — add **`PUT /api/users/me`**:
  - Resolve user from `ctx.state.user` only; ignore any body id.
  - Whitelist exactly `firstName`, `lastName`, `phone`, `preferences`. Reject others.
  - Update via `strapi.documents('plugin::users-permissions.user')` and return the sanitized user (unwrapped, matching `/users/me` shape).
- Confirm `GET /users/me` returns `userType, firstName, lastName, phone, preferences` (adjust the `me` controller/field selection only if they are missing — **⚠ VERIFY** first; do not change unrelated behavior).

## Sub-agent breakdown (3)
1. **Schema + migration agent** — add `preferences`, write reversible migration, regenerate types.
2. **Route + controller agent** — implement `PUT /api/users/me` with strict field whitelist, ownership = self, sanitization, `@strapi/utils` errors.
3. **`/me` verification agent** — confirm custom fields are returned; document the exact response; adjust field selection only if needed.

## Acceptance / DoD
- `pnpm tsc --noEmit` passes; `pnpm strapi routes:list` shows `PUT /users/me`.
- `PUT /users/me` updates only whitelisted fields for the caller; attempts to set `email`/`role`/`userType`/`password` are ignored/rejected.
- `GET /users/me` returns `preferences` and name/phone.
- `POST /auth/change-password` confirmed working (built-in) and documented for the FE (returns new `jwt`).
- Reversible migration; no `entityService`; no `populate:'*'`.
