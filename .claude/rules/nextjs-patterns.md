---
paths:
  - "src/app/**"
  - "src/modules/**/actions/**"
  - "src/modules/**/components/**"
---

## Server Components (default)

Default for every file in `src/app/`. Ship zero JS to the client.
1. CAN be `async` and `await` data directly.
2. CANNOT use `useState`, `useEffect`, `useRef`, browser APIs, event handlers.
3. CANNOT import Zustand stores or client-only modules.
4. Use `getTranslations` from `next-intl/server` for i18n.

## Client Components

Add `'use client'` ONLY when needed: state hooks, effects, event handlers, browser APIs, Zustand, TanStack Query, client-only libs.
1. `'use client'` MUST be the very first line. No exceptions.
2. Push it as far down the tree as possible. Wrap leaves, not pages.
3. Server Component CAN render Client Component with serializable props.
4. Client Component CANNOT import Server Component — receive as `children`.
5. Never add `'use client'` "just in case".
6. Use `useTranslations` from `next-intl` for i18n.

## Server Actions

Async functions marked `'use server'` in `src/modules/[name]/actions/x.action.ts`.
1. Validate ALL input with Zod on the server. Never trust the client.
2. Return serializable values only.
3. Call `revalidateTag`/`revalidatePath` after mutations.
4. Pair with `useActionState` (React 19) for pending/error UI.
5. NOT a security boundary — re-check auth inside EVERY action.

## Route Handlers

Use `route.ts` ONLY for public HTTP endpoints (webhooks, OAuth, file uploads). Prefer Server Actions for own-UI mutations.

## Streaming & PPR

1. Wrap slow fetches in `<Suspense fallback={<Skeleton />}>`.
2. Parallelize with `Promise.all` or multiple `<Suspense>` side by side.
3. PPR: `experimental.ppr = 'incremental'` in next.config.ts + `export const experimental_ppr = true` on the route.

## Parallel & Intercepting Routes

1. Parallel routes: `@slot` folders for simultaneous page rendering.
2. Intercepting routes: `(.)folder`, `(..)folder`, `(...)folder`.
3. Use ONLY when they genuinely simplify UX. Never speculatively.

## Error/Loading Boundaries

1. `loading.tsx` — lightweight skeletons, NOT spinners.
2. `error.tsx` — MUST be `'use client'`, MUST include `reset()` button.
3. `not-found.tsx` — triggered by `notFound()`.
4. `global-error.tsx` — root-level only.

## Caching (Next.js 16) — Explicit, Opt-In

NOTHING is cached unless you opt in.
1. `'use cache'` directive to opt into data cache.
2. `cacheLife('seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'max')` for TTL.
3. `cacheTag('name')` for on-demand invalidation via `revalidateTag`.
4. React `cache()` for request-level deduplication.
5. Never cache user-specific data unless tagged per-user.
6. Always tag cached data. `cacheLife('max')` ONLY for immutable data.

## proxy.ts (Middleware)

1. File MUST be named `proxy.ts` (Next 16).
2. Never use as sole auth boundary. Re-check in actions/handlers.
3. Keep logic minimal — runs on EVERY matched request.

## Turbopack

1. Default for `next dev` and `next build`. No flags needed.
2. Never add Webpack-specific config to `next.config.ts`.
