# Public-only MVP — descoped, ship-fast

**Goal:** Ship a public marketing site + blog + a genuinely useful public search. No login, no register, no reachable dashboards. **Deactivate, never delete** — the app + auth stay parked in-tree and come back later by flipping one switch.

Branch: `deliverable/public-mvp` (off `staging`).

## Deactivation switch
A single constant `PUBLIC_ONLY` (e.g. `src/lib/deliverable-config.ts`), read in 4 places. Reactivation later = set it `false` + revert nav.

## Phase A — Deactivate app + login (no deletes)
- `src/proxy.ts`: when `PUBLIC_ONLY`, redirect deactivated paths → landing. Deactivated = every portal `(protected)` route (`/{portal}/dashboard*`, `/parent/{applications,compare,search,...}`, etc.) + `/{portal}/{sign-in,sign-up,forgot-password,reset-password,onboarding}`. **Per-route allowlist** keeps public `/{portal}`, `/{portal}/schools/[slug]`, `/{portal}/agents/[slug]`, `/{agent,school}/search` reachable. Add an `isDeactivatedPath` helper in `request-proxy`.
- `AuthRedirectCheck`: short-circuit to a no-op when `PUBLIC_ONLY` (one edit) → prevents stale-session redirect loop; landings stay untouched.
- Marketing nav: `MarketingDesktopActions`, `MarketingMobileFooter`, `footer.constants.ts` — hide "Log in" + "Create account", add **Blog** (+ surface **Search**).
- `sitemap.ts` / `robots`: emit public routes only (+ blog); noindex deactivated paths.

## Phase B — Blog MVP (TS-authored, reuse content-pages/guides scaffold)
- New `blog` module: post registry + types (title, slug, excerpt, hero, body, author, date, category).
- Routes: `/blog` (index) + `/blog/[slug]` (Article JSON-LD). 3–4 real seed posts.
- Register in nav + `sitemap.ts`; canonical/hreflang; English-only under locale prefix.
- **Deferred:** category hubs, tags, pagination polish.

## Phase C — Public search "super useful" (MVP)
- Lift the teaser: public capability → `resultCap: null`, advanced filters/sorts ON, drop `forceVerifiedOnly`; relax server-side `stripPublicAdvancedFields`/`applyPublicTeaser` in `/api/search/*`.
- Remove `SearchTeaserOverlay` + "sign in" CTAs. Pass explicit public capability everywhere (no auth-store fallback).
- Keep both schools + agents modes; map + autocomplete already public.
- **Deferred (fast-follow):** localStorage shortlist/saved-search; public `/compare` route + `CompareBar` repoint.

## Phase D — Verify
`pnpm tsc --noEmit && pnpm lint` (must stay green — nothing deleted) · i18n-sync new strings · QA: landing/content/blog/search work; every app/login URL redirects to landing.

## Reactivation (later)
Set `PUBLIC_ONLY=false`, restore nav links (Log in / Create account), re-add app routes to sitemap. The parked app is unchanged.
