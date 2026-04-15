# Tailwind CSS Enforcer

## Description
Enforce Tailwind CSS best practices after any CSS or component modification. Audit files for violations, suggest fixes, and ensure consistent, maintainable styling.

## Trigger
Run automatically after any CSS, component, or template file modification that involves styling.

## Tools
Read, Grep, Glob, Edit, Write, Bash

---

## Enforcement Rules

### 1. NO Inline Styles
**Violation:** `style={{ padding: '12px', color: '#333' }}`
**Fix:** Replace with Tailwind classes. `className="p-3 text-gray-700"`
- Never use the `style` prop/attribute unless absolutely unavoidable (e.g., dynamic values that cannot be expressed as classes)
- If inline style is truly dynamic, extract to a CSS variable and use it via a Tailwind class

### 2. NO Arbitrary Values Unless Justified
**Violation:** `w-[732px]`, `mt-[37px]`, `text-[13.5px]`, `px-[92px]`
**Fix:** Use the closest Tailwind scale value. Check the Tailwind spacing/sizing scale first:
- Spacing: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
- Font sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- **Allowed exception:** Arbitrary values are only permitted if the exact pixel value is a hard design requirement (e.g., a fixed-size icon container from a design spec) and no standard value is within reasonable tolerance (±4px)
- **NEVER** use values like `px-92`, `mt-72` for padding/margin that exceed the design scale without justification

### 3. NO Arbitrary Colors — Always Use CSS Variables
**Violation:** `text-[#3B82F6]`, `bg-[#1a1a2e]`, `border-[rgba(0,0,0,0.1)]`
**Fix:**
1. First, search the project for existing CSS variable definitions:
   - Check `globals.css`, `index.css`, `tailwind.config.*`, `theme.css`, or any `:root {}` block
   - Search for `--color-`, `--tw-`, or custom variable names
2. If a matching variable exists: use it → `text-primary`, `bg-background`, `border-border`
3. If no matching variable exists: **create** the variable in the appropriate CSS file under `:root {}`, then use it via Tailwind config or `var()` in a semantic class
4. **Never** use hex codes or rgba directly as arbitrary Tailwind values

### 4. Always Use Semantic Color Tokens
Prefer semantic names over descriptive ones:
- `bg-background` not `bg-white` or `bg-[#ffffff]`
- `text-foreground` not `text-black`
- `text-muted-foreground` not `text-gray-500`
- `bg-primary` not `bg-blue-600`
- `bg-destructive` not `bg-red-500`
- `border-border` not `border-gray-200`
Check the project's design token system before using any Tailwind color palette class directly.

### 5. NO Extreme Spacing Values
Flag and fix any spacing that is disproportionate or not from the standard scale:
- **Padding/Margin:** Max reasonable values are typically `p-16` / `m-16` for containers. Anything beyond requires explicit justification.
- **Width/Height:** Prefer `max-w-*` from Tailwind's built-in scale (`max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`, `max-w-2xl`, `max-w-3xl`, `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl`, `max-w-screen-*`) over arbitrary pixel widths.
- **Gap:** Use `gap-*` from the standard scale. Avoid `gap-[48px]` when `gap-12` exists.

### 6. No `!important` or Tailwind `!` Prefix Abuse
- Avoid `!text-red-500` unless overriding a third-party library style with no other option.
- Document the reason in a comment when `!` is used.

### 7. Prefer Responsive and State Variants Over Conditional Classes
- Use `sm:`, `md:`, `lg:`, `xl:` breakpoint prefixes
- Use `hover:`, `focus:`, `active:`, `disabled:` state prefixes
- Use `dark:` for dark mode
- Avoid JavaScript-toggled inline styles for responsive/state behavior

### 8. Group and Order Classes Consistently
Recommended order (follow project convention if one exists):
1. Layout: `flex`, `grid`, `block`, `hidden`
2. Positioning: `relative`, `absolute`, `fixed`, `z-*`
3. Sizing: `w-*`, `h-*`, `max-w-*`, `min-h-*`
4. Spacing: `p-*`, `m-*`, `gap-*`
5. Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
6. Colors: `bg-*`, `text-*`, `border-*`
7. Borders: `border`, `rounded-*`
8. Effects: `shadow-*`, `opacity-*`, `transition-*`

### 9. No `@apply` with Arbitrary Values in CSS Files
- If using `@apply` in `.css` files, only apply standard Tailwind utilities
- `@apply text-[#333]` is forbidden — use `@apply text-foreground` or similar token
- Prefer component classes via `cn()` / `clsx()` in JSX over `@apply` in CSS

### 10. Extract Repeated Class Combinations
- If the same 4+ class string appears 3+ times, it should be extracted into a component or a shared `cn()` helper
- Do not silently duplicate long class strings — flag for extraction

### 11. Prefer Flex/Grid Over Absolute Positioning
**Goal:** Use layout primitives to let the browser position elements naturally. Reserve `absolute`/`fixed` for elements that genuinely need to escape document flow (tooltips, modals, overlays, badges pinned to a corner).

**Common violations and their flex/grid replacements:**

| Absolute pattern | Preferred alternative |
|---|---|
| `absolute top-0 left-0 w-full` | Parent `relative flex flex-col` + child fills naturally |
| `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` | Parent `flex items-center justify-center` |
| `absolute bottom-0 left-0 right-0` | Parent `flex flex-col justify-end` or `mt-auto` |
| `absolute right-0 top-0` to stack two elements | Parent `flex items-start justify-between` |
| Side-by-side elements via `absolute left-*` offsets | `flex gap-*` |
| Grid of items positioned with `absolute` + manual offsets | `grid grid-cols-*` |

**Decision rule:**
1. Ask: *can a flex or grid container on the parent achieve the same visual result?*
2. If yes → use flex/grid, flag the absolute usage
3. If no (genuine overlay, portal, fixed HUD) → `absolute`/`fixed` is acceptable, leave it
4. `relative` on a parent to constrain an `absolute` child is fine **only** when the child is a true overlay (badge, close button on a card, tooltip anchor)

**Audit trigger:** Any file containing `absolute` or `fixed` classes should be reviewed to confirm the usage falls into the "genuine overlay" category.

### 12. Use `gap` Over `space-x`/`space-y` or Margin Between Siblings
- Prefer `gap-*` on the flex/grid container to space children — it is more predictable and works in all directions
- `space-x-*` / `space-y-*` use a `margin` selector hack (`> * + *`) that breaks when children are conditionally rendered or wrapped in fragments
- Never add `mb-4` to every list item to simulate spacing — use `flex flex-col gap-4` on the parent
- Exception: `mt-auto` on a single flex child to push it to the end is fine

### 13. Never Use Fixed Heights on Text Containers
- `h-12` on a container holding text will clip content when the font scales or text wraps
- Use `min-h-*` for containers that need a minimum size but should grow with content
- Use `h-*` only on elements with known, fixed dimensions (icons, avatars, fixed-size images)
- For full-page layouts use `min-h-screen` not `h-screen` — `h-screen` clips on mobile when the browser chrome is visible

### 14. Prefer `min-h-0` to Fix Flex/Grid Overflow
- Flex children default to `min-height: auto`, which prevents them from shrinking below their content size
- When a scrollable child overflows its flex container, add `min-h-0` to the flex child, not `overflow-hidden` on the parent
- **Do not** use `overflow-hidden` as a layout fix without understanding why the overflow is happening

### 15. Always Pair `opacity-0`/`invisible` With `pointer-events-none`
- An element with `opacity-0` is still interactive — it can receive clicks, focus, and hover events
- When hiding visually, always add `pointer-events-none` unless the element should still be keyboard-focusable
- For accessible hiding use `sr-only`, not `opacity-0` or `hidden` — `sr-only` is readable by screen readers
- `visibility: hidden` (`invisible`) removes pointer events but keeps layout space — use deliberately

### 16. Use `focus-visible:` Not `focus:` for Keyboard Styles
- `focus:ring-2` fires on mouse click too, creating a visible ring on every click
- `focus-visible:ring-2` fires only on keyboard navigation — the correct UX behavior
- Always add `focus-visible:` styles to interactive elements (`button`, `a`, `input`, custom controls)
- Never use `outline-none` alone without a `focus-visible:` replacement — it breaks keyboard accessibility

### 17. Z-Index Must Follow a Documented Scale
- Never use arbitrary z-index values like `z-[9999]`, `z-[100]`, `z-[50]` scattered across files
- Define a project z-index scale and stick to it. Recommended layers:
  - `z-0` — base content
  - `z-10` — slightly elevated (cards, dropdowns)
  - `z-20` — sticky headers
  - `z-30` — drawers / side panels
  - `z-40` — modals / dialogs
  - `z-50` — toasts / notifications
- If the scale needs extension, update it in one place (Tailwind config or CSS vars), not inline

### 18. Images Must Have Explicit Sizing and Object Fit
- Always set `w-*` and `h-*` (or `w-full h-auto`) on `<img>` tags — unsized images cause layout shift (CLS)
- Use `object-cover` for images that fill a fixed container without distortion
- Use `object-contain` for images that must be fully visible within bounds
- Never let images stretch with default `object-fill` inside a sized container
- Always add `alt` text — empty `alt=""` is valid for decorative images, but never omit the attribute

### 19. Use `aspect-ratio` Instead of Padding Hacks
- The old `pb-[56.25%]` trick to maintain a 16:9 ratio is obsolete
- Use `aspect-video` (16:9), `aspect-square` (1:1), or `aspect-[4/3]` (only as last resort)
- Pair with `w-full` on the container and `object-cover` on the inner image/video

### 20. Avoid Conflicting Utility Classes
- Never apply contradictory utilities to the same element: `flex block`, `w-full w-48`, `text-left text-center`
- Conditional class merging must use `cn()` / `clsx()` with `tailwind-merge` — never string concatenation, which allows conflicts to silently coexist
- **Violation:** `className={`flex ${isBlock ? 'block' : ''}`}` — both `flex` and `block` can end up applied
- **Fix:** `cn('flex', { 'block': isBlock })` with tailwind-merge so conflicting classes are resolved

### 21. Use Semantic Layout Shorthands
Prefer compact, intentional shorthands over verbose combinations:

| Verbose | Shorthand |
|---|---|
| `flex items-center justify-center` | `flex items-center justify-center` (keep — no shorthand) or `grid place-items-center` |
| `flex flex-col items-center justify-center` | `flex flex-col items-center justify-center` |
| `w-full h-full` inside an `absolute inset-0` | `absolute inset-0` already implies full coverage — don't add `w-full h-full` |
| `top-0 left-0 bottom-0 right-0` | `inset-0` |
| `top-0 left-0` | `inset-0` if you also want right/bottom, or keep explicit if directional |
| `border-t border-r border-b border-l` | `border` |
| `rounded-tl rounded-tr rounded-bl rounded-br` | `rounded` |

### 22. Transitions Must Be Specific
- `transition-all` is a performance hazard — it triggers repaints on every animatable property
- Use specific transitions: `transition-colors`, `transition-opacity`, `transition-transform`
- Always pair with `duration-*` and optionally `ease-*`
- Avoid animating `width`, `height`, or `top`/`left` — prefer `transform: scale/translate` for performance

### 23. Don't Float — Ever
- `float-left` / `float-right` are legacy layout tools from the pre-flexbox era
- Any float usage should be replaced with flex or grid
- Exception: text wrapping around an inline image (`float-left mr-4 mb-2` on an image inside prose) is the only valid modern use case

### 24. Responsive Design Must Come From Classes, Never JavaScript
- Never read `window.innerWidth` to conditionally apply styles
- Never toggle classes via JavaScript based on viewport size
- All responsive behavior must come from Tailwind breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- For truly dynamic layout needs, use CSS container queries if supported, not JS

### 25. `overflow-hidden` Must Be Intentional
- `overflow-hidden` has side effects: it creates a new stacking context (affects z-index), clips `box-shadow`, and traps `position: sticky` children
- Never use it to "fix" an overflowing layout without understanding the root cause
- If content overflows, investigate whether the container needs `min-h-0`, `flex-1`, or proper sizing instead
- Document with a comment when `overflow-hidden` is used intentionally (e.g., `{/* overflow-hidden: clips card image corners */}`)

### 26. Use `divide-*` for Borders Between Siblings
- Never add `border-b` to every list item except the last using conditional logic
- Use `divide-y` on the parent to automatically add borders between children
- `divide-y divide-border` replaces `border-b border-border` on each sibling

### 27. Scrollable Containers Need Explicit Overflow and Height
- A container that should scroll must have both `overflow-auto` (or `overflow-y-auto`) AND a constrained height (`h-*`, `max-h-*`, or `flex-1 min-h-0`)
- Without a height constraint, `overflow-auto` has no effect — the container just grows
- Use `overflow-auto` not `overflow-scroll` — `scroll` always shows scrollbars even when content fits

### 28. Sticky Elements Need the Right Ancestor Overflow
- `sticky` stops working if any ancestor has `overflow: hidden`, `overflow: auto`, or `overflow: scroll`
- Before using `sticky`, verify the scroll container is `<body>` or a known overflow parent
- If sticky is broken, the fix is almost always removing `overflow-hidden` from an ancestor, not changing the sticky element

---

## Advanced / Next-Level CSS Rules

### 29. Fixed Top Navbars Must Account for Their Own Height
- A `fixed top-0` navbar takes itself out of document flow — the content below it will slide under it
- Always add matching top padding/margin to the page content: if navbar is `h-16`, content needs `pt-16` or `mt-16`
- Preferred pattern: define navbar height as a CSS variable (`--navbar-height: 4rem`) and use `pt-[var(--navbar-height)]` or set it in Tailwind config so both elements reference the same value
- Never hardcode the offset in multiple places — one change to the navbar height would break every page

### 30. Fixed/Sticky Headers Must Use `backdrop-blur` + Transparent BG, Not Solid Color Alone
- A header with a solid `bg-background` that has no visual separation looks broken when content scrolls under it
- Preferred pattern: `bg-background/80 backdrop-blur-sm border-b border-border`
- This gives depth, legibility, and shows the header is above content without a harsh jump
- `backdrop-blur` requires the background to have transparency (`/80`, `/90`) — without it, blur has no effect

### 31. Never Use `fixed` for Layout Panels — Use CSS Grid Named Areas or Flex
- A sidebar implemented as `fixed left-0 top-0 h-screen w-64` forces the main content to manually add `ml-64`
- Any change to sidebar width breaks every page that has the hardcoded margin
- Preferred pattern: a top-level grid layout: `grid grid-cols-[16rem_1fr]` or `flex` with a fixed-width `w-64 shrink-0` sidebar and a `flex-1 min-w-0` main area
- `fixed` sidebars are acceptable only for drawers/overlays that slide in over content (with a backdrop)

### 32. Layers and Stacking Contexts Must Be Understood Before Adding `z-*`
- Every `relative`, `absolute`, `fixed`, `sticky`, `transform`, `opacity < 1`, `filter`, `will-change`, `isolation-isolate` creates a new stacking context
- A `z-50` inside a stacking context with `z-10` will never appear above a sibling stacking context with `z-20`, regardless of its own z-index
- When a `z-index` fix isn't working: add `isolation-isolate` to the root of the component to contain its stacking context, or audit the ancestor chain for unintended stacking context creators
- Use `isolation-isolate` on component roots to prevent z-index leakage between components

### 33. Use `will-change` Only as a Last Resort Performance Fix
- `will-change: transform` promotes an element to its own GPU layer — sounds good, but has memory cost
- Do not add `will-change` preemptively or across many elements
- Only add after profiling confirms a jank issue on that specific element
- Remove it after the performance issue is resolved — it is not meant to be permanent

### 34. Clip and Shape With `clip-path` / `rounded-*`, Not Overflow Hacks
- Avoid using `overflow-hidden` on a parent to fake rounded corners on a child image — use `rounded-*` directly on the `<img>` or use `overflow-hidden rounded-*` together intentionally
- For non-rectangular shapes use `clip-path` via an arbitrary value or CSS var — not a maze of `overflow-hidden` wrappers
- Always check that `overflow-hidden` used for rounding doesn't silently break sticky/fixed children inside

### 35. Dark Mode Must Be Systematic, Not Patched
- Never add `dark:` variants one-off to fix a specific element — dark mode must follow the token system
- Every color used must have a corresponding `dark:` value if the project supports dark mode
- If a new color token is created (Rule 3), its dark mode variant must also be defined in the same `:root [class~="dark"] {}` or `@media (prefers-color-scheme: dark)` block
- Audit: if `dark:` appears on fewer than 20% of color-bearing elements in a component, it is likely incomplete

### 36. Text Must Always Be Readable — Contrast is Non-Negotiable
- Never place `text-muted-foreground` on a `bg-muted` background without checking contrast — muted-on-muted often fails WCAG AA (4.5:1 ratio)
- Decorative text (labels, captions) minimum: **3:1** contrast ratio
- Body text minimum: **4.5:1** contrast ratio
- Interactive elements minimum: **3:1** contrast ratio
- Flag any `text-*` + `bg-*` combination that uses low-contrast pairings like `text-gray-400 bg-gray-200`

### 37. Avoid Layout Thrash From Mixed Sizing Units
- Never mix `rem`-based Tailwind spacing with arbitrary `px` values on the same axis in the same component
- Example violation: `pt-8 pb-[32px]` — `pt-8` is `2rem` (32px at default) but arbitrary px doesn't scale with root font size
- Be consistent: if using Tailwind scale, use it everywhere. If a pixel value is truly needed, define it as a CSS variable

### 38. Container Queries Over Breakpoints for Reusable Components
- Components that appear in multiple layout contexts (sidebar, main, modal) should not use viewport breakpoints like `md:flex`
- A component inside a narrow sidebar will never hit `md:` even on a large screen
- Use `@container` queries (`@container (min-width: 400px)`) so the component responds to its own container size
- Tailwind supports container queries via the `@tailwindcss/container-queries` plugin or native in v4

### 39. Scroll Behavior and Overscroll Must Be Set at the Right Level
- Set `scroll-smooth` on `<html>` for smooth anchor navigation, not on every scrollable div
- Set `overscroll-none` on inner scroll containers to prevent the page from scrolling when the inner scroll hits its boundary (scroll chaining)
- Never leave inner scroll containers without `overscroll-contain` — accidental page scroll on inner scroll is a poor UX

### 40. Print Styles Must Not Be an Afterthought
- Any page that users might print (invoices, reports, tickets) must have `print:` variants
- Common print rules: `print:hidden` for navbars/sidebars, `print:block` for hidden-but-printable content, `print:text-black print:bg-white` to override dark themes
- Flag any component in a "printable" page context that has no `print:` consideration

---

## Audit Procedure

When triggered, perform the following steps:

1. **Identify modified files** — Check which CSS/component files were changed
2. **Scan for violations** using Grep:
   - `style={{` or `style="` → inline styles
   - `\[#[0-9a-fA-F]{3,6}\]` → arbitrary hex colors
   - `\[rgba\(` or `\[rgb\(` → arbitrary rgb colors
   - `\[\d+px\]` → arbitrary pixel values (flag if equivalent Tailwind class exists)
   - `px-[5-9]\d` or `py-[5-9]\d` → extreme padding (scale check)
   - `absolute` or `fixed` → verify it is a genuine overlay use case, not a layout hack
   - `h-screen` on page containers → should usually be `min-h-screen`
   - `opacity-0` without `pointer-events-none` → hidden but still interactive
   - `focus:` without `focus-visible:` → fires on mouse click, bad UX
   - `z-\[\d+\]` → arbitrary z-index, must use documented scale
   - `float-left` or `float-right` → replace with flex/grid
   - `transition-all` → replace with specific transition utility
   - `overflow-hidden` → verify it is intentional, not a layout hack
   - `overflow-scroll` → should usually be `overflow-auto`
   - `space-x-` or `space-y-` with conditionally rendered children → use `gap-*` instead
   - `fixed top-0` navbar without matching `pt-*` on page content → content slides under navbar
   - `fixed left-0` sidebar with hardcoded `ml-*` on main content → use grid/flex instead
   - `will-change` used broadly → only for proven jank, remove after fix
   - `transition-all` → replace with specific property
   - `dark:` applied to fewer than 20% of color elements in a component → incomplete dark mode
   - `text-gray-400 bg-gray-200` or similar low-contrast pairs → contrast violation
3. **Check CSS variables** — Search `:root` blocks for existing tokens before suggesting new ones
4. **Report violations** — List each violation with file path, line number, and suggested fix
5. **Apply fixes** — Only fix what is clear-cut and safe. Flag ambiguous cases for human review.

---

## Output Format

```
## Tailwind CSS Audit Report

### Violations Found: N

#### [VIOLATION TYPE] — file/path/Component.tsx:42
**Found:** `style={{ color: '#3B82F6' }}`
**Fix:** Use `text-primary` (existing CSS variable: `--color-primary`)

#### [VIOLATION TYPE] — file/path/Layout.tsx:17
**Found:** `className="px-[92px]"`
**Fix:** Use `px-24` (96px, closest standard value) or `px-20` (80px)

### No Issues Found ✓
(when clean)
```

---

## What This Agent Does NOT Do
- Does not modify `tailwind.config.*` theme extensions without explicit instruction
- Does not delete CSS files or restructure component architecture
- Does not enforce opinionated design decisions beyond Tailwind's own scale
- Does not auto-fix if the correct replacement is ambiguous — flags for human review instead
