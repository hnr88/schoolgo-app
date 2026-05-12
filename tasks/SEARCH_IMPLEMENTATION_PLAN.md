# SchoolGo Search — Frontend Implementation Plan

**Source of truth:** `tasks/SEARCH_SPEC.md`
**Backend contract:** `tasks/BACKEND_SEARCH_CHANGES.md`
**Wireframes:** `tasks/wireframe_basic_search.html`, `tasks/wireframe_advanced_search.html`
**Module root:** `src/modules/school-search/`
**Pages:** `/search`, `/parent/search`, `/agent/search`, `/agent/(protected)/dashboard/search`, `/school/search`

---

## 1. Scope & Non-Goals

### In scope (this iteration)
- New store shape matching the spec's filter set.
- Top bar: search input, annual fee dual slider (synced with sidebar), quick-filter chips (Boys, Girls, Co-ed, Primary, Secondary, Boarding).
- Sidebar Groups 1–5 (Location, School profile, Enrolment & entry, Academic, English test scores) using only chips/toggles/sliders/steppers (no dropdowns).
- Lock-strategy overlays on basic for: Entry term, Program type, English test scores. CTA links to `/register`.
- Student-age stepper with CRICOS soft-mismatch hint.
- Tile card with all spec badges (enrolment status, sector, curriculum, accommodation, "From $X / year"), heart + compare checkbox (advanced).
- Sticky compare bar (basic max 3 / advanced max 4) — bar UI only, no compare page.
- Sort dropdown (4 options basic, 9 advanced).
- Typed mock API layer so frontend ships before backend.
- Cleanup of removed concepts (scholarships, curriculum sidebar filter, map-radius).

### Explicitly OUT of scope (deferred)
- Saved searches (CRUD + dropdown UI) — needs auth + `/api/saved-searches`.
- Bookmarks list page — heart toggles state only this round.
- `/compare` destination page — only the sticky bar + selection state ship now.
- Suburb / postcode autocomplete (needs `/api/autocomplete/suburbs`). Text input renders, no autocomplete dropdown.
- School-name autocomplete (needs `/api/autocomplete/schools`).
- Advanced sort options that require new backend fields (`application-deadline-asc`, `school-size-*`, `international-pct-*`) — ship the UI chips disabled with backend-pending tooltip OR omit until backend lands. **DECISION NEEDED** (see §7).
- Server-side map clustering — keep current client-side rendering until backend confirms Option A/B.

### Removed (must delete during cleanup, see slices 12–13)
- Distance to CBD, map radius search, enrolment-status sidebar filter, curriculum sidebar filter, languages-taught filter, scholarships filter/badge, school-size filter group, expandable card detail panel, table/map view toggles.

---

## 2. Vertical Slices

Each slice cuts store > schema > component > page wiring > test in one thin pass. Each is independently shippable behind the existing route.

### Slice 1 — Store, schema & types refactor
- **What ships:** Single typed store + Zod request schema reflecting the full spec filter set. App still renders (old components read from compat selectors that map to new fields).
- **Files:**
  - `src/modules/school-search/stores/use-school-search-store.ts` (rewrite)
  - `src/modules/school-search/schemas/search-request.schema.ts` (rewrite)
  - `src/modules/school-search/types/search-api.types.ts` (extend `SchoolHit` per backend §2)
  - `src/modules/school-search/types/filter.types.ts` (new — enums for sector/accommodation/religion/yearLevel/term/programType/test)
  - `src/modules/school-search/constants/filter-options.constants.ts` (new — labelled option lists for all chip groups)
  - `src/modules/school-search/lib/map-filters-to-request.ts` (update)
- **Depends on:** none
- **Acceptance:**
  - `pnpm tsc --noEmit` passes with the new types.
  - Store exposes: `q, states, suburb, postcode, sectors[], accommodation[], religiousAffiliations[], entryYearLevels[], studentAge, entryTerms[], programTypes[], atarAvailable, englishLanguageSupport, englishTest{type,score}, feeMin, feeMax, sortBy, quickChips[], compareList[], bookmarks[]`.
  - Old fields (`priceMin/Max`, `curricula`, `englishTests`, `mapBounds.radiusKm`, `scholarships`) are gone.
- **Subagent:** `logic-extractor`

### Slice 2 — Mock API + query layer + route handler contract
- **What ships:** Frontend can call `useSchoolSearchQuery` and get realistic typed `SchoolHit[]` matching backend §2. Switch is one env flag / boolean from real backend.
- **Files:**
  - `src/modules/school-search/lib/mock-search-response.ts` (new — fixtures: ~20 schools across states/sectors/curricula/enrolment statuses)
  - `src/modules/school-search/lib/search-api.ts` (update — `POST /api/search/schools` with new body; falls back to mock when `NEXT_PUBLIC_SEARCH_MOCK=1` OR backend 404s)
  - `src/modules/school-search/queries/use-school-search.query.ts` (update keys + selectors)
  - `src/app/api/search/schools/route.ts` (rewrite to validate new request schema and proxy; returns mock when backend not yet shipped)
  - `src/modules/school-search/lib/filter-mock-hits.ts` (new — applies request filters to mock array for realistic dev UX)
- **Depends on:** 1
- **Acceptance:**
  - Mock returns ≥20 hits, all with `enrolmentStatus`, `sector`, `curriculumCodes[]`, `accommodation`, `annualTuitionFrom`, `lat/lng`.
  - Filtering by state/sector/fee in the store visibly reduces results.
  - Backend cutover = flip env flag; no component changes required.
- **Subagent:** `nextjs-api-routes`

### Slice 3 — Reusable `FilterChipGroup` + locked-overlay primitives
- **What ships:** Two primitives every later slice consumes. No user-visible change yet.
- **Files:**
  - `src/modules/school-search/components/filters/FilterChipGroup.tsx` (new — props: `options, value, onChange, multi, ariaLabel`; max 120 lines)
  - `src/modules/school-search/components/filters/FilterGroup.tsx` (new — collapsible group shell with title + slot)
  - `src/modules/school-search/components/filters/LockedOverlay.tsx` (new — translucent overlay + description + "Create free account" CTA → `/register`)
  - `src/modules/school-search/components/filters/InfoTooltip.tsx` (new — wraps shadcn Tooltip, exposes `<InfoTooltip content={t(...)} />`)
  - `src/i18n/messages/en.json` + locale siblings (new keys under `schoolSearch.filters.*`)
- **Depends on:** 1
- **Acceptance:**
  - `FilterChipGroup` supports single-select and multi-select via `multi` prop.
  - `LockedOverlay` renders over any child via `<LockedOverlay locked={!isAuthed}>{children}</LockedOverlay>` pattern (pointer-events:none on children, focusable CTA on overlay).
  - All strings come from `useTranslations('schoolSearch.filters')`.
- **Subagent:** `component-architect`

### Slice 4 — Group 1: Location (state chips + suburb text input)
- **What ships:** Refactored state chips using `FilterChipGroup`; new suburb/postcode text input (no autocomplete this round — input only; updates `suburb`/`postcode` on commit).
- **Files:**
  - `src/modules/school-search/components/filters/LocationFilterGroup.tsx` (new)
  - `src/modules/school-search/components/FilterSidebar.tsx` (replace internal state-chip JSX with new group)
  - `src/modules/school-search/hooks/useStateFilterMapSync.ts` (update to new selector)
- **Depends on:** 1, 3
- **Acceptance:**
  - All 8 AU states present, multi-select.
  - Typing in suburb input + blur/enter updates store.
  - Map state-filter sync still works.
- **Subagent:** `component-architect`

### Slice 5 — Group 2: School profile (sector + accommodation + religious affiliation w/ Show all)
- **What ships:** Three chip groups; religious affiliation collapses to 7 items + "Show all (14)" expansion.
- **Files:**
  - `src/modules/school-search/components/filters/SchoolProfileFilterGroup.tsx` (new)
  - `src/modules/school-search/components/filters/ReligiousAffiliationChips.tsx` (new — handles 7→14 expand)
  - `src/modules/school-search/components/FilterSidebar.tsx` (mount new group)
- **Depends on:** 1, 3
- **Acceptance:**
  - Sector includes "Catholic" as its own pill (not under religion).
  - Affiliation shows 7, "Show all (14)" reveals remaining 7.
  - All three groups multi-select.
- **Subagent:** `component-architect`

### Slice 6 — Group 3: Enrolment & entry (year level chips + age stepper w/ CRICOS hint + entry term locked)
- **What ships:** Year-level chips, age stepper (range 4–20), entry-term chips locked on basic.
- **Files:**
  - `src/modules/school-search/components/filters/EnrolmentFilterGroup.tsx` (new)
  - `src/modules/school-search/components/filters/Stepper.tsx` (new — generic, min/max/step props; max 100 lines)
  - `src/modules/school-search/components/filters/CricosAgeHint.tsx` (new — reads selected year levels + studentAge + `cricosAgeRange` from current hits, renders soft hint string)
  - `src/modules/school-search/lib/cricos-age-hint.ts` (new — pure fn: `getAgeHint(age, yearLevels) -> string | null`)
- **Depends on:** 1, 3
- **Acceptance:**
  - Stepper enforces 4–20.
  - Hint appears when age and year-level mismatch (e.g. age 14 + Yr 11 selected).
  - Entry term chips render under `<LockedOverlay locked={!isAuthed}>` on basic.
- **Subagent:** `component-architect`

### Slice 7 — Group 4: Academic (program type locked + ATAR + English language support + info tooltips)
- **What ships:** Program type chips (locked on basic), ATAR toggle, English language support toggle, all with info tooltips.
- **Files:**
  - `src/modules/school-search/components/filters/AcademicFilterGroup.tsx` (new)
  - `src/modules/school-search/components/filters/InfoTooltipContent.tsx` (new — copy bank keyed by tooltip id, fed from i18n)
  - `src/i18n/messages/en.json` (new keys under `schoolSearch.tooltips.*`)
- **Depends on:** 1, 3
- **Acceptance:**
  - Program-type group locked under overlay on basic.
  - ATAR/English toggles use shadcn `Switch` (wrapped in module).
  - Tooltip text matches spec verbatim for AustralianCert, IB, ELICOS, ATAR.
- **Subagent:** `component-architect`

### Slice 8 — Group 5: English test scores (locked on basic, single-select test + score input)
- **What ships:** Single-select test chip group; tapping a chip reveals a score input with per-test min/max/step. Whole group locked on basic.
- **Files:**
  - `src/modules/school-search/components/filters/EnglishTestFilterGroup.tsx` (new)
  - `src/modules/school-search/components/filters/TestScoreInput.tsx` (new — number input bound to selected test config)
  - `src/modules/school-search/constants/english-test-config.constants.ts` (new — `{ aeas:{min:1,max:80,step:1}, ... }` per spec)
- **Depends on:** 1, 3
- **Acceptance:**
  - Selecting a test reveals the matching-validation input.
  - Switching tests resets the score.
  - Locked overlay on basic.
- **Subagent:** `form-master`

### Slice 9 — Top bar: search input + annual fee slider + quick-filter chips
- **What ships:** New top bar with all three controls; quick chips bidirectionally synced to sidebar groups (gender chips drive a new `gender[]`-like derived selector; level chips drive `entryYearLevels` subset Primary={gr4..gr6} / Secondary={yr7..yr12}; Boarding drives accommodation).
- **Files:**
  - `src/modules/school-search/components/topbar/SearchTopBar.tsx` (new — replaces current `SearchBar` parent layout in `SearchLayout`)
  - `src/modules/school-search/components/topbar/AnnualFeeSlider.tsx` (new — shadcn `Slider` wrapped; $5k–$60k+, dual handle; reads/writes `feeMin/feeMax` in store)
  - `src/modules/school-search/components/topbar/QuickFilterChips.tsx` (new — Boys/Girls/Co-ed/Primary/Secondary/Boarding)
  - `src/modules/school-search/components/SearchBar.tsx` (slim down — input only)
  - `src/modules/school-search/components/SearchLayout.tsx` (mount top bar)
  - `src/modules/school-search/hooks/useQuickChipSync.ts` (new — bidirectional store sync)
  - `src/modules/school-search/lib/year-level-buckets.ts` (new — `PRIMARY_LEVELS`, `SECONDARY_LEVELS`)
- **Depends on:** 1, 3 (chip primitive)
- **Acceptance:**
  - Selecting "Boarding" chip flips `accommodation` to include `boarding`; deselecting reverts.
  - Annual fee slider in top bar shows the same min/max as the (removed/legacy) sidebar slider — top bar becomes the only annual-fee control. Reading/writing only via store.
  - Quick chip "Primary" selects gr4/gr5/gr6 in sidebar Year Level group simultaneously.
- **Subagent:** `component-architect`

### Slice 10 — Tile card v2 (badges, status colours, "From $X / year", heart, compare checkbox)
- **What ships:** New `SchoolCard` matching spec. Heart + compare checkbox visible only when `isAuthed`. Heart on basic shows signup prompt.
- **Files:**
  - `src/modules/school-search/components/SchoolCard.tsx` (rewrite, ≤120 lines)
  - `src/modules/school-search/components/cards/EnrolmentStatusBadge.tsx` (new — green/amber/red/grey per spec hex)
  - `src/modules/school-search/components/cards/SectorBadge.tsx` (new — blue/purple)
  - `src/modules/school-search/components/cards/CurriculumBadge.tsx` (new — combines codes with "/")
  - `src/modules/school-search/components/cards/AccommodationBadge.tsx` (new)
  - `src/modules/school-search/components/cards/CardActions.tsx` (new — heart + compare checkbox)
  - `src/modules/school-search/lib/format-currency.ts` (extend — "From $X / year" format)
  - `src/modules/school-search/constants/school-card.constants.ts` (extend — `ENROLMENT_STATUS_COLORS`)
- **Depends on:** 1, 2 (needs mock hits with new fields)
- **Acceptance:**
  - All four badges render on the mock fixture cards.
  - On basic, heart click triggers signup-prompt dialog (existing `SearchLoginPrompt`).
  - On advanced, heart toggles `bookmarks[]` in store; compare checkbox toggles `compareList[]` (capped 4).
- **Subagent:** `component-architect`

### Slice 11 — Sort dropdown + sticky compare bar
- **What ships:** Sort control above results panel (4 basic, 9 advanced); sticky compare bar bottom when `compareList.length > 0`.
- **Files:**
  - `src/modules/school-search/components/results/SortControl.tsx` (new — chip-style toggle list, NOT a `<select>`; respects "no dropdowns" rule by using a popover-of-chips OR an inline horizontal chip strip — **DECISION NEEDED** see §7)
  - `src/modules/school-search/components/CompareBar.tsx` (new — sticky bottom; pills with school name + remove; "Compare" button; cap 3 basic / 4 advanced)
  - `src/modules/school-search/components/SchoolResultsPanel.tsx` (mount `SortControl` in header; read sortBy from store)
  - `src/modules/school-search/components/SearchLayout.tsx` (mount `CompareBar`)
  - `src/modules/school-search/constants/sort-options.constants.ts` (new — basic[] + advanced[])
- **Depends on:** 1, 10
- **Acceptance:**
  - Basic users only see 4 sort options.
  - Compare bar appears once any card is checked; "Compare" button links to `/compare?ids=...` (target page deferred — link only).
  - Cap enforcement: 4th add on advanced is a no-op + toast.
- **Subagent:** `component-architect`

### Slice 12 — Cleanup: remove scholarships chip, curriculum sidebar filter, map radius
- **What ships:** Dead code removed. No user-visible regressions.
- **Files (delete or strip):**
  - `src/modules/school-search/components/FilterChips.tsx` (remove `topRated/boarding/coed/scholarships/openDays` set — gone, since replaced by top-bar quick chips in slice 9; or delete file entirely)
  - `src/modules/school-search/components/FilterSidebar.tsx` (strip curriculum sub-section + any remaining price slider)
  - `src/modules/school-search/hooks/useGeocodeSearch.ts` (drop `radiusKm` usage)
  - `src/modules/school-search/lib/map-filters-to-request.ts` (drop `location.radiusKm`)
  - `src/modules/school-search/stores/use-school-search-store.ts` (verify legacy fields removed — done in slice 1, this is a sweep)
- **Depends on:** 4, 5, 6, 7, 8, 9 (all replacements live)
- **Acceptance:**
  - Search for "scholarships", "topRated", "openDays", "curricula", "radiusKm" in module returns zero references.
  - `pnpm tsc --noEmit` + `pnpm lint` clean.
- **Subagent:** `logic-extractor`

### Slice 13 — i18n sync + page wiring sweep
- **What ships:** All new copy keys mirrored to every locale file (placeholder English fallback acceptable); five `*/search/page.tsx` entrypoints render the new `SearchPageContent` cleanly.
- **Files:**
  - `src/i18n/messages/*.json` (mirror every new `schoolSearch.*` key added across slices 3–11)
  - `src/app/[locale]/search/page.tsx`
  - `src/app/[locale]/parent/search/page.tsx`
  - `src/app/[locale]/agent/search/page.tsx`
  - `src/app/[locale]/agent/(protected)/dashboard/search/page.tsx`
  - `src/app/[locale]/school/search/page.tsx`
- **Depends on:** 3, 4, 5, 6, 7, 8, 9, 10, 11
- **Acceptance:**
  - No hardcoded user-facing strings in module (`grep -rn '"[A-Z][a-z].*"' src/modules/school-search/components` only matches keys/test ids).
  - All 5 pages render identical layout with appropriate `isAuthed` flag.
- **Subagent:** `i18n-sync`

### Slice 14 — Tests + a11y pass
- **What ships:** Unit tests for store reducers, `cricos-age-hint`, `filter-mock-hits`; RTL tests for `FilterChipGroup`, `LockedOverlay`, `CompareBar` cap behaviour; one Playwright happy-path E2E.
- **Files:**
  - `tests/unit/school-search/store.test.ts`
  - `tests/unit/school-search/cricos-age-hint.test.ts`
  - `tests/unit/school-search/filter-mock-hits.test.ts`
  - `tests/unit/school-search/filter-chip-group.test.tsx`
  - `tests/unit/school-search/locked-overlay.test.tsx`
  - `tests/unit/school-search/compare-bar.test.tsx`
  - `tests/e2e/search-basic-happy-path.spec.ts`
- **Depends on:** 1, 3, 6, 10, 11 (need primitives + interactions stable)
- **Acceptance:**
  - `pnpm test --run` green.
  - E2E covers: load `/search`, type query, toggle a sector chip, see filtered results, add 2 cards to compare, see sticky bar.
  - All interactive controls keyboard-reachable; locked overlays announce status to AT.
- **Subagent:** `testing-expert`

---

## 3. Task DAG & parallelism

```
                       ┌─────────────────────┐
                       │ 1 store/schema/types│
                       └──────────┬──────────┘
                                  │
                ┌─────────────────┼──────────────────┐
                ▼                 ▼                  ▼
        ┌─────────────┐   ┌──────────────┐
        │ 2 mock API  │   │ 3 primitives │
        │   + route   │   │ (chips/over- │
        └──────┬──────┘   │  lay/tooltip)│
               │          └──────┬───────┘
               │                 │
               │   ┌─────────────┼──────────────┬──────────┬──────────┐
               │   ▼             ▼              ▼          ▼          ▼
               │  ┌────┐       ┌────┐         ┌────┐    ┌────┐     ┌────┐
               │  │ 4  │       │ 5  │         │ 6  │    │ 7  │     │ 8  │
               │  │Loc │       │Prof│         │Entry│   │Acad│     │Test│
               │  └─┬──┘       └─┬──┘         └─┬──┘    └─┬──┘     └─┬──┘
               │    │            │              │         │          │
               │    └────────────┴──────┬───────┴─────────┴──────────┘
               │                        ▼
               │                  ┌──────────┐
               │                  │ 9 top bar│
               │                  └────┬─────┘
               ▼                       │
        ┌────────────┐                 │
        │ 10 tile v2 │◀────────────────┘
        └─────┬──────┘
              │
              ▼
        ┌────────────┐
        │ 11 sort +  │
        │ compare bar│
        └─────┬──────┘
              │
              ▼
        ┌────────────┐      ┌────────────┐
        │ 12 cleanup │      │ 13 i18n +  │
        │            │      │ page wiring│
        └─────┬──────┘      └─────┬──────┘
              └──────────┬────────┘
                         ▼
                   ┌──────────┐
                   │ 14 tests │
                   └──────────┘
```

### Parallelization matrix

| Wave | Slices that can run in parallel | Why |
|---|---|---|
| Wave A | **1** | Foundation. Everything blocks on it. |
| Wave B | **2, 3** | Independent file sets (api/route vs filter primitives). |
| Wave C | **4, 5, 6, 7, 8** | Each touches its own `*FilterGroup.tsx` + small `FilterSidebar.tsx` mount line. Coordinate `FilterSidebar.tsx` edits via merge order or assign one author the integration after parallel work. |
| Wave D | **9, 10** | Top bar vs tile card — disjoint files. |
| Wave E | **11** | Needs 10 (compare checkbox depends on card actions). |
| Wave F | **12, 13** | Cleanup + i18n. Disjoint. |
| Wave G | **14** | Tests. |

Up to **5 parallel subagents safely** in Wave C; **2 in Wave B and D**. Total ~14 slices fits within a ~12-parallel-agent budget across waves.

**Coordination risk:** `FilterSidebar.tsx` is touched by slices 4, 5, 6, 7, 8, 12. Mitigation: slice 1 lands a stub `FilterSidebar.tsx` with empty `<slot>` mounts and TODOs per group, then each wave-C slice fills exactly one slot — no merge conflicts.

---

## 4. Mocking strategy

**Goal:** frontend ships and runs end-to-end before backend changes land.

- New typed `SchoolHit[]` fixture in `src/modules/school-search/lib/mock-search-response.ts`. ~20 hand-authored schools spread across 8 states, 3 sectors, all 4 enrolment statuses, multi-curriculum examples (QCE + IB), all 4 accommodation values.
- `src/modules/school-search/lib/filter-mock-hits.ts` applies the same request shape the backend will accept (states, sectors, accommodation, religiousAffiliations, fee range, q, entryYearLevels) to the fixture array. Returns a `{ hits, total, page, pageSize }` envelope identical to backend §2.
- `src/app/api/search/schools/route.ts` reads `process.env.SEARCH_BACKEND_MODE`:
  - `mock` (default during dev): runs `filterMockHits` and returns.
  - `proxy`: forwards new-shape body to `${NEXT_PUBLIC_API_URL}/api/search/schools`.
- TanStack Query layer (`use-school-search.query.ts`) is mode-agnostic — both modes return the same envelope.

**Cutover when backend lands:** flip `SEARCH_BACKEND_MODE=proxy` in staging env. No component changes required. Delete `mock-search-response.ts` + `filter-mock-hits.ts` in a follow-up commit once parity is verified.

**Autocomplete:** stays disabled until backend endpoints exist; text input commits on blur/enter. Schedule a follow-up slice once `/api/autocomplete/{schools,suburbs}` ship.

---

## 5. Cleanup slices (explicit)

Already enumerated as slice 12; restating for visibility:

- Delete `scholarships`, `topRated`, `openDays` quick chips and store fields.
- Delete `curricula` sidebar filter + store field — curriculum lives on tile only.
- Delete `mapBounds.radiusKm` from store, hook, and request mapper.
- Rename `englishTests` → `englishLanguageSupport` everywhere; move out of "English test scores" group and into Academic.
- Delete `FilterChips.tsx` if fully replaced by `QuickFilterChips`.

Verification: `grep -RIn -e 'scholarship' -e 'radiusKm' -e 'topRated' -e 'openDays' -e 'englishTests' src/modules/school-search` returns zero.

---

## 6. Out of scope this iteration (deferred follow-ups)

| Deferred | Why deferred | Future slice |
|---|---|---|
| Saved searches CRUD UI | Needs `/api/saved-searches` + auth integration. | F1 |
| Bookmarks list page | Heart toggles state only; persistence needs `/api/bookmarks`. | F2 |
| `/compare` page | Sticky bar links to it; page itself is a new module. | F3 |
| Suburb autocomplete | Needs `/api/autocomplete/suburbs` + AU postcode dataset. | F4 |
| School-name autocomplete | Needs `/api/autocomplete/schools`. | F5 |
| Advanced sorts (school size, intl %, deadline) | Backend fields not guaranteed. | F6 |
| Server-side map clustering | Backend §8 open question (Option A vs B). | F7 |

---

## 7. Open questions / decisions needed from user

1. **Locked filters: render-then-overlay vs placeholder?**
   Recommend: render the real chips/inputs but wrap in `<LockedOverlay>` so authed users see no layout shift on upgrade. Confirm.
2. **Sort control UI under the "no dropdowns" rule.**
   Spec §Sort options says "dropdown/control in the results panel header" — internally inconsistent with sidebar rule. Recommend: a popover trigger button that opens a chip list (single-select) so it behaves like a chip group but is visually compact. Approve?
3. **Advanced-sort options gated on backend fields.**
   Show all 9 advanced sorts now (UI-disable the 4 backend-blocked ones with a "coming soon" tooltip) OR ship 5 now and add 4 later? Recommend latter.
4. **Quick-chip "Boys / Girls / Co-ed".**
   Spec lists these as quick chips but Group 2 has no Gender filter. Does the store need a `gender[]` field, or do gender chips become a frontend-only filter applied to a school's `gender` data on the hit? Backend doc doesn't mention `gender` — needs answer (could be a missing backend field or a UI-only attribute).
5. **Compare bar destination.**
   `/compare?ids=...` link with a 404 destination this round — confirm acceptable. Alternative: hide the "Compare" button until the page exists.
6. **"From $X / year" semantics on the card when no year level is selected.**
   Backend §2 says lowest across offered levels — confirm display reads `annualTuitionFrom` straight from response and doesn't recompute client-side.
7. **CRICOS age-range source for the soft-mismatch hint.**
   Hint copy needs `cricosAgeRange` per school. `SchoolHit` in §2 does NOT include it (only the compare endpoint does). Either (a) backend adds `cricosAgeRange` to `SchoolHit`, or (b) hint is computed from a generic age↔year table client-side. Recommend (b) for v1.
8. **i18n locales to mirror.**
   Confirm which locales must be kept in lock-step (file list in `src/i18n/messages/`).

---

*End of plan — 14 slices, 7 waves, mock-first, backend-cutover via env flag.*
