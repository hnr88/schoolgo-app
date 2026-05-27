# Defects — reconciled (plan claims + live re-verification)

Legend: ✅ verified-fixed (this run, real evidence) · 🔧 confirmed-open · 🔁 claimed-done-by-prior-session-needs-reproof · ❓ to-investigate

## Backend / wiring (functional)
- 🔁 **B1 bookmarks 403→200** — perms granted; live `GET /api/bookmarks`=200 but 0 rows. Need data to prove list/delete pages. (D11, B14)
- 🔁 **B2 saved-searches 403→200** — perms granted; live 200 but 0 rows. Need data to prove page + run. (D12, B13)
- 🔁 **A1 notifications seeded (5, unread 3)** — live `/notifications/me`=5, unread=obj. ✅ data present; mutations (mark read / mark-all) unproven (B3/D10).
- 🔧 **B9 pagination meta** — LIVE CONFIRMED OPEN: `students?pagination[pageSize]=2`→12 rows; `applications?pageSize=2`→3. Controllers ignore pageSize / no correct `meta.pagination`. Fix BE controllers + FE list totals.
- 🔁 **B4/B6 timeline + document-request 400→200** — claimed fixed Batch 2 (3 & 2 rows). DB has timeline_events=9, document_requests=2. Reprove via FE render (D7).
- 🔁 **B7 student-documents/mine 403→200** — claimed Batch 4. student_documents=6. Reprove render + upload (B8).
- ❓ **B16 results / test-results 404** — FE hook calls `/api/english-test-results` (200, 4 rows); `/api/test-results` is an orphan 404 nothing calls. Verify results page renders (D8); likely non-defect.
- 🔧 **B17 interview_completed badge** — FE `ApplicationStatus` type omits `interview_completed` (backend enum has it) → badge falls back to "Draft". Add enum value + tone + label across all locales. (known pending both repos)

## Frontend functional (to verify live)
- 🔁 **B10/B11/B12 settings** — claimed 9/9 pass Batch 4 (profile+prefs persist, password validation). Reprove persistence across reload + real PUT/POST.
- 🔧 **B3/D10 notifications e2e** — Batch 5 "launched", unverified. Bell badge, list grouping, mark-read, mark-all → API 200 + UI update.
- 🔧 **B8 document upload e2e** — Batch 5 "launched", unverified. Upload → `POST /api/student-documents/mine` 200 → appears in list; progress + error (bad type/size).
- 🔧 **B13 saved-searches run** — apply filter + navigate to /parent/search with results. Unverified.
- 🔧 **B14 saved-schools delete** — remove card + persist. Needs bookmark data.
- 🔧 **B15 student archive/unarchive** — UI control on list/detail wired to mutation, toggle reflects state. Unverified.
- 🔧 **B18 bell polling** — refetchInterval works, sane constant, no leak. Unverified.
- 🔧 **B19 student create wizard** — full submit incl. photo+voice → POST /api/students 200 → appears. Unverified live.
- 🔧 **B20 student edit** — full submit → PUT /api/students/{id} 200 → persists; media preview. Unverified live.

## UI sizing (Track C — Law #11 waiver for ui/*)
- 🔁 **C1–C5** ui primitive sizing (input h-11, select h-11, textarea min-h-24, button h-10, form spacing) claimed shipped (tsc+lint green). Reprove rendered.
- 🔁 **C6–C15** module spacing claimed shipped. Reprove rendered + no regression.
- 🔧 **C16–C20** table density, dashboard polish, student detail layout, list density, mobile pass — open/partial.

## Accessibility / UI integrity (per page) — all OPEN (no axe run yet this run)
- WCAG 2.2 AA: labels, focus order/visibility, contrast, headings, dialog focus; 44px targets; no overflow/overlap/console errors at desktop + 375px.

## API security (per endpoint group) — OPEN (need real unauth/forged-token + cross-tenant tests)
- auth/authz on every parent route; object-level (no cross-parent access); input validation + mass-assignment (role/owner/private fields); response sanitization (no hashes/PII); CORS/secrets.

## Benign / non-parent (noted, not in scope unless they break parent flow)
- `launching-soon/page.tsx` TODO i18n comments; `content-static-page-blueprints.constants.ts` marketing copy; `school-search/types/search-api.types.ts:104` "mock/proxy may not populate" comment; `generate-school-placeholder` logo fallback (legit).
