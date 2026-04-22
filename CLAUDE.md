# CLAUDE.md — Next.js 16 Strict Ruleset

Single source of truth. Read at session start. Obey unconditionally.

---

## 0. ABSOLUTE LAWS — BREAK ONE, YOU FAIL

1. **DO EXACTLY WHAT IS ASKED.** Zero extras. Zero refactors. Zero nice-to-haves. A means A, never A+B.
2. **THINK 3×, WRITE 1×.** Triple-check every line. Mistakes are unacceptable.
3. **NEVER BREAK EXISTING LOGIC.** Read surrounding code BEFORE editing. Preserve all behavior.
4. **NEVER TOUCH ANYTHING NOT EXPLICITLY REQUESTED.** No drive-by edits. No cleanup. No "while I'm here" changes.
5. **WHEN IN DOUBT, ASK.** Never guess. Never assume. Clarify or stop.
6. **pnpm ONLY.** npm/yarn/bun = instant failure. Lockfile: `pnpm-lock.yaml`.
7. **TypeScript ONLY** for new files. No `.js`/`.jsx`. Ever.
8. **Server Components by default.** `'use client'` ONLY for state, effects, browser APIs, event handlers.
9. **NEVER `fetch` from client components.** Use typed Axios instances from `src/lib/axios/`.
10. **App Router ONLY.** No `pages/` directory. No `getServerSideProps`/`getStaticProps`/`getInitialProps`. Forbidden.
11. **NEVER edit `src/components/ui/*`.** Wrap shadcn primitives in modules. Never modify originals.
12. **NEVER run dev/build/start.** Tell the user. You may run: `pnpm tsc --noEmit`, `pnpm lint`.
13. **NEVER commit secrets.** No keys, no tokens, no `.env` contents in code.
14. **NEVER use `any`.** Use `unknown` and narrow. Only exception: escaping third-party type bugs with explicit justification.
15. **NEVER add unsolicited comments, docs, or explanations in code.** Code speaks for itself.

---

## 1. Stack — MANDATORY, NON-NEGOTIABLE

| Layer | REQUIRED | BANNED |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, Turbopack) | Pages Router, any pre-16 patterns |
| Language | **TypeScript 5.6+** strict mode | JavaScript, loose mode |
| Styling | **Tailwind CSS v4** (CSS-first, `@theme`, OKLCH) | CSS Modules, styled-components, Emotion, vanilla-extract |
| UI primitives | **shadcn/ui** (Radix-based, copy-in-repo) | Custom primitives that duplicate shadcn |
| i18n | **next-intl** (locale-prefixed `[locale]` routes) | react-i18next, LinguiJS, Format.JS |
| Client state | **Zustand** | Redux, MobX, Jotai, Recoil, Valtio, Context-as-store |
| Server state | **TanStack Query v5** | SWR, apollo-client for REST |
| HTTP | **Axios** (typed instances in `src/lib/axios/`) | Raw `fetch` from client, raw `axios` in components |
| Forms | **react-hook-form + Zod + `@hookform/resolvers/zod`** | Formik, Final Form, Yup, Joi, valibot |
| Toasts | **sonner** | react-toastify, react-hot-toast, notistack |
| Icons | **lucide-react** or **@heroicons/react** | react-icons, Font Awesome, Material Icons |
| Carousels | **Splide.js** (`@splidejs/react-splide`) | Swiper, Embla, Keen Slider |
| Testing | **Vitest + Testing Library** (unit), **Playwright** (E2E) | Jest, Enzyme, Cypress, Selenium |
| Package mgr | **pnpm** | npm, yarn, bun |

### Extended Approved Stack

| Need | USE | BANNED |
|---|---|---|
| Date/time | **date-fns** or **Day.js** | Moment.js, Luxon |
| Tables | **@tanstack/react-table** + shadcn `Table` | MUI DataGrid, AG Grid |
| Charts | **Recharts** or **Tremor** | Chart.js, Victory, Nivo, ApexCharts |
| Animation | **Framer Motion** (`motion/react`) | react-spring, GSAP, anime.js |
| Drag & drop | **dnd-kit** | react-dnd, react-beautiful-dnd |
| Virtualization | **@tanstack/react-virtual** | react-window, react-virtualized |
| Rich text | **Tiptap** | Draft.js, Quill, Slate, CKEditor, TinyMCE |
| Markdown | **react-markdown** + `remark-gfm` | marked + dangerouslySetInnerHTML |
| Code highlight | **Shiki** | Prism, highlight.js |
| File upload | **react-dropzone** | filepond, uppy |
| Image crop | **react-image-crop** | cropperjs wrappers |
| PDF | **react-pdf** | pdf.js raw, iframe hacks |
| Maps | **react-leaflet** or **@vis.gl/react-google-maps** | react-google-maps/api |
| Class merge | **clsx + tailwind-merge** via `cn()` | classnames, custom concat |
| IDs | **nanoid** | uuid (unless RFC 4122 required) |
| Env validation | **@t3-oss/env-nextjs** + Zod | raw `process.env` scattered |
| Email | **Resend** + **react-email** | Nodemailer raw templates |
| Auth | **Auth.js v5 / NextAuth** OR custom Axios | Clerk SDK |
| Payments | **Stripe** + `@stripe/react-stripe-js` | wrappers/forks |
| Analytics | **PostHog** or **Vercel Analytics** | GA raw `<script>` |
| WebSockets | native `WebSocket` or `socket.io-client` | sockjs, pusher-js |
| Search | **Fuse.js** or **Algolia** | Lunr.js, custom regex |
| Phone input | **react-phone-number-input** + libphonenumber-js | regex masks |
| Color picker | **react-colorful** | react-color |
| QR codes | **qrcode.react** | qr.js |
| Clipboard | native `navigator.clipboard` | react-copy-to-clipboard |
| Number/currency | native `Intl.NumberFormat` | numeral.js, accounting.js |
| Variants | **cva** (class-variance-authority) | prop-to-class switch statements |
| OTP | shadcn `InputOTP` | react-otp-input |

### Adding a New Library

1. Must be the most popular, actively maintained option (downloads, stars, recency).
2. Reject anything unmaintained (>1 year no release) or <50k weekly downloads unless niche.
3. **CONFIRM WITH USER** before adding. No exceptions.
4. Install with `pnpm add` (or `pnpm add -D`).
5. NEVER introduce obscure or trendy-but-unproven packages.

---

## 2. Folder Layout — CANONICAL, DO NOT DEVIATE

- `public/` — static assets (`favicon.ico`, `images/`)
- `src/app/` — App Router ONLY
  - `[locale]/` — locale-prefixed routes: `layout.tsx`, `page.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `(group)/`
  - `api/` — route handlers (`[name]/route.ts`), only when needed
  - `globals.css` — Tailwind v4 entry, `@theme`, design tokens
  - `layout.tsx` — root layout (html, body, NO providers)
  - `opengraph-image.tsx`, `icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`
- `src/modules/` — **ALL custom code lives here.** Zero exceptions.
  - `[module-name]/` — `components/`, `hooks/`, `stores/`, `queries/`, `actions/`, `schemas/`, `lib/`, `types/`, `constants/`, `index.ts`
- `src/components/ui/` — shadcn primitives. **READ ONLY. DO NOT EDIT.**
- `src/lib/` — `axios/` (public.ts, private.ts, index.ts), `utils.ts` (cn()), `env.ts` (@t3-oss)
- `src/i18n/` — `messages/` (en.json, [locale].json), `request.ts`, `routing.ts`
- `src/proxy.ts` — Next 16 middleware (renamed from middleware.ts)
- `tests/` — `unit/`, `e2e/`
- Root: `.env.local` (gitignored), `.env.example`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `pnpm-lock.yaml`, `package.json`

---

## 3. Module Pattern — MANDATORY, ZERO TOLERANCE

ALL custom components, hooks, stores, queries, actions, schemas, types, and utilities MUST live inside `src/modules/[module-name]/`. Code outside modules is a structural violation.

### Module Structure Enforcement
1. Modules are **self-contained** — they own their own everything.
2. Cross-module imports MUST go through the barrel `index.ts`. NEVER reach into another module's internals.
3. `index.ts` exports ONLY the public surface. Internal helpers stay private.
4. NEVER import from a module and skip the barrel.
5. Shared code goes in `src/lib/` or a dedicated shared module.

### File Placement — ABSOLUTE RULES
6. **Types and interfaces → `types/` folder ONLY.** NEVER define a `type` or `interface` in a component file, hook file, or anywhere else. ALL types live in `src/modules/[name]/types/x.types.ts`. The ONLY exception: inline props type for a component that is used nowhere else (e.g. `function Card({ title }: { title: string })`). If any type is used in more than one file, it MUST be in `types/`.
7. **Zod schemas → `schemas/` folder ONLY.** NEVER define a Zod schema inside a component, hook, or action file. Extract to `src/modules/[name]/schemas/x.schema.ts`. Inferred types from schemas (`z.infer<>`) MUST be re-exported from `types/`.
8. **Constants → `constants/` folder ONLY.** NEVER scatter `const` config objects, magic strings, or enum-like values across component or hook files. Centralize in `src/modules/[name]/constants/x.constants.ts`.
9. **Hooks → `hooks/` folder ONLY.** NEVER define a custom hook inside a component file. Even if the hook is small, extract it to `src/modules/[name]/hooks/useX.ts`.
10. **Server Actions → `actions/` folder ONLY.** NEVER put `'use server'` functions inside component files or page files. Extract to `src/modules/[name]/actions/x.action.ts`.
11. **Queries/Mutations → `queries/` folder ONLY.** NEVER define `useQuery`/`useMutation` calls inline in components. Extract to `src/modules/[name]/queries/`.
12. **Stores → `stores/` folder ONLY.** NEVER define a Zustand store outside its designated file in `src/modules/[name]/stores/`.

### What Goes Where — NO EXCEPTIONS

| Code type | MUST live in | NEVER in |
|---|---|---|
| `type`, `interface` | `types/x.types.ts` | components, hooks, lib, actions, queries |
| Zod `z.object(...)` | `schemas/x.schema.ts` | components, hooks, actions |
| `useQuery`/`useMutation` | `queries/use-x.query.ts` | components |
| `useX` custom hooks | `hooks/useX.ts` | components |
| `'use server'` functions | `actions/x.action.ts` | components, pages |
| `create<Store>()` | `stores/use-x-store.ts` | components, hooks |
| Constants, config objects | `constants/x.constants.ts` | components, hooks |
| Pure utility functions | `lib/x.ts` | components, hooks |

---

## 3.1. Code Quality — COMPONENTS ARE DUMB, LOGIC LIVES ELSEWHERE

Components render UI. That is their ONLY job. All logic, data transformation, business rules, and side effects MUST be extracted.

### Components — WHAT THEY CAN DO
1. Return JSX.
2. Call hooks (custom hooks, not raw logic).
3. Handle simple UI state (`isOpen`, `activeTab`) — but even these should be in a hook if reused.
4. Destructure props and pass them down.
5. Map over data to render lists.

### Components — WHAT THEY CANNOT DO
1. **NEVER contain business logic.** No calculations, no data transformations, no conditional logic beyond simple ternaries for rendering. Extract to `hooks/` or `lib/`.
2. **NEVER contain API calls.** No `useQuery`, `useMutation`, `fetch`, or `axios` directly in a component. Wrap in a custom hook in `queries/` or `hooks/`.
3. **NEVER contain form validation logic.** Zod schemas live in `schemas/`. `useForm` setup goes in a custom hook if the form is complex.
4. **NEVER contain data formatting/transformation.** Formatting dates, currencies, filtering arrays, sorting — ALL goes in `lib/` utility functions.
5. **NEVER contain more than 3 `useState` calls.** If you need more, extract into a custom hook.
6. **NEVER contain `useEffect` with complex logic.** Extract the effect logic into a custom hook.
7. **NEVER define helper functions inside components** that could live in `lib/`. If a function doesn't use hooks or component state, it belongs in `lib/`.

### Where Logic MUST Live

| Logic type | MUST go in | NEVER in components |
|---|---|---|
| API calls, data fetching | `queries/` hooks | Direct `useQuery`/`useMutation` in JSX files |
| Data transformation, formatting | `lib/` pure functions | Inline in render or event handlers |
| Business rules, calculations | `lib/` pure functions or `hooks/` | Inline in components |
| Complex state management | `hooks/useX.ts` custom hooks | Multiple `useState` + `useEffect` in component |
| Form setup with validation | `hooks/useXForm.ts` or keep simple | Massive `useForm` config blocks in component |
| Side effects | `hooks/` custom hooks | Raw `useEffect` with 10+ lines |
| Event handler logic (>3 lines) | `hooks/` or `lib/` | Inline in component |

### The Rule of Thumb
If you remove the JSX `return` statement and there's more than 15 lines of logic left, the component has TOO MUCH logic. Extract it.

---

## 4. Server Components

Default for every file in `src/app/`. They run on the server only, ship zero JS to the client.

1. CAN be `async` and `await` data directly.
2. CANNOT use `useState`, `useEffect`, `useRef`, browser APIs, event handlers.
3. CANNOT import Zustand stores or client-only modules at the top level.
4. Use `getTranslations` from `next-intl/server` for i18n.

---

## 5. Client Components

Add `'use client'` ONLY when you absolutely need: state hooks, effects, event handlers, browser APIs, Zustand stores, TanStack Query hooks, or third-party libs that require them.

1. `'use client'` MUST be the very first line of the file. No exceptions.
2. Push it **as far down the tree as possible**. Wrap leaves, not pages.
3. A Server Component CAN render a Client Component with serializable props.
4. A Client Component CANNOT import a Server Component — receive it as `children`.
5. NEVER add `'use client'` "just in case". Every directive must be justified.
6. Use `useTranslations` from `next-intl` for i18n in client components.

---

## 6. Server Actions

Async functions marked `'use server'`, placed in `src/modules/[name]/actions/x.action.ts`.

1. MUST validate ALL input with Zod on the server. NEVER trust the client.
2. MUST return serializable values only (no functions, no class instances).
3. MUST call `revalidateTag`/`revalidatePath` after mutations.
4. Pair with `useActionState` (React 19) on the client for pending/error UI.
5. NOT a security boundary — re-check auth/ownership inside EVERY action.

---

## 7. Route Handlers

Use `route.ts` ONLY for public HTTP endpoints (webhooks, OAuth callbacks, file uploads). Prefer Server Actions for mutations from your own UI.

---

## 8. Streaming & PPR

1. Wrap slow data fetches in `<Suspense fallback={<Skeleton />}>`.
2. Parallelize with `Promise.all` or multiple `<Suspense>` boundaries side by side.
3. Partial Prerendering: enable `experimental.ppr = 'incremental'` in `next.config.ts`, add `export const experimental_ppr = true` to the route.

---

## 8.1. Parallel & Intercepting Routes

1. **Parallel routes:** `@slot` folders render multiple pages in one layout simultaneously (dashboards, independent panels).
2. **Intercepting routes:** `(.)folder`, `(..)folder`, `(...)folder` capture navigation from elsewhere (e.g. modal on feed click, full page on direct visit).
3. Use ONLY when they genuinely simplify UX. NEVER add speculatively.

---

## 9. Error/Loading Boundaries

1. `loading.tsx` — lightweight skeletons, NOT spinners.
2. `error.tsx` — MUST be `'use client'`, MUST include a `reset()` button.
3. `not-found.tsx` — triggered by `notFound()` from `next/navigation`.
4. `global-error.tsx` — root-level only at `app/global-error.tsx`.

---

## 10. Caching (Next.js 16) — Explicit, Opt-In

NOTHING is cached unless you explicitly opt in. Default is no-cache.

1. Use `'use cache'` directive at top of file/function to opt into the data cache.
2. Use `cacheLife('seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'max')` for TTL.
3. Use `cacheTag('name')` to enable on-demand invalidation via `revalidateTag`.
4. Use React `cache()` for request-level memoization (deduplication within a single render).
5. NEVER cache user-specific data unless tagged per-user.
6. ALWAYS tag cached data so you can invalidate it.
7. Use `cacheLife('max')` ONLY for truly immutable data.

---

## 11. next-intl

1. Routing config in `src/i18n/routing.ts` using `defineRouting`.
2. Request config in `src/i18n/request.ts` using `getRequestConfig`.
3. Translation files in `src/i18n/messages/` — one JSON per locale.
4. Server Components: use `getTranslations` from `next-intl/server`.
5. Client Components: use `useTranslations` from `next-intl`.
6. **NEVER hardcode user-facing strings.** Every string goes through `t()`.
7. Keys: PascalCase namespaces, camelCase keys (e.g. `Home.welcomeMessage`).
8. ALL locale files MUST have the same key shape. No missing keys.
9. Use ICU plurals: `{count, plural, one {# item} other {# items}}`.
10. Use `next-intl/navigation` for locale-aware `<Link>` and routing.

---

## 12. Tailwind CSS v4

CSS-first config. Theme defined in `globals.css` via `@theme`.

1. **OKLCH colors ONLY.** NEVER raw hex, HSL, `#000`, or `#fff`. Always tint.
2. **4pt spacing scale:** `p-1, p-2, p-3, p-4, p-6, p-8, p-12, p-16, p-24`.
3. **NEVER use arbitrary values.** No `p-[23px]`, no `w-[347px]`, no `text-[17px]`. Use ONLY built-in Tailwind utilities. If a built-in value doesn't exist, define a token in `@theme` — NEVER inline arbitrary values.
4. **NEVER use absurdly large spacing/padding.** No `px-80`, `py-96`, `mt-72`, or anything that screams hardcoded layout. Keep spacing proportional and reasonable. Max padding: `p-24` for page-level containers. Anything beyond that is a layout smell — use `max-w-*` and `mx-auto` instead.
5. **NEVER hardcode text sizes with arbitrary values.** Use built-in `text-xs` through `text-9xl` or define `--font-size-*` tokens in `@theme`. No `text-[15px]`, no `text-[1.125rem]`.
6. Use `gap-*` for sibling spacing. NEVER margin for gaps between siblings.
7. Use `clamp()` for fluid typography via `--font-size-*` tokens.
8. **BANNED fonts:** Inter, Roboto, Arial, Open Sans, Lato, Montserrat. Use: Instrument Sans, Plus Jakarta Sans, Outfit, Onest, Figtree, Urbanist, DM Sans.
9. Animate `transform` and `opacity` ONLY. NEVER animate width/height/padding/margin.
10. Exponential easings only: `ease-out-quart`, `ease-out-quint`, `ease-out-expo`. NO bounce/elastic.
11. **BANNED patterns:** glassmorphism, gradient text on headings, neon-on-dark.
12. **Use ONLY built-in Tailwind classes.** Every value must come from the default scale or your `@theme` tokens. If you're typing square brackets `[]`, you're doing it wrong.

---

## 13. shadcn/ui

1. ALWAYS check if shadcn has the component BEFORE creating anything custom.
2. WRAP shadcn components in module components. NEVER replace or duplicate them.
3. **NEVER edit files in `src/components/ui/`.**
4. Install new primitives: `pnpm dlx shadcn@latest add <component>`.
5. Available: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

---

## 14. Zustand

1. ONE store per concern (auth, cart, ui). NEVER a mega-store.
2. Stores in `src/modules/[name]/stores/use-[name]-store.ts`.
3. ALWAYS type the state interface explicitly.
4. ALWAYS use selectors: `useCartStore((s) => s.items)`. No full-store subscriptions.
5. Use `persist` middleware with `partialize` — persist ONLY what must survive reload.
6. NEVER import a store in a Server Component. Stores are client-only.

---

## 15. TanStack Query

1. Query keys: arrays starting with resource name — `['products']`, `['products', id]`.
2. ONE hook per query in `src/modules/[name]/queries/use-[name].query.ts`.
3. Mutations in `use-[name].mutation.ts` alongside queries.
4. ALWAYS invalidate or `setQueryData` after successful mutation.
5. NEVER call `fetch`/`axios` directly in components. Go through a query/mutation hook.
6. `QueryProvider` is a `'use client'` component wrapping `QueryClientProvider` with `useState` for the client instance.

---

## 16. Axios

1. ALL Axios instances live in `src/lib/axios/`. NEVER create instances elsewhere.
2. NEVER `import axios from 'axios'` in a component.
3. `publicApi` — unauthenticated requests.
4. `privateApi` — authenticated requests, auto-attaches token via interceptor, handles 401 logout.
5. The auth store holds `userType` (admin, customer, vendor) — interceptor injects the right token/header.

---

## 17. Forms

1. EVERY form: `useForm` + `zodResolver`. NEVER manual `useState` for form values.
2. EVERY form has a Zod schema in `src/modules/[name]/schemas/`.
3. ALWAYS use shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.
4. ALWAYS provide `defaultValues`.
5. The SAME Zod schema MUST validate in both the client form AND the Server Action.

---

## 18. Imports & Naming

### Imports
- **ALWAYS** `@/` aliased imports. NEVER `../../`.
- Relative imports allowed ONLY within the same module.
- Cross-module: barrel `index.ts` ONLY.
- Order: (1) React/Next/external → (2) next-intl → (3) `@/modules/*` → (4) `@/lib/*`, `@/components/*` → (5) relative.

### Naming — MANDATORY CONVENTIONS

| Kind | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | `useX` camelCase | `useUserData.ts` |
| Stores | `use-x-store` kebab | `use-cart-store.ts` |
| Queries | `use-x.query` | `use-products.query.ts` |
| Mutations | `use-x.mutation` | `use-create-product.mutation.ts` |
| Server Actions | `x.action` kebab | `create-product.action.ts` |
| Schemas | `x.schema` kebab | `product.schema.ts` |
| Types | `x.types` kebab | `product.types.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Utilities | kebab-case | `format-date.ts` |
| Booleans | `is/has/should` prefix | `isLoading`, `hasError` |
| Event handlers | `handle*` prefix | `handleSubmit` |
| i18n namespaces | PascalCase keys, camelCase values | `Home.welcomeMessage` |

### File Size LIMITS
- Files: **200 lines max.** Split if larger.
- Components: **120 lines max.** Extract subcomponents.

---

## 19. Performance — NON-NEGOTIABLE

1. Server Components by default — minimize client JS bundle.
2. `next/image` for ALL images. ALWAYS provide `width`/`height` or `fill`. Use `priority` for LCP images.
3. `next/font` for ALL fonts. Self-hosted, eliminates CLS.
4. Stream slow data with `<Suspense>`. Parallelize with `Promise.all`.
5. `"use cache"` for expensive pure computations and DB reads. Tag everything.
6. Code-split heavy below-fold Client Components with `next/dynamic`.
7. Fetch on the server. NEVER create client-side waterfalls.
8. Bundle analysis: use `@next/bundle-analyzer`. Keep client bundles lean.
9. Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
10. `useMemo`/`useCallback` ONLY when profiling proves a need. No cargo-culting.

---

## 20. SEO — EVERY PAGE

1. EVERY page exports `metadata` or `generateMetadata`.
2. `title` (max 60 chars) and `description` (max 160 chars) REQUIRED.
3. Public pages: `openGraph.images` (1200x630) and `twitter.card`.
4. Detail pages: `alternates.canonical`.
5. `app/sitemap.ts` and `app/robots.ts` at root.
6. `app/opengraph-image.tsx` for dynamic OG images via `ImageResponse`.
7. `app/icon.tsx` and `app/apple-icon.tsx` for favicons.
8. Semantic HTML: `<main>`, `<header>`, `<nav>`, `<article>`, `<section>`. ONE `<h1>` per page.
9. JSON-LD structured data via `<script type="application/ld+json">` when relevant.
10. Locale alternates via `alternates.languages` for hreflang.

---

## 21. Accessibility — MANDATORY

1. EVERY interactive element: keyboard reachable.
2. EVERY image: `alt` text (decorative = `alt=""`).
3. EVERY form input: associated `<Label>` via shadcn `FormLabel`.
4. Color contrast: WCAG AA minimum (4.5:1 body, 3:1 large text).
5. Semantic elements: `<button>` for actions, `<a>` for navigation. **NEVER `<div onClick>`.**
6. Focus rings: ALWAYS visible. NEVER `outline: none` without replacement.
7. `aria-*` ONLY when semantic HTML cannot express the meaning.
8. Test with keyboard: Tab, Shift+Tab, Enter, Escape, arrow keys.
9. Modals: trap focus, restore on close, ESC closes. Use modals ONLY when absolutely necessary — prefer inline disclosure.
10. Live regions for async updates: `role="status"` / `aria-live="polite"`.

---

## 22. Testing

1. Server Components: CANNOT render in JSDOM. Extract logic into pure functions or test via Playwright.
2. Client Components: render with RTL, simulate with `userEvent`, assert DOM.
3. Server Actions: import and call directly as async functions.
4. Co-locate: `Component.test.tsx` next to `Component.tsx` or in `__tests__/`.
5. EVERY new feature ships with at least ONE test.

---

## 23. Environment Variables

1. ALL env access goes through `@t3-oss/env-nextjs` in `src/lib/env.ts`. NEVER access `process.env` elsewhere.
2. Client vars MUST be prefixed `NEXT_PUBLIC_`.
3. `.env.example` committed with placeholders. `.env.local` gitignored.
4. NEVER commit real secrets.

---

## 24. proxy.ts (Middleware)

1. File MUST be named `proxy.ts` (Next 16). `middleware.ts` is deprecated.
2. Exported function: `proxy` (or `middleware` for back-compat).
3. NEVER use proxy as sole auth boundary. Re-check auth in Server Actions and Route Handlers.
4. Keep logic minimal — runs on EVERY matched request.

---

## 25. Turbopack

1. Turbopack is the default for both `next dev` and `next build`. No flags needed.
2. NEVER add Webpack-specific config to `next.config.ts`.
3. If a loader isn't supported, file a task. NEVER silently fall back to Webpack.

---

## 26. FATAL PITFALLS — MEMORIZE THESE

1. Importing Server Component into Client Component → pass as `children` instead.
2. `'use client'` not on first line → file breaks silently.
3. `cookies()`/`headers()`/`searchParams` called synchronously → they are `async` in Next 16. `await` them.
4. `useRouter` from `next/router` → WRONG. Use `next/navigation` or `next-intl/navigation`.
5. `next/head` → Pages Router. Use `metadata` export.
6. `getServerSideProps`/`getStaticProps` → Pages Router. FORBIDDEN.
7. Mutation without revalidation → stale UI. ALWAYS `revalidateTag`/`revalidatePath`.
8. `proxy.ts` as security boundary → it's NOT. Re-check auth in actions/handlers.
9. Functions as props from Server → Client → NOT serializable. Use Server Actions.
10. Reading Zustand/Context in Server Component → impossible. Don't try.
11. `fetch` without cache strategy in Server Components → no-cache by default in Next 16. Wrap in `'use cache'` if needed.
12. `useEffect` to fetch data → use TanStack Query or Server Component fetch.
13. Hardcoded strings → use `t()` from next-intl. ALWAYS.
14. Missing `key` props in lists → React 19 still requires them.
15. Pure `#000`/`#fff` → BANNED. Tint via OKLCH.
16. Animating layout properties → `transform`/`opacity` ONLY.
17. `<a>` for internal navigation → use `<Link>` from `next-intl/navigation`.
18. `window` at module top level → wrap in `useEffect` or `typeof window !== 'undefined'`.
19. Server code in client bundle → add `import 'server-only'` to server modules.
20. Client code in server bundle → add `import 'client-only'` to client modules.
21. Tokens in `localStorage` → use httpOnly cookies via the API.
22. Skipping server-side form validation → ALWAYS re-validate with the same Zod schema in the Server Action.
23. Cards inside cards → flatten the hierarchy. No nested cards.
24. Overusing `useMemo`/`useCallback` → ONLY when profiling proves a real problem.
25. Defining types/interfaces in component files → MOVE to `types/x.types.ts`. Components don't own types.
26. Defining Zod schemas in component files → MOVE to `schemas/x.schema.ts`. Components don't own validation.
27. Business logic in components → EXTRACT to `hooks/` or `lib/`. Components render UI, nothing more.
28. Raw `useQuery`/`useMutation` in components → EXTRACT to `queries/` hooks. Components don't fetch.
29. Helper functions in components → if it doesn't use hooks, it belongs in `lib/`. Move it.
30. 4+ `useState` calls in one component → EXTRACT to a custom hook. The component is doing too much.
31. Constants/config objects scattered in components → MOVE to `constants/`. Centralize them.

---

## 27. Command Restrictions

### NEVER RUN (tell user to run these)
- `pnpm dev`, `pnpm build`, `pnpm start`, any long-running server, any destructive git command

### ALLOWED TO RUN
- `pnpm tsc --noEmit`, `pnpm lint`, `pnpm test --run`, `pnpm exec playwright test --reporter=line`
- `git status`, `git log`, `git diff`
- File reads, greps, listings

---

## 28. Git

- NEVER revert commits.
- NEVER run destructive commands (`reset --hard`, `push --force`, `rebase`, `clean -fd`).
- NEVER amend commits you didn't author in this session.
- NEVER commit unless explicitly asked.
- Commit messages: clear, scoped, concise.

---

## 29. Execution Standard

- Execute ONLY what is requested.
- NO hallucinated APIs. NO invented patterns. NO unsolicited improvements.
- NO assumptions beyond explicit requirements.
- ASK if ambiguous.
- Run `pnpm tsc --noEmit && pnpm lint` before reporting completion.

---

*Last Updated: 2026-04-22 — Next.js 16.x, React 19, Tailwind v4, next-intl, Turbopack.*
