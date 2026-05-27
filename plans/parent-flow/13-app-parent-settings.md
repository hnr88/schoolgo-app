# Task 13 — Parent settings page

**Repo:** `schoolgo-app` · **Depends on:** 02 · **Contract:** §C

## Objective
A parent settings page with: **Profile** (firstName, lastName, phone), **Password change**, and **Preferences** (language + notification toggles). Wired to Task 02's endpoints.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/state-data.md`, `.claude/rules/module-pattern.md`, `.claude/rules/i18n.md`, `.claude/rules/imports.md`
- Existing: `src/modules/auth/stores/use-auth-store.ts` (must store the new `jwt` after password change + refresh `user`), `src/lib/axios/private.ts`
- Form conventions: `create-form` skill (RHF + zod + shadcn Form)

## Work
- **Module**: `src/modules/parent-settings/` (mirror module split):
  - `queries/use-me.query.ts` (`GET /api/users/me`, key `['parent','me']`), `queries/use-update-profile.mutation.ts` (`PUT /api/users/me`), `queries/use-change-password.mutation.ts` (`POST /api/auth/change-password` → store new `jwt` in auth store + toast).
  - `schemas/profile.schema.ts`, `schemas/password.schema.ts` (zod; password confirm match), `schemas/preferences.schema.ts`.
  - `components/ProfileForm.tsx`, `components/PasswordForm.tsx`, `components/PreferencesForm.tsx` (language select from the 6 locales + notification switches).
  - `types/`, `index.ts`.
- **Route**: `src/app/[locale]/parent/(protected)/settings/page.tsx` — tabbed (use `create-tabs` conventions / Radix tabs) sections: Profile / Password / Preferences.
- After profile/preferences save, invalidate `['parent','me']`; reflect language change appropriately (next-intl) — at minimum persist preference; locale switching wiring optional but note it.
- Toasts on success/error via `sonner`.
- i18n: `ParentSettings` `en` keys; flag for Task 15.

## Sub-agent breakdown (4)
1. **Queries agent** — me query + update-profile + change-password mutations (incl. jwt update in store).
2. **Schemas + forms agent** — three zod schemas + three RHF forms (shadcn Form).
3. **Page + tabs agent** — settings route with tabbed sections; invalidation wiring.
4. **QA agent** — `tsc`/`lint`; verify profile update persists, password change updates the stored jwt without logging the user out, preferences save.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Profile edits persist via `PUT /users/me`; password change succeeds and the new `jwt` is stored (session stays valid); preferences (language + notifications) save.
- No client `fetch`; RHF + zod; no hardcoded copy; module follows conventions.
