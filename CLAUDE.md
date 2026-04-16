# CLAUDE.md — Next.js 16 Frontend Developer Rules

This file provides guidance to Claude Code instances working in any Next.js 16 frontend project bootstrapped by Nuron Bot. It is the **single source of truth** for how to write, structure, and ship Next.js code in this codebase. Read it at the start of every session.

---

## 0. CRITICAL RULES — VIOLATION MEANS FAILURE

1. **DO EXACTLY WHAT IS ASKED.** Zero extras, zero nice-to-haves, zero unsolicited refactors. If the user asks for A, deliver A — never A+B.
2. **THINK 3X, DO 1X.** Triple-check every line before writing. No exceptions.
3. **NEVER BREAK EXISTING LOGIC.** Preserve all functionality when making changes. Read the surrounding code before editing.
4. **NEVER CHANGE ANYTHING NOT EXPLICITLY REQUESTED.** Fix imports = fix ONLY imports. Fix colors = fix ONLY colors. No drive-by edits.
5. **WHEN IN DOUBT, ASK.** Better to clarify than break working code. Never assume undocumented requirements.
6. **pnpm ONLY.** Never `npm`, never `yarn`, never `bun`. Lockfile is `pnpm-lock.yaml`.
7. **TypeScript ONLY for new files.** No new `.js`/`.jsx` files unless the project is explicitly JS-only. Prefer `.ts`/`.tsx`.
8. **Server Components by default.** Add `'use client'` ONLY when you need state, effects, browser APIs, or event handlers.
9. **NEVER call `fetch` directly from client components for app data.** Use the typed Axios instances under `src/lib/axios/`.
10. **NEVER use Pages Router.** This is App Router only. No `pages/` directory, ever.
11. **NEVER use `getServerSideProps`, `getStaticProps`, or `getInitialProps`.** Those are Pages Router. Use Server Components / `fetch` / `"use cache"`.
12. **NEVER edit `src/components/ui/*`** (shadcn primitives). Wrap them in modules instead.
13. **NEVER run dev/build/start commands.** Tell the user to run them. You may run read-only checks (`pnpm tsc --noEmit`, `pnpm lint`).
14. **NEVER commit secrets.** No API keys, no tokens, no `.env` contents in files you write.
15. **NEVER use `any`** unless escaping a third-party type bug. Prefer `unknown` and narrow.

---

## 1. Project Overview

Every Next.js project bootstrapped by Nuron Bot uses this stack:

- **Next.js 16** (App Router, React 19, Turbopack production builds)
- **TypeScript 5.6+** (strict mode)
- **Tailwind CSS v4** (CSS-first config, `@theme` directive, OKLCH colors)
- **shadcn/ui** (Radix-based primitives, copy-in-repo)
- **next-intl** (i18n via locale-prefixed routes — `[locale]` segment)
- **Zustand** (global client state)
- **TanStack Query v5** (server state, caching, mutations)
- **Axios** (HTTP — typed instances under `src/lib/axios/`)
- **react-hook-form + Zod** (forms + validation)
- **sonner** (toasts)
- **lucide-react** (icons)
- **Vitest + Testing Library** (unit/component tests)
- **Playwright** (E2E)
- **pnpm** (package manager)

---

## 2. Required Third-Party Stack — MANDATORY, NEVER SUBSTITUTE

This is the **only** approved stack. Do NOT introduce alternatives. If a need arises that isn't covered below, search for the **most popular, actively maintained** package and confirm with the user before adding.

### State Management
- **Zustand** — the ONLY global state library. No Redux, MobX, Jotai, Recoil, Valtio, Context-as-store.

### Server State / Data Fetching
- **TanStack Query** (`@tanstack/react-query`) — the ONLY server-state library. No SWR, no apollo-client for REST.
- Other TanStack packages are allowed when needed (`@tanstack/react-table`, `@tanstack/react-virtual`).

### HTTP Client
- **Axios** — wrap in **typed instances** under `src/lib/axios/`. Never call `fetch` for app data from client code, never call `axios` directly in components.
- Required instances:
  - `publicApi` — unauthenticated requests
  - `privateApi` — authenticated requests, attaches token via interceptor, handles 401 refresh/logout
- For Server Components/Server Actions you may use the native `fetch` (with `"use cache"`) OR a server-only Axios instance — pick one per project and stay consistent.

### Forms & Validation
- **react-hook-form** + **zod** + `@hookform/resolvers/zod` — the ONLY form stack. No Formik, Final Form, Yup, Joi, valibot.
- Always pair with shadcn `Form` components.

### Toasts / Notifications
- **sonner** — the ONLY toast library. No react-toastify, no react-hot-toast, no notistack.

### Sliders / Carousels
- **Splide.js** (`@splidejs/react-splide`) for content carousels. No Swiper, Embla, Keen Slider.
- For form range sliders, use the shadcn `Slider` component.

### UI / Styling
- **Tailwind CSS v4** with `@theme` directive — the only styling system. No CSS Modules, styled-components, Emotion, vanilla-extract.
- **shadcn/ui** — wrap, never replace.

### Icons
- **lucide-react** or **@heroicons/react** — the approved icon libraries. No react-icons, Font Awesome, Material Icons.

### Internationalization
- **next-intl** — the only i18n library. No react-i18next, no LinguiJS, no Format.JS standalone.

### Extended Approved Stack

| Need | USE | NEVER use |
|---|---|---|
| Date / time | **date-fns** or **Day.js** | Moment.js, Luxon |
| Tables | **@tanstack/react-table** + shadcn `Table` | MUI DataGrid, AG Grid |
| Charts | **Recharts** or **Tremor** (dashboards) | Chart.js, Victory, Nivo, ApexCharts |
| Animation | **Framer Motion** (`motion/react`) | react-spring, GSAP, anime.js |
| Drag & drop | **dnd-kit** | react-dnd, react-beautiful-dnd |
| Virtualization | **@tanstack/react-virtual** | react-window, react-virtualized |
| Rich text | **Tiptap** | Draft.js, Quill, Slate, CKEditor, TinyMCE |
| Markdown render | **react-markdown** + `remark-gfm` | marked + dangerouslySetInnerHTML |
| Code highlight | **Shiki** | Prism, highlight.js |
| File upload UI | **react-dropzone** | filepond, uppy |
| Image crop | **react-image-crop** | cropperjs wrappers |
| PDF view | **react-pdf** | pdf.js raw, iframe hacks |
| Maps | **react-leaflet** or **@vis.gl/react-google-maps** | react-google-maps/api |
| Class merging | **clsx + tailwind-merge** via `cn()` | classnames, custom concat |
| IDs | **nanoid** | uuid (unless RFC 4122 needed) |
| Env validation | **@t3-oss/env-nextjs** + zod | raw `process.env` scattered |
| Email | **Resend** + **react-email** | Nodemailer raw templates |
| Auth | **Auth.js v5 / NextAuth** OR custom Axios | Clerk SDK out-of-place |
| Payments | **Stripe** + `@stripe/react-stripe-js` | wrappers/forks |
| Analytics | **PostHog** or **Vercel Analytics** | GA raw `<script>` |
| WebSockets | native `WebSocket` or `socket.io-client` | sockjs, pusher-js |
| Search (client) | **Fuse.js** or **Algolia** | Lunr.js, custom regex |
| Phone input | **react-phone-number-input** + libphonenumber-js | regex masks |
| Color picker | **react-colorful** | react-color |
| QR codes | **qrcode.react** | qr.js |
| Copy to clipboard | native `navigator.clipboard` | react-copy-to-clipboard |
| Number / currency | native `Intl.NumberFormat` | numeral.js, accounting.js |
| Component variants | **class-variance-authority (cva)** | prop-to-class switch statements |
| OTP input | shadcn `InputOTP` | react-otp-input |
| Testing (unit) | **Vitest** + **@testing-library/react** | Jest, Enzyme |
| Testing (E2E) | **Playwright** | Cypress, Selenium |

### Adding a new library
1. Search for the **most popular, actively maintained** option (weekly downloads, last publish, GitHub stars).
2. Reject anything unmaintained (>1 year no release) or with <50k weekly downloads unless niche.
3. Confirm with the user before adding.
4. Install with `pnpm add` (or `pnpm add -D`).
5. NEVER pick obscure or "cool new thing nobody uses" packages.

---

## 3. Folder Layout (CANONICAL — DO NOT DEVIATE)

```
.
├── public/                          # Static assets served from /
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [locale]/                # Locale-prefixed routes
│   │   │   ├── layout.tsx           # Locale layout (providers, fonts, intl)
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── error.tsx            # Locale-level error boundary
│   │   │   ├── loading.tsx          # Locale-level loading UI
│   │   │   ├── not-found.tsx        # Locale 404
│   │   │   └── (group)/             # Route groups (no URL impact)
│   │   ├── api/                     # Route handlers (only if needed)
│   │   │   └── [name]/route.ts
│   │   ├── globals.css              # Tailwind v4 entry, @theme, design tokens
│   │   ├── layout.tsx               # Root layout (html, body, no providers here)
│   │   ├── opengraph-image.tsx      # OG image generation
│   │   ├── icon.tsx                 # Favicon generation
│   │   ├── manifest.ts              # Web app manifest
│   │   ├── robots.ts                # robots.txt
│   │   └── sitemap.ts               # sitemap.xml
│   ├── modules/                     # Feature modules (ALL custom code lives here)
│   │   └── [module-name]/
│   │       ├── components/          # PascalCase.tsx
│   │       ├── hooks/               # use-*.ts (kebab) or useX.ts
│   │       ├── stores/              # Zustand stores
│   │       ├── queries/             # TanStack Query hooks
│   │       ├── actions/             # Server Actions
│   │       ├── schemas/             # Zod schemas
│   │       ├── lib/                 # Pure utilities
│   │       ├── types/               # TS types/interfaces
│   │       ├── constants/           # Module constants
│   │       └── index.ts             # Public exports
│   ├── components/
│   │   └── ui/                      # shadcn/ui primitives — DO NOT EDIT
│   ├── lib/
│   │   ├── axios/                   # Typed Axios instances
│   │   │   ├── public.ts
│   │   │   ├── private.ts
│   │   │   └── index.ts
│   │   ├── utils.ts                 # cn() and shared helpers
│   │   └── env.ts                   # @t3-oss/env-nextjs schema
│   ├── i18n/
│   │   ├── messages/                # Translation files
│   │   │   ├── en.json
│   │   │   └── [locale].json
│   │   ├── request.ts               # next-intl request config
│   │   └── routing.ts               # Locale routing config
│   └── proxy.ts                     # Next 16 middleware (renamed from middleware.ts)
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.local                       # Local secrets (gitignored)
├── .env.example                     # Public template
├── next.config.ts
├── tailwind.config.ts               # Optional in v4 (CSS-first preferred)
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── pnpm-lock.yaml
└── package.json
```

---

## 4. Module Pattern (MANDATORY)

**ALL custom code lives in modules.** Zero components, hooks, stores, or business logic outside `src/modules/`.

```
src/modules/[module-name]/
├── components/         # PascalCase.tsx
├── hooks/              # useX.ts
├── stores/             # use-x-store.ts (Zustand)
├── queries/            # use-x.query.ts / use-x.mutation.ts
├── actions/            # x.action.ts (Server Actions, 'use server')
├── schemas/            # x.schema.ts (Zod)
├── lib/                # pure utils
├── types/              # x.types.ts
├── constants/          # x.constants.ts
└── index.ts            # public barrel exports
```

Rules:
1. A module is **self-contained** — it owns its own components, state, queries, types.
2. Cross-module imports MUST go through the module's `index.ts` barrel — never reach into another module's internals.
3. The `index.ts` barrel exports ONLY the public surface. Internal helpers stay private.
4. Never import a module from `src/app/` and skip the barrel.
5. If two modules need to share something, lift it into `src/lib/` or a new shared module.

---

## 5. App Router Rules

### 5.1 Server Components (default)

Every file in `src/app/` is a **Server Component** by default. They:
- Run only on the server, never ship JS to the client
- Can be `async` and `await` data directly
- Cannot use `useState`, `useEffect`, `useRef`, browser APIs, or event handlers
- Cannot import client-only modules (e.g., Zustand stores) at the top level

```tsx
// src/app/[locale]/products/page.tsx
import { getTranslations } from 'next-intl/server';
import { ProductList } from '@/modules/products';
import { fetchProducts } from '@/modules/products/lib/server';

export default async function ProductsPage() {
  const t = await getTranslations('Products');
  const products = await fetchProducts();
  return (
    <main>
      <h1>{t('title')}</h1>
      <ProductList products={products} />
    </main>
  );
}
```

### 5.2 Client Components

Add `'use client'` ONLY when you need:
- `useState` / `useReducer` / `useRef`
- `useEffect` / `useLayoutEffect`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- React Context, Zustand stores, TanStack Query hooks
- Third-party libs that depend on the above

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function Counter() {
  const t = useTranslations('Counter');
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{t('count', { count })}</button>;
}
```

Rules:
1. Push `'use client'` **as far down the tree as possible**. Wrap leaves, not pages.
2. A Server Component CAN render a Client Component, and pass serializable props to it.
3. A Client Component CANNOT directly import a Server Component, but it CAN receive one as `children`.
4. If a file needs `'use client'`, the directive MUST be the very first line.
5. Never add `'use client'` "just in case" — every directive must be justified.

### 5.3 Server Actions

Server Actions are async functions marked with `'use server'`. They run on the server and can be called from Client Components or `<form action={...}>`.

```ts
// src/modules/products/actions/create-product.action.ts
'use server';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { productSchema } from '@/modules/products/schemas/product.schema';

export async function createProduct(_prev: unknown, formData: FormData) {
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  await db.products.create({ data: parsed.data });
  revalidateTag('products');
  return { ok: true as const };
}
```

Rules:
1. Server Actions MUST validate input with Zod on the server. Never trust the client.
2. Server Actions MUST return serializable values (no functions, no class instances).
3. Use `revalidateTag` / `revalidatePath` after mutations.
4. Pair with `useActionState` (React 19) on the client for pending/error UI.
5. Server Actions are NOT a security boundary — re-check auth/ownership inside every action.

### 5.4 Route Handlers (`route.ts`)

Use `route.ts` only when you need a public HTTP endpoint (webhooks, OAuth callbacks, file uploads). Prefer Server Actions for app data mutations from your own UI.

```ts
// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ ok: true });
}
```

### 5.5 Streaming, Suspense, PPR

- **Streaming**: Wrap slow data fetches in `<Suspense fallback={<Skeleton />}>`. The shell streams immediately, the slow part fills in later.
- **Parallel data fetching**: Use `Promise.all([a(), b()])` inside Server Components, or use multiple `<Suspense>` boundaries side by side.
- **Partial Prerendering (PPR)**: Enable in `next.config.ts` with `experimental.ppr = 'incremental'` and add `export const experimental_ppr = true` to a route. Static shell prerenders, dynamic holes stream.

```tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <StaticHero />
      <Suspense fallback={<DashboardSkeleton />}>
        <DynamicDashboard />
      </Suspense>
    </>
  );
}
```

### 5.6 `loading.tsx`, `error.tsx`, `not-found.tsx`

Every route segment SHOULD have these files where appropriate:

- `loading.tsx` — Suspense fallback for the segment. Keep it lightweight (skeletons, not spinners).
- `error.tsx` — Client component with `'use client'` and `reset()` button. Receives `error` and `reset` props.
- `not-found.tsx` — Triggered by `notFound()` from `next/navigation`.
- `global-error.tsx` — Root-level error boundary (only at `app/global-error.tsx`).

```tsx
// src/app/[locale]/products/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 5.7 Parallel & Intercepting Routes

- **Parallel routes**: `@slot` folders render multiple pages in one layout simultaneously. Useful for dashboards with independent panels.
- **Intercepting routes**: `(.)folder`, `(..)folder`, `(...)folder` capture navigation from elsewhere — e.g., open a photo as a modal when navigated to from a feed but as a full page on direct visit.

Use these only when they genuinely simplify UX. Do not add them speculatively.

### 5.8 Metadata API

Every page MUST export `metadata` (static) or `generateMetadata` (dynamic).

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our catalog',
  openGraph: {
    title: 'Products',
    description: 'Browse our catalog',
    images: ['/og/products.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/products' },
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product.name };
}
```

Rules:
1. Every page sets `title` and `description`.
2. Public pages set `openGraph` and `twitter`.
3. Detail pages set `alternates.canonical`.
4. Use `app/opengraph-image.tsx` to generate dynamic OG images via `ImageResponse`.
5. Use `app/icon.tsx`, `app/apple-icon.tsx` for favicons.
6. Define `app/robots.ts` and `app/sitemap.ts` at the root of `app/`.

### 5.9 `proxy.ts` (formerly `middleware.ts`)

Next.js 16 renamed `middleware.ts` → `proxy.ts`. The function signature and matcher config are unchanged.

```ts
// src/proxy.ts
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(req: NextRequest) {
  // Auth check
  const token = req.cookies.get('session')?.value;
  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

Rules:
1. The file MUST be named `proxy.ts` (Next 16). Old `middleware.ts` still works but is deprecated.
2. The exported function MUST be named `proxy` (or `middleware` for back-compat).
3. NEVER use `proxy.ts` as your sole auth boundary. Re-check inside Server Actions and Route Handlers.
4. Keep proxy logic minimal — it runs on every matched request.

---

## 6. Caching (Next.js 16)

Next 16 caching is **explicit and opt-in**. Nothing is cached unless you say so.

### `"use cache"` directive

```ts
'use cache';
import { cacheLife, cacheTag } from 'next/cache';

export async function getProducts() {
  cacheLife('hours');
  cacheTag('products');
  return await db.products.findMany();
}
```

- `'use cache'` at top of file/function/component opts into the data cache.
- `cacheLife('seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'max')` — TTL profile.
- `cacheTag('products')` — enables on-demand invalidation.
- Replaces the v14 `unstable_cache`.

### Invalidation

```ts
'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function updateProduct(id: string, data: FormData) {
  await db.products.update(id, data);
  revalidateTag('products');     // purge all caches tagged 'products'
  revalidatePath('/products');   // purge specific route
}
```

### `cache()` from React

```ts
import { cache } from 'react';
export const getUser = cache(async (id: string) => db.users.findOne(id));
```
- Request-level memoization. Deduplicates identical calls within a single request.
- Use for repeated data access in the same render pass.

### Rules
1. Never cache user-specific data with `cacheTag` unless you tag it per-user.
2. Always tag cached data so you can invalidate it later.
3. Default to **no cache** unless you have a clear reason.
4. Use `cacheLife('max')` only for truly immutable data.

---

## 7. next-intl (Internationalization)

### Routing

```ts
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['en', 'hu'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

### Request config

```ts
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as never) ? requested : routing.defaultLocale;
  return {
    locale: locale!,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### Translation files

```
src/i18n/messages/
├── en.json
└── hu.json
```

```json
{
  "Home": { "title": "Welcome", "description": "..." },
  "Common": { "submit": "Submit", "cancel": "Cancel" }
}
```

### Usage

```tsx
// Server Component
import { getTranslations } from 'next-intl/server';
export default async function Page() {
  const t = await getTranslations('Home');
  return <h1>{t('title')}</h1>;
}

// Client Component
'use client';
import { useTranslations } from 'next-intl';
export function Btn() {
  const t = useTranslations('Common');
  return <button>{t('submit')}</button>;
}
```

### Rules
1. NEVER hardcode user-facing strings. Every string goes in a message file.
2. Translation keys: PascalCase namespaces, camelCase keys (`Home.welcomeMessage`).
3. Keep translation files in sync — every locale file must have the same key shape.
4. Use ICU plurals/selects for plurals: `{count, plural, one {# item} other {# items}}`.
5. Use `next-intl/link` and `next-intl/navigation` for locale-aware routing.

---

## 8. Tailwind CSS v4

Tailwind v4 is **CSS-first**. Define your theme inside `globals.css` using `@theme`.

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-display: "Instrument Sans", system-ui, sans-serif;

  --color-brand-50:  oklch(0.97 0.02 280);
  --color-brand-500: oklch(0.62 0.18 280);
  --color-brand-900: oklch(0.28 0.10 280);

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

@layer base {
  :root {
    --background: oklch(0.99 0.005 280);
    --foreground: oklch(0.18 0.02 280);
  }
  .dark {
    --background: oklch(0.14 0.015 280);
    --foreground: oklch(0.96 0.01 280);
  }
}
```

### Rules
1. Use **OKLCH** colors. Never raw hex, never HSL, never `#000` or `#fff` (always tint).
2. Use the **4pt spacing scale**: `p-1, p-2, p-3, p-4, p-6, p-8, p-12, p-16, p-24`.
3. NEVER use arbitrary values (`p-[23px]`) unless absolutely necessary.
4. Use `gap-*` for sibling spacing, not `margin`.
5. Use `clamp()` for fluid typography in CSS, expose via `--font-size-*` tokens.
6. NEVER use the banned fonts (Inter, Roboto, Arial, Open Sans, Lato, Montserrat). Use Instrument Sans, Plus Jakarta Sans, Outfit, Onest, Figtree, Urbanist, DM Sans.
7. Animations: animate `transform` and `opacity` only. Never `width/height/padding/margin`.
8. Use exponential easings: `ease-out-quart`, `ease-out-quint`, `ease-out-expo`. No `bounce`/`elastic`.
9. NO glassmorphism, NO gradient text on headings, NO neon-on-dark.

---

## 9. shadcn/ui

**NEVER reinvent UI primitives.** ALWAYS use shadcn first.

### Rules
1. **USE shadcn components** — Button, Dialog, Form, Input, Select, etc. live in `@/components/ui/`.
2. **WRAP, never replace** — Create wrappers in your module that extend shadcn.
3. **NEVER edit `src/components/ui/*` directly** unless updating from upstream.
4. **CHECK FIRST** — Before creating any UI component, check if shadcn already has it.
5. Install new ones with `pnpm dlx shadcn@latest add <component>`.

### Wrapping

```tsx
// src/modules/forms/components/SubmitButton.tsx
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton({ loading, children, ...props }: ButtonProps & { loading?: boolean }) {
  return (
    <Button type="submit" disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
```

### Available primitives
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

---

## 10. Zustand (Client State)

```ts
// src/modules/cart/stores/use-cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set((s) => ({ items: [...s.items, item] })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart' }
  )
);
```

### Rules
1. ONE store per concern (auth, cart, ui), NOT one mega-store.
2. Stores live in `src/modules/[name]/stores/use-[name]-store.ts`.
3. Always type the state interface explicitly.
4. Use selectors when reading: `const items = useCartStore((s) => s.items);` to avoid unnecessary re-renders.
5. Persist only what must survive reload — use `persist` middleware with `partialize`.
6. NEVER import a store at the top of a Server Component file. Stores are client-only.

---

## 11. TanStack Query (Server State)

### Setup

```tsx
// src/modules/core/components/QueryProvider.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () => new QueryClient({
      defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
    })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

### Query hook

```ts
// src/modules/products/queries/use-products.query.ts
import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Product } from '@/modules/products/types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await privateApi.get<Product[]>('/products');
      return data;
    },
  });
}
```

### Mutation hook

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data } = await privateApi.post('/products', input);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
```

### Rules
1. Query keys are arrays starting with the resource name: `['products']`, `['products', id]`.
2. ONE hook per query, in `src/modules/[name]/queries/use-[name].query.ts`.
3. Mutations live alongside queries with `.mutation.ts` suffix.
4. Always invalidate or `setQueryData` after a successful mutation.
5. Never call `fetch` or `axios` directly in components — go through a query hook.

---

## 12. Axios Pattern

```ts
// src/lib/axios/public.ts
import axios from 'axios';
import { env } from '@/lib/env';
export const publicApi = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });
```

```ts
// src/lib/axios/private.ts
import axios from 'axios';
import { useAuthStore } from '@/modules/auth';
import { env } from '@/lib/env';

export const privateApi = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

privateApi.interceptors.request.use((config) => {
  const { token, userType } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (userType) config.headers['X-User-Type'] = userType;
  return config;
});

privateApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);
```

### Rules
1. NEVER call `axios.create()` outside `src/lib/axios/`.
2. NEVER `import axios from 'axios'` in a component.
3. Multi user-type support: the auth store holds `userType` (e.g. `admin`, `customer`, `vendor`) and the interceptor injects the right token/header.
4. Use `publicApi` for unauthenticated calls (login, register, public endpoints).
5. Use `privateApi` for authenticated calls.

---

## 13. react-hook-form + Zod

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: Values) {
    // call mutation
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}
```

### Rules
1. EVERY form uses `useForm` + `zodResolver`. No manual `useState` for form values.
2. EVERY form has a Zod schema. Schemas live in `src/modules/[name]/schemas/`.
3. ALWAYS pair with shadcn `Form` components.
4. Always provide `defaultValues` (avoid uncontrolled-to-controlled warnings).
5. The same Zod schema MUST be used in the corresponding Server Action for server-side validation.

---

## 14. Imports & Naming

### Imports
- ALWAYS use `@/` aliased imports (`@/` = `src/`). NEVER `../../`.
- Within the same module, relative imports are allowed.
- Cross-module imports MUST go through the module's barrel `index.ts`.
- Import order:
  1. React / Next / external libs
  2. next-intl
  3. Internal modules (`@/modules/*`)
  4. Internal libs (`@/lib/*`, `@/components/*`)
  5. Relative imports

### Naming
| Kind | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | `useX` camelCase | `useUserData.ts` |
| Stores | `use-x-store` kebab | `use-cart-store.ts` |
| Queries | `use-x.query` | `use-products.query.ts` |
| Mutations | `use-x.mutation` | `use-create-product.mutation.ts` |
| Server Actions | `x.action` | `create-product.action.ts` |
| Schemas | `x.schema` | `product.schema.ts` |
| Types | `x.types` | `product.types.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Utility files | kebab-case | `format-date.ts` |
| Booleans | `is/has/should` prefix | `isLoading`, `hasError` |
| Event handlers | `handle*` | `handleSubmit` |
| Translation namespaces | PascalCase | `Home.welcomeMessage` |

### File size
- Keep files under **200 lines**. Split when larger.
- Components: max **120 lines**. Extract subcomponents otherwise.

---

## 15. Performance Rules

1. **Server Components by default** — minimize client JS.
2. **`next/image`** for ALL images. Provide `width`/`height` or `fill`. `priority` for LCP.
3. **`next/font`** (`google` or `local`) for fonts. Self-hosts, eliminates CLS, removes external requests.
4. **Stream slow data** with `<Suspense>`. Parallelize with `Promise.all`.
5. **Use `"use cache"`** for expensive pure computations and DB reads. Tag everything.
6. **Code-split** Client Components with `next/dynamic` when they're heavy and below the fold.
7. **Avoid client-side waterfalls** — fetch on the server when possible.
8. **Bundle analysis** — `pnpm add -D @next/bundle-analyzer`. Keep client bundles lean.
9. **Core Web Vitals targets**: LCP < 2.5s, INP < 200ms, CLS < 0.1.
10. **Memoize expensively** — use `useMemo`/`useCallback` only when profiling proves a need. Don't cargo-cult.

---

## 16. SEO Rules

1. EVERY page exports `metadata` or `generateMetadata`.
2. EVERY page has `title` (≤ 60 chars) and `description` (≤ 160 chars).
3. Public pages set `openGraph.images` (1200×630).
4. Detail pages set `alternates.canonical`.
5. Use `app/sitemap.ts` to generate `/sitemap.xml`.
6. Use `app/robots.ts` to generate `/robots.txt`.
7. Use `app/opengraph-image.tsx` (`ImageResponse`) for dynamic OG images.
8. Use semantic HTML — `<main>`, `<header>`, `<nav>`, `<article>`, `<section>`. Single `<h1>` per page.
9. Add JSON-LD structured data via a `<script type="application/ld+json">` in the page when relevant.
10. Locale alternates: `alternates.languages` for hreflang.

---

## 17. Accessibility Rules

1. EVERY interactive element MUST be reachable by keyboard.
2. EVERY image has `alt`. Decorative images use `alt=""`.
3. EVERY form input has an associated `<Label>` (use shadcn `FormLabel`).
4. Color contrast ≥ WCAG AA (4.5:1 body, 3:1 large text).
5. Use semantic elements (`<button>` for actions, `<a>` for navigation). NEVER `<div onClick>`.
6. Focus rings MUST be visible. Don't `outline: none` without a replacement ring.
7. Use `aria-*` only when semantic HTML can't express the meaning.
8. Test with keyboard only: Tab, Shift+Tab, Enter, Escape, arrow keys.
9. Modals: trap focus, restore focus on close, ESC closes (shadcn `Dialog` does this).
10. Live regions for async updates: `role="status"` / `aria-live="polite"`.

---

## 18. Testing

### Vitest setup

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: ['./tests/setup.ts'], globals: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

### Unit / component test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

test('emits query on type', async () => {
  const onSearch = vi.fn();
  render(<SearchInput onSearch={onSearch} />);
  await userEvent.type(screen.getByRole('textbox'), 'hello');
  expect(onSearch).toHaveBeenLastCalledWith('hello');
});
```

### Playwright E2E

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

```ts
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});
```

### Rules
1. Server Components: cannot render in JSDOM. Test by extracting logic into pure functions, or test via Playwright.
2. Client Components: render with RTL, simulate events with `userEvent`, assert DOM.
3. Server Actions: import and call directly — they're just async functions.
4. Co-locate tests: `Component.test.tsx` next to `Component.tsx` OR in `__tests__/`.
5. Every new feature ships with at least ONE test.

---

## 19. Environment Variables

Use `@t3-oss/env-nextjs` for type-safe env access.

```ts
// src/lib/env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
```

### Rules
1. NEVER access `process.env.*` outside `src/lib/env.ts`.
2. Client-exposed vars MUST be prefixed `NEXT_PUBLIC_`.
3. Commit `.env.example` with placeholder values; gitignore `.env.local`.
4. NEVER commit real secrets.

---

## 20. Turbopack

Next.js 16 ships **Turbopack as the default** for both `next dev` and `next build`. No special flags required.

### Rules
1. Don't add Webpack-specific config to `next.config.ts` — prefer the Turbopack-supported options.
2. If a loader you need isn't supported, file it as a project task; don't silently fall back to Webpack.
3. Production builds: `next build` uses Turbopack by default.

---

## 21. Common Pitfalls (READ BEFORE CODING)

1. **Importing a Server Component into a Client Component.** Pass it as `children` instead.
2. **`'use client'` not on the first line.** It MUST be the very first non-comment line of the file.
3. **Calling `cookies()`/`headers()`/`searchParams` synchronously.** In Next 16 these are async — `await cookies()`, `const sp = await searchParams`.
4. **Using `useRouter` from `next/router`.** That's Pages Router. Use `next/navigation` (or `next-intl/navigation`).
5. **Using `next/head`.** Pages Router only. Use the `metadata` export.
6. **Using `getServerSideProps` / `getStaticProps`.** Pages Router. Forbidden.
7. **Mutating without revalidation.** After a Server Action that changes data, ALWAYS `revalidateTag` or `revalidatePath`.
8. **Treating `proxy.ts` as a security boundary.** It's not. Re-check auth in actions and route handlers.
9. **Passing functions as props from Server to Client Components.** Server props must be serializable. Use Server Actions for callbacks.
10. **Reading client state in a Server Component.** Server Components can't see Zustand stores or React Context.
11. **`fetch` without a cache strategy in Server Components.** Default is no-cache in Next 16. If you want caching, wrap in a `'use cache'` function.
12. **Using `useEffect` to fetch.** Use TanStack Query or fetch in a Server Component.
13. **Hardcoded strings instead of `t()`.** Every user-facing string goes through next-intl.
14. **Forgetting `key` props in lists.** React 19 still requires unique stable keys.
15. **Pure black/white colors.** Always tint via OKLCH.
16. **Animating layout properties.** Animate `transform`/`opacity` only.
17. **Modal-everything.** Use modals only when absolutely necessary; prefer inline disclosure.
18. **Cards inside cards.** Flatten the hierarchy.
19. **Using `<a>` for internal navigation.** Use `<Link>` from `next-intl/navigation` (or `next/link`).
20. **`window` access at module top level.** Wrap in `useEffect` or `if (typeof window !== 'undefined')`.
21. **Importing server-only code into client bundles.** Use `import 'server-only'` at the top of server modules to fail loud.
22. **Importing client-only code into server bundles.** Use `import 'client-only'`.
23. **Overusing `useMemo`/`useCallback`.** Only when profiling shows a real perf problem.
24. **Storing tokens in `localStorage`.** Use httpOnly cookies via the API.
25. **Skipping form server-side validation.** ALWAYS revalidate with the same Zod schema in the Server Action.

---

## 22. Command Restrictions

### NEVER Run These (tell the user to run them)
- `pnpm dev`, `pnpm build`, `pnpm start`
- Any command that starts a long-running server
- Any destructive git command

### MAY Run
- `pnpm tsc --noEmit` (typecheck)
- `pnpm lint`
- `pnpm test --run` (Vitest non-watch)
- `pnpm exec playwright test` (with `--reporter=line`)
- `git status`, `git log`, `git diff`
- File reads, greps, listings

---

## 23. Git Rules

- NEVER revert commits.
- NEVER run destructive commands (`reset --hard`, `push --force`, `rebase`, `clean -fd`).
- NEVER amend commits not authored by you in this session.
- NEVER commit unless explicitly asked.
- When asked to commit, write a clear, scoped message.

---

## 24. Execution Standards

- Execute ONLY what is requested.
- NO hallucinated APIs.
- NO unsolicited improvements.
- NO assumptions beyond explicit requirements.
- ASK if a requirement is ambiguous.
- When done, run `pnpm tsc --noEmit && pnpm lint` (if available) before reporting completion.

---

*Last Updated: 2026-04-07 — targets Next.js 16.x, React 19, Tailwind v4, next-intl, Turbopack.*
