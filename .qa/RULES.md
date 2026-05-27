# Project Rules (binding — higher priority than agent defaults)

## Frontend `schoolgo-app` (Next.js 16) — from CLAUDE.md + .claude/rules
- pnpm only; TypeScript only (no .js/.jsx); App Router only.
- Server Components by default; `'use client'` only for state/effects/handlers/browser APIs.
- **Never `fetch` from client** — use typed Axios in `src/lib/axios/` (`privateApi` for auth'd).
- **Never edit `src/components/ui/*`** — EXCEPT explicit Law #11 waiver THIS run for control sizing (input/select/textarea/button/form/table size classes only; minimal).
- All custom code in `src/modules/[name]/`; `@/` imports; cross-module via barrel `index.ts`.
- next-intl `t()` for all user-facing strings (locales: en, vi, ko, zh, th, ms). No hardcoded strings.
- Forms: react-hook-form + Zod. Server state: TanStack Query v5 (`queries/`). Client state: Zustand. Toasts: sonner. Icons: lucide/heroicons.
- File ≤200 lines, components ≤120. No `any` (use `unknown`+narrow). No unsolicited comments.
- Next 16: `cookies()/headers()/params/searchParams` are async (await). `<Link>` from next-intl. `revalidateTag('tag','max')`.
- Mutations must revalidate (no stale UI). Parallel route slots need `default.tsx`.

## Backend `schoolgo-api` (Strapi v5.43) — from CLAUDE.md + .claude/rules
- pnpm only; TypeScript only (no .js/require/module.exports).
- **Document Service API only** (`strapi.documents()`), NEVER `entityService`. `documentId` (24-char), never numeric `id` in routes/queries/responses.
- Factory controllers/services/routes. Custom route files prefixed `NN-custom-*.ts` (load before core router).
- ALWAYS sanitize: `sanitizeQuery`, `sanitizeOutput`, `transformResponse` in overrides. Never `populate: '*'` (explicit shapes with `fields`).
- Use Document Service Middleware in `src/index.ts` for new cross-cutting logic, NOT lifecycle hooks. Always `return next()`.
- Routes: never `auth: true`; use `false` or `{ scope: [...] }`, or omit for default-auth.
- `@strapi/utils` errors (ApplicationError, etc.).

## QA-run operational notes (this run)
- Servers MAY run (user-authorized override of FE Rule 12 / BE Rule 9) for this QA run only.
- Backend `:1337` runs `strapi start` (compiled, no watch) → **code changes need a restart** (kill pid, watchdog revives + recompiles). Data/permission changes are live.
- Verify backend: `pnpm tsc --noEmit` + `pnpm strapi ts:generate-types`. Parent requests need `Authorization: Bearer <jwt>` + `X-User-Type: parent`. curl `[]` params need `-g`.
