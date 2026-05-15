# Parents Landing Page — Brainstorm Notes

## Navigation (top nav)

### Audience switcher (left side of nav)

**Parents** | **Agents** | **Schools**

- Each links to its own landing page (`/for-parents`, `/for-agents`, `/for-schools`)
- The current page's label is highlighted/active (acts as "you are here")
- Replaces the old "About" dropdown and the anchor links (`#how-it-works`, `#compare`, `#faq`)

### Dropdowns (right side of nav)

| Current | Proposed | Why |
|---------|----------|-----|
| **Explore** | **Find Schools** | "Find schools in Australia" is a high-intent search query. "Explore" has zero keyword value. |
| **Resources** | **Guides** | Shorter, clearer, matches how parents think. |
| **About** (dropdown) | Removed | Replaced by audience switcher above. |
| Anchor links (How it works, Compare, FAQ) | Removed | No SEO value, cluttered the nav. Page scrolls naturally. |

### Sub-link changes

**Find Schools dropdown:**
- Browse schools → Search all schools
- Compare schools → Compare schools (keep)
- School types → School types in Australia
- English tests → English test requirements

**Guides dropdown:**
- Admissions guide → How to choose a school
- School fees → Understanding school fees
- Visa requirements → Student visa guide
- All guides → All guides (keep)

### Moved to footer
- About SchoolGo
- Contact us

### Full nav layout
`[Logo] [Parents* | Agents | Schools] ———— [Find Schools ▾] [Guides ▾] [Sign in] [CTA button]`

*\* active/highlighted when on parent page*

---

## Hero

### Top badge
- Change "Government Registered · data from data.gov.au" → **"CRICOS Registered · data from data.gov.au"**
- Exception to the usual "no CRICOS on parent pages" rule — works here as an official credential stamp

### Copy — keep as-is
- **H1:** "Give your child the best *Australian* education."
- **Subhead:** "The right Australian school sets up the right university — and the right career. Search every registered K–12 school, compare fees, English tests, and boarding — in your language."
- **Search bar:** Keep — Where / Year level / Fees filters

### School tiles below search bar
Replace the current generic tiles with three prestigious schools:

1. **Sydney Grammar School** — Darlinghurst, NSW
2. **Melbourne Grammar School** — Melbourne, VIC
3. **Brisbane Grammar School** — Spring Hill, QLD

Three prestigious grammar schools across three states — reinforces the Australia-wide focus of the platform.

---

## Stats strip ("The numbers")

Keep as-is.

---

## How it works

Keep as-is.

---

## Trusted agents → "Get expert help"

### Current
- **Headline:** "Every school has agents who know it best."
- **Body:** "Don't rely on a single agent you haven't vetted. SchoolGo shows you which education agents each school actually works with — so you can choose someone with a track record at the schools you're considering."

### Proposed
- **Headline:** "Get expert help — free."
- **Body:** "Not sure where to start? Every school works with specialist education consultants who know their admissions process inside out. SchoolGo connects you with the right one — so you get expert guidance from choosing a school to submitting your application, at no cost to you."

---

## Side-by-side comparison

### Changes
- **Headline:** "Put **three** schools next to each other." (was five)
- Update the comparison table mock-up to show 3 schools (it already shows 3 in the current build, so the copy just needs to match)

---

## English proficiency

### Current
- **Headline:** "Pick a test. See which schools accept it — and the minimum scores."
- **CTA pill:** "See schools accepting this test"

### Proposed
- **Headline:** "Find out which English test the school requires — and the score your child needs to get in."
- **CTA pill:** "Check your school's English requirements"

---

## Seven languages

### Change
- Current body ends: "…seven languages spoken by families across Asia-Pacific."
- Change to: "…seven languages spoken by families across the world."

---

## Admissions library

Keep as-is.

---

## Trust & compliance

### Change
- Current subhead: "Data you can trust."
- Change to: **"Data you can trust — so you know you're looking at legitimate institutions and accurate information."**
- Four trust signal cards: keep as-is.

---

## FAQ

### Replace all current questions with SEO-targeted parent search queries:

1. **"How do I enrol my child in an Australian school from overseas?"**
2. **"How much does it cost to send my child to school in Australia?"**
3. **"What English test does my child need for an Australian school?"**
4. **"Do international students need a visa to study at an Australian school?"**
5. **"What is an education agent and do I need one?"**
6. **"What types of schools are there in Australia?"**
7. **"Is SchoolGo free?"**

Notes:
- Implement FAQ schema markup (JSON-LD) for Google rich snippet eligibility
- Answers should be concise (2–3 sentences) with a link to the relevant guide where applicable
- "Is SchoolGo free?" moves to last position — the rest target real search queries parents type before they know SchoolGo exists

---

## CTA footer ("Start here")

### Changes
- **Headline:** Keep — "Their future *starts* with the right school."
- **CTA button:** "Find your school" → **"Find the right school"**
- **Remove:** "Talk to a verified agent" button — gone entirely

---

*Parents page complete. Next: Agents landing page.*
