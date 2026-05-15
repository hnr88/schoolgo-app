# SchoolGo Landing Pages — Developer Handoff

**Date:** 12 May 2026
**Scope:** Copy and structural updates to all three landing pages (Parents, Agents, Schools)
**Tech:** Next.js 14+ · i18n via en.json · Pages at /for-parents, /for-agents, /for-schools

---

## 1. Global Navigation (all three pages)

The navbar is being restructured across all landing pages. The layout is consistent — only the active state changes per page.

### New layout

```
[Logo] [Parents | Agents | Schools] ———— [Find Schools ▾] [Guides ▾] [Sign in] [CTA button]
```

### Audience switcher (left side)

Three top-level links replacing the old "About" dropdown and all anchor links:

| Label | Href | Notes |
|-------|------|-------|
| Parents | /for-parents | Active/highlighted on parent page |
| Agents | /for-agents | Active/highlighted on agent page |
| Schools | /for-schools | Active/highlighted on school page |

When on the active page, the label should be visually highlighted (not a dead link — can scroll to top or simply show active state).

### Remove entirely
- **"About" dropdown** (About SchoolGo, Contact us, For agents, For schools) — gone from nav
- **All anchor links** (#how-it-works, #compare, #faq, #commission, #trust, #pricing) — gone from nav
- About SchoolGo and Contact us move to the **footer**

### "Find Schools" dropdown (replaces "Explore")

| Current label | New label |
|---------------|-----------|
| Browse schools | Search all schools |
| Compare schools | Compare schools |
| School types | School types in Australia |
| English tests | English test requirements |

### "Guides" dropdown (replaces "Resources")

| Current label | New label |
|---------------|-----------|
| Admissions guide | How to choose a school |
| School fees | Understanding school fees |
| Visa requirements | Student visa guide |
| All guides | All guides |

---

## 2. Parents Landing Page (/for-parents)

### 2.1 Top badge
**Change:** "Government Registered · data from data.gov.au" → **"CRICOS Registered · data from data.gov.au"**

### 2.2 Hero
No copy changes. Keep H1, subhead, and search bar as-is.

**School tiles below search bar — replace** the current three tiles with:

| School | Location |
|--------|----------|
| Sydney Grammar School | Darlinghurst, NSW |
| Melbourne Grammar School | Melbourne, VIC |
| Brisbane Grammar School | Spring Hill, QLD |

### 2.3 Stats strip ("The numbers")
No changes.

### 2.4 How it works
No changes.

### 2.5 Trusted agents → "Get expert help"

**Replace section heading and body copy entirely.**

| Element | Current | New |
|---------|---------|-----|
| Section label | Trusted agents | Get expert help |
| H2 | Every school has agents who know it best. | **Get expert help — free.** |
| Body | Don't rely on a single agent you haven't vetted. SchoolGo shows you which education agents each school actually works with — so you can choose someone with a track record at the schools you're considering. | **Not sure where to start? Every school works with specialist education consultants who know their admissions process inside out. SchoolGo connects you with the right one — so you get expert guidance from choosing a school to submitting your application, at no cost to you.** |

### 2.6 Side-by-side comparison

**H2 change:** "Put **five** schools next to each other" → "Put **three** schools next to each other"

(The table mock-up already shows 3 schools — copy just needs to match.)

### 2.7 English proficiency

| Element | Current | New |
|---------|---------|-----|
| H2 | Pick a test. See which schools accept it — and the minimum scores. | **Find out which English test the school requires — and the score your child needs to get in.** |
| CTA pill | See schools accepting this test | **Check your school's English requirements** |

### 2.8 Seven languages

**Body copy change:** "…seven languages spoken by families across Asia-Pacific." → "…seven languages spoken by families **across the world**."

### 2.9 Admissions library
No changes.

### 2.10 Trust & compliance

**Subhead change:** "Data you can trust." → **"Data you can trust — so you know you're looking at legitimate institutions and accurate information."**

Four trust signal cards: no changes.

### 2.11 FAQ

**Replace all five current questions** with seven SEO-targeted questions:

1. "How do I enrol my child in an Australian school from overseas?"
2. "How much does it cost to send my child to school in Australia?"
3. "What English test does my child need for an Australian school?"
4. "Do international students need a visa to study at an Australian school?"
5. "What is an education agent and do I need one?"
6. "What types of schools are there in Australia?"
7. "Is SchoolGo free?"

**Technical requirement:** Implement FAQ schema markup (JSON-LD) for Google rich snippet eligibility. Answers should be 2–3 sentences with links to relevant guides.

### 2.12 CTA footer

| Element | Current | New |
|---------|---------|-----|
| H2 | Their future starts with the right school. | No change |
| CTA button | Find your school | **Find the right school** |
| Second button | Talk to a verified agent | **Remove entirely** |

---

## 3. Agents Landing Page (/for-agents)

### 3.1 Hero

| Element | Current | New |
|---------|---------|-----|
| Label | For education agents | No change |
| H1 | Your entire pipeline. One platform. | **All Australian schools. All your students. One platform.** |
| Subhead | Stop juggling WeChat threads, WhatsApp groups, and spreadsheets. Every student, every document, every application — one system, from first enquiry to offer letter. Free for every agent. | **Every Australian school has different fees, English tests, entry requirements, and application forms. SchoolGo brings them all into one place — so you can match, compare, and apply without the guesswork.** |
| CTAs | No change | No change |
| Stats strip | No change | No change |

### 3.2 "Why agents switch" → Replace entirely

**Remove** the entire "Why agents switch" section (headline + 4 pain-point question blocks).

**Replace with:**

**New H2:** "Everything you need to place students into Australian schools"

**Four capability blocks:**

1. **Search 695 schools by what matters** — Filter by fees, English tests, intakes, boarding, and scholarships. Compare side by side. No more digging through school websites one at a time.

2. **One student profile, every school** — Enter your student's details once. SchoolGo maps them to each school's requirements — so you see which schools fit and apply without re-entering data.

3. **Documents organised, scores verified** — Passports, transcripts, and test scores uploaded once, tracked for expiry. English scores checked against official records automatically.

4. **Your commission stays yours** — SchoolGo is free. No platform fees, no commission splits, no per-student charges. Your relationship with schools stays direct.

### 3.3 Match · Apply · Track

**H2:** No change — "Family calls at 10am. Three matched schools by 10:30."

**Steps — update copy:**

1. **Capture what the family wants** — Budget, location, intake.
2. **See best-fit schools** — Including English test scores.
3. **Deliver a shortlist, not a mess** — A branded PDF the family can screenshot and send to Dad.

School cards sidebar: no change.

### 3.4 Pricing
No changes.

### 3.5 Verified (agent reputation)
No changes.

### 3.6 Network

**H2 change:** "Agents across APAC are joining. Be one of the first." → **"Agents across APAC are joining."** (remove "Be one of the first.")

Everything else: no changes.

### 3.7 What agents are saying

**Replace all three quotes:**

**Quote 1:**
"Every school wants a different form, different documents, different English scores. I spend more time on admin than actually helping families."
— Agency director, Shanghai · 60+ students · 3 counsellors

**Quote 2:**
"A parent asks which English test their child needs and I have to check three different school websites to give them an answer. That should take ten seconds."
— Independent agent, Ho Chi Minh City · Solo practice

**Quote 3:**
"I've placed into the same twelve schools for years because I know their process. A platform that maps every school's requirements would let me place into hundreds."
— Senior counsellor, Kuala Lumpur · 40+ students · 2 branches

Keep footer note: "Composite quotes based on agent interviews"

### 3.8 FAQ (NEW SECTION — add before CTA footer)

This is a **new section**. The current agents page has no FAQ. Add it between "What agents are saying" and the CTA footer.

**Six questions:**

1. "How do education agents find Australian schools for international students?"
2. "What English tests do Australian schools accept for international admissions?"
3. "How do education agents verify student English test scores?"
4. "How do I become an education agent for Australian schools?"
5. "Do education agents pay fees to use SchoolGo?"
6. "How do education agents manage multiple student applications at once?"

**Technical requirement:** Implement FAQ schema markup (JSON-LD). Answers: 2–3 sentences with links to relevant features/guides.

### 3.9 CTA footer

| Element | Current | New |
|---------|---------|-----|
| H2 | Your students deserve better tools. | **You deserve better tools to build a better business.** |
| CTA | Create your agent profile | No change |
| Second button | Book a walkthrough | **Remove entirely** |

---

## 4. Schools Landing Page (/for-schools)

### 4.1 Hero

| Element | Current | New |
|---------|---------|-----|
| Label | For Australian schools | No change |
| H1 | Grow your international cohort. Simplify admissions. | **Grow your international cohort with students who belong.** |
| Subhead | No change | No change |
| CTA | Claim your school profile | No change |
| Second button | Book a walkthrough | **Remove entirely** |
| Sidebar | Applications inbox preview | No change |

### 4.2 The network
No changes.

### 4.3 The toolkit
No changes.

### 4.4 The journey
No changes.

### 4.5 Pricing
No changes to pricing cards.

**Testimonial quote — replace:**

Current: "The hardest part of international admissions isn't finding students — it's processing incomplete applications from 15 different email threads. A standardised inbox would change everything."

New: **"Finding the right students is hard enough. Processing their applications shouldn't be. A single inbox with complete, verified applications changes everything."**

### 4.6 FAQ

**Replace all four current questions** with six SEO-targeted questions:

1. "How do Australian schools attract more international students?"
2. "How do schools verify international students' English test scores?"
3. "How do Australian schools work with education agents?"
4. "What documents do schools need for an international student application?"
5. "How much does it cost to list on SchoolGo?"
6. "How do schools diversify their international student intake beyond China?"

**Technical requirement:** Implement FAQ schema markup (JSON-LD). Answers: 2–3 sentences with links to relevant features/guides.

### 4.7 CTA footer
No changes.

---

## 5. Footer (all pages)

### Add to footer (moved from nav)
- About SchoolGo
- Contact us

### Existing footer content
No other changes.

---

## 6. Technical notes

- **FAQ schema:** All three pages need JSON-LD FAQ structured data for Google rich snippets
- **i18n:** All new copy strings need to be added to en.json and flagged for translation into the other six languages
- **SEO:** New nav labels and FAQ questions are specifically chosen for search keyword targeting — preserve exact wording
- **Canonical URLs:** Confirm canonical tags point to /for-parents, /for-agents, /for-schools respectively
