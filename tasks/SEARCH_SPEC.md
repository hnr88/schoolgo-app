# SchoolGo Search — Dev Spec

**Last updated:** 11 May 2026  
**Wireframe files:** `wireframe_basic_search.html`, `wireframe_advanced_search.html`  
**Related configs:** `basic_search_config.json`, `advanced_search_config.json` *(note: this spec supersedes the JSON configs where they differ)*

---

## Overview

SchoolGo search has two modes sharing the same page layout (map + sidebar + results panel). The difference is what's unlocked.

**Basic search** — anonymous, no login. Visible on the landing page. Parents can search, filter, and compare up to 3 schools.

**Advanced search** — requires login. All filters unlocked. Agents and registered parents can save searches, bookmark schools, and compare up to 4.

---

## Page layout

Three-zone layout, persistent across both modes:

**Top bar:** Search input + annual fee slider + quick-filter chips. Advanced adds "Saved searches" and "Save search" buttons.

**Left sidebar:** Collapsible filter groups using chips, toggles, sliders, and steppers. No dropdowns anywhere.

**Main area:** Map of Australia with clustered school pins. Floating results panel (scrollable school cards) overlays the right side of the map.

---

## Top bar

### Search input
Free-text search by school name, city, or suburb. Autocomplete suggested. Available on both basic and advanced.

### Annual fee slider
Dual-handle range slider. Range: $5,000 – $60,000+ AUD. Compares against the tuition column matching the selected school level. If multiple levels are selected, uses the lowest tuition across those levels. Available on both basic and advanced.

### Quick-filter chips
Tap to toggle. Order: **Boys, Girls, Co-ed, Primary, Secondary, Boarding**. These are shortcuts that mirror sidebar filters (Gender, School Level, Accommodation) — toggling a chip should update the corresponding sidebar filter and vice versa.

### Save tools (advanced only)
"Saved searches" button opens a dropdown of previously saved filter configurations with name, date saved, and result count. "Save search" button saves the current filter state with a user-defined name.

---

## Sidebar filter groups

All filters use one of four input patterns — no dropdowns:

- **Chips:** Tappable pills for bounded option sets. Tap to select, tap again to deselect. Multi-select unless noted. Selected state gets a coloured fill.
- **Toggles:** Yes/no switches for boolean filters.
- **Sliders:** Range sliders for continuous values. Show current value as a readout.
- **Steppers:** Plus/minus buttons flanking a number for single precise values.

### Group 1: Location
*Open for both basic and advanced.*

| Filter | Type | Options |
|--------|------|---------|
| State / territory | Chips (multi-select) | QLD, NSW, VIC, SA, WA, TAS, NT, ACT |
| Suburb / postcode | Text input with autocomplete | Free text |

### Group 2: School profile
*Open for both basic and advanced.*

| Filter | Type | Options | Notes |
|--------|------|---------|-------|
| Sector | Chips (multi-select) | Government, Non-government, **Catholic** | Catholic is its own sector pill — not under religious affiliation |
| Accommodation | Chips (multi-select) | Boarding, Homestay, Both, None | |
| Religious affiliation | Chips (multi-select) | Non-denom., Anglican, Baptist, Lutheran, Uniting Church, Presbyterian, Islamic | "Show all (14)" expands to include: Jewish, Buddhist, Coptic Orthodox, Greek Orthodox, Seventh-day Adventist, Quaker, Interdenominational Christian |

### Group 3: Enrolment and entry
*Basic: entry year level and student age are open. Entry term is locked. Advanced: fully open.*

| Filter | Type | Options | Notes |
|--------|------|---------|-------|
| Entry year level | Chips (multi-select) | Gr 4, Gr 5, Gr 6, Yr 7, Yr 8, Yr 9, Yr 10, Yr 11, Yr 12 | |
| Student age | Stepper (single value) | Range: 4–20 | Checks against CRICOS age range. Show soft mismatch hint if age doesn't align with selected year level (e.g. "Most 14-year-olds enter Year 8 or 9 — showing all results for your selection") |
| Entry term | Chips (multi-select) | Term 1, Term 2, Term 3, Term 4 | **Locked on basic** |

### Group 4: Academic
*Basic: program type is locked. ATAR and English language support toggles are open. Advanced: fully open.*

| Filter | Type | Options | Notes |
|--------|------|---------|-------|
| Program type | Chips (multi-select) | Australian Cert., IB, ELICOS | **Locked on basic.** Each chip has an info tooltip (see below) |
| ATAR available | Toggle | On/off | Info tooltip: "Australian Tertiary Admission Rank — the score used for university entry in Australia" |
| English language support | Toggle | On/off | Renamed from "ESL Support" |

**Info tooltips (hover/tap on "i" icon):**

- Australian Cert.: "The standard Australian senior secondary certificate — VCE (VIC), HSC (NSW), QCE (QLD), etc."
- IB: "International Baccalaureate — a globally recognised program accepted by universities worldwide"
- ELICOS: "English Language Intensive Courses for Overseas Students — intensive English preparation before starting mainstream school"
- ATAR: "Australian Tertiary Admission Rank — the score used for university entry in Australia"

### Group 5: English test scores
*Locked on basic. Open on advanced.*

| Filter | Type | Options | Notes |
|--------|------|---------|-------|
| Test selector | Chips (single-select) | AEAS, iDAT, Duolingo, IELTS, PTE, Cambridge | Tapping a test chip reveals the score input below |
| Score input | Number input | Depends on selected test | Shows schools where minimum accepted score is equal to or below the entered score |

**Score validation by test:**

| Test | Min | Max | Step |
|------|-----|-----|------|
| AEAS | 1 | 80 | 1 |
| iDAT | 1 | 100 | 1 |
| Duolingo (DET) | 10 | 160 | 5 |
| IELTS | 1.0 | 9.0 | 0.5 |
| PTE Academic | 10 | 90 | 1 |
| Cambridge | 100 | 230 | 1 |

---

## Lock strategy (basic / anonymous)

| Filter | Basic state |
|--------|------------|
| Location (all) | Open |
| School profile (all) | Open |
| Entry year level | Open |
| Student age | Open |
| Entry term | Locked |
| Program type | Locked |
| ATAR toggle | Open |
| English language support toggle | Open |
| English test scores (all) | Locked |

Locked filters show a translucent overlay with a brief description of what's behind the lock and a "Create free account" CTA button linking to `/register`.

---

## School tile (result card)

Cards appear in the floating results panel. The entire card is clickable — tapping navigates to the school's dedicated page.

### Fields shown on every card

| Field | Display |
|-------|---------|
| School photo | Card header image |
| School name | Title |
| Suburb, State | Subtitle |
| Enrolment status | Coloured badge: Open (#22C55E green), Limited places (#F59E0B amber), Waitlist only (#EF4444 red), Closed (#9CA3AF grey) |
| Sector | Badge: Government (blue), Non-government (purple), Catholic (purple) |
| Curriculum | Badge showing curriculum code(s): VCE, QCE, IB, HSC, etc. If multiple, combine: "QCE / IB" |
| Accommodation | Badge: Boarding, Homestay, Both |
| Annual tuition | "From $X / year" — show lowest tuition across offered levels |
| "View school" link | Text link with arrow, reinforcing clickability |

### Card actions (advanced only)

| Action | Icon | Behaviour |
|--------|------|-----------|
| Bookmark | Heart (outline/filled) | Saves school to user's bookmarked list |
| Compare checkbox | Checkbox/tick | Adds school to compare bar (max 4) |

On basic, the heart icon is present but tapping it prompts signup.

---

## Compare feature

| | Basic | Advanced |
|---|-------|---------|
| Max schools | 3 | 4 |
| Trigger | Select schools via card interaction | Select via checkbox on card |
| UI | Sticky bottom bar with school name pills and "Compare" button | Same |
| Compare view | Side-by-side table (navigates to `/compare`) | Same, with more fields |

---

## Sort options

Results can be sorted via a dropdown/control in the results panel header.

**Basic:** School name (A–Z), Tuition low–high, Tuition high–low, State.

**Advanced:** All basic options plus: Name (Z–A), Enrolment status (open first), Application deadline (soonest), School size (small–large and reverse), International % (low–high and reverse).

---

## Removed from original spec

The following were removed during workshopping and should NOT be built:

- Distance to CBD filter
- Map radius search
- Enrolment status as a sidebar filter (shown on tile instead)
- Curriculum as a sidebar filter (shown on tile instead)
- Languages taught filter
- Scholarships filter and badge
- School size filter group
- Expandable detail panel on school cards (detail lives on school page)
- Table view and Map view toggles on the results panel (results are always cards in the overlay panel; the map IS the main view)
