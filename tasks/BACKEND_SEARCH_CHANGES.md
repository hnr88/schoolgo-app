# Backend Changes — SchoolGo Search

**Audience:** backend team (owns API + DB).
**Frontend:** Next.js 16 app in this repo, proxies through `src/app/api/search/schools/route.ts` to the backend (`NEXT_PUBLIC_API_URL`).
**Source of truth:** `tasks/SEARCH_SPEC.md`.

Use the spec's exact filter names and enum values throughout. Do not invent fields not implied by the spec.

---
 adfsdafaD
## 1. Overview

Search powers a map + sidebar + results panel UI with two access tiers (anonymous "basic" and authenticated "advanced"). The backend must expose a single filtered/sorted/paginated school search endpoint, plus autocomplete (school + suburb), saved searches, bookmarks, and a compare endpoint. The schools dataset needs new columns/relations to support tuition-per-level, religious affiliation, program type, six English test minimums, CRICOS age range, enrolment status, and curriculum codes.

---

## 2. Search endpoint contract

### `POST /api/search/schools`

Single endpoint serves both basic and advanced. Auth tier is enforced by the frontend (locked filters hidden), but the backend MUST also reject advanced-only filters when the request is unauthenticated, to prevent lock bypass.

#### Request body

| Field | Type | Notes |
|---|---|---|
| `q` | `string` (optional, max 200) | Free-text: name, city, suburb |
| `states` | `string[]` | Enum: `QLD`, `NSW`, `VIC`, `SA`, `WA`, `TAS`, `NT`, `ACT` |
| `suburb` | `string` (optional) | Suburb name OR postcode (autocomplete-resolved) |
| `postcode` | `string` (optional) | 4-digit AU postcode |
| `sectors` | `string[]` | Enum: `government`, `non-government`, `catholic` |
| `accommodation` | `string[]` | Enum: `boarding`, `homestay`, `both`, `none` |
| `religiousAffiliations` | `string[]` | See enum in §3 (14 values) |
| `entryYearLevels` | `string[]` | Enum: `gr4`, `gr5`, `gr6`, `yr7`, `yr8`, `yr9`, `yr10`, `yr11`, `yr12` |
| `studentAge` | `number` (int, 4–20) | Single value; drives soft mismatch hint client-side |
| `entryTerms` | `string[]` | Enum: `term1`, `term2`, `term3`, `term4` (advanced only) |
| `programTypes` | `string[]` | Enum: `australian-cert`, `ib`, `elicos` (advanced only) |
| `atarAvailable` | `boolean` (optional) | |
| `englishLanguageSupport` | `boolean` (optional) | Was "ESL Support" |
| `englishTest` | `object` (optional) | `{ type, score }` (advanced only) |
| `englishTest.type` | enum | `aeas`, `idat`, `duolingo`, `ielts`, `pte`, `cambridge` |
| `englishTest.score` | number | Validated per-test (see spec §English test scores) |
| `feeMin` | number (AUD) | Default 5000 |
| `feeMax` | number (AUD) | 60000 = treat as "+" upper-open |
| `sortBy` | enum | See §Sort below |
| `bbox` | `{ swLat, swLng, neLat, neLng }` (optional) | For map viewport queries / clusters |
| `page` | int (≥1) | |
| `pageSize` | int (1–100) | |

**Fee filter semantics.** When `entryYearLevels` is set, the fee range MUST be matched against the **lowest** of the per-level tuitions for the selected levels (see §3). When no levels are selected, match against the school's overall lowest tuition.

**Sort enum.**
Basic: `name-asc`, `tuition-asc`, `tuition-desc`, `state`.
Advanced adds: `name-desc`, `enrolment-status` (open first), `application-deadline-asc`, `school-size-asc`, `school-size-desc`, `international-pct-asc`, `international-pct-desc`.

#### Response body

```json
{
  "data": {
    "hits": [SchoolHit, ...],
    "total": 0,
    "page": 1,
    "pageSize": 24,
    "clusters": [Cluster, ...]   // optional, only when bbox provided AND server-side clustering enabled
  },
  "error": null
}
```

**`SchoolHit` — tile card fields**

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `photoUrl` | string \| null | Absolute URL; frontend already resolves relative paths |
| `suburb` | string | |
| `state` | enum | One of 8 AU states |
| `lat` | number | Map marker |
| `lng` | number | Map marker |
| `enrolmentStatus` | enum | `open`, `limited`, `waitlist`, `closed` |
| `sector` | enum | `government`, `non-government`, `catholic` |
| `curriculumCodes` | string[] | Combinable, e.g. `["QCE","IB"]`. Enum: `VCE`, `HSC`, `QCE`, `SACE`, `WACE`, `TCE`, `NTCET`, `BSSS`, `IB` |
| `accommodation` | enum | `boarding`, `homestay`, `both`, `none` |
| `annualTuitionFrom` | number \| null | AUD, lowest across offered levels (or selected levels if filter set — backend MUST recompute in context of the request) |

---

## 3. Database / data model deltas

Required columns/relations on (or related to) the `schools` table.

### 3.1 Tuition per school level
New table `school_tuition` (one row per school × level):

| col | type |
|---|---|
| school_id | fk |
| level | enum (`gr4`…`yr12`) |
| annual_amount_aud | int |

Allows server-side computation of "lowest tuition across selected levels" (§2 fee semantics) and per-level display on the school detail page.

### 3.2 Religious affiliation
Enum column `religious_affiliation` (nullable, single-value per school):

```
non-denominational, anglican, baptist, lutheran, uniting-church,
presbyterian, islamic, jewish, buddhist, coptic-orthodox,
greek-orthodox, seventh-day-adventist, quaker, interdenominational-christian
```

(14 values; spec shows 7 above the fold + 7 under "Show all (14)".)

### 3.3 Program type
Many-to-many `school_program_types` against enum `program_type`:

```
australian-cert, ib, elicos
```

A school can offer multiple.

### 3.4 English test minimums
Six nullable columns (or `school_english_test_minimums` table) — one minimum accepted score per test:

| col | type | range |
|---|---|---|
| min_aeas | int | 1–80 |
| min_idat | int | 1–100 |
| min_duolingo | int | 10–160 (step 5) |
| min_ielts | decimal(2,1) | 1.0–9.0 (step 0.5) |
| min_pte | int | 10–90 |
| min_cambridge | int | 100–230 |

Filter semantics: `accepted = school.min_<test> <= request.englishTest.score`.

### 3.5 CRICOS age range
Two columns:

| col | type |
|---|---|
| cricos_min_age | int |
| cricos_max_age | int |

Used by the frontend for the **soft mismatch hint** when a student age doesn't align with the selected year level. Backend does NOT filter on age — it only returns the range so the frontend can display the hint.

### 3.6 Enrolment status
Enum column `enrolment_status` on `schools`:

```
open, limited, waitlist, closed
```

(See §10 open question on update cadence.)

### 3.7 Curriculum codes
Many-to-many `school_curriculum_codes` against enum:

```
VCE, HSC, QCE, SACE, WACE, TCE, NTCET, BSSS, IB
```

A school can have multiple (e.g. QCE + IB).

### 3.8 Misc fields referenced by advanced sort
For advanced sort options to function:

| col | type |
|---|---|
| application_deadline | date (nullable) |
| school_size | int (total enrolment) |
| international_student_pct | decimal |

---

## 4. Autocomplete endpoints

### 4.1 `GET /api/autocomplete/schools?q=...&limit=10`

Returns school name suggestions with suburb hint.

```json
{
  "data": [
    { "id": "...", "name": "Brisbane Grammar School", "suburb": "Spring Hill", "state": "QLD" }
  ]
}
```

Should match prefix + fuzzy on name. Limit ≤ 20.

### 4.2 `GET /api/autocomplete/suburbs?q=...&limit=10`

Returns Australian suburb/postcode suggestions.

```json
{
  "data": [
    { "suburb": "Spring Hill", "postcode": "4000", "state": "QLD" }
  ]
}
```

Match on both suburb name AND postcode (`q=4000` returns all suburbs in that postcode). Source: AU postcode dataset (Australia Post or similar).

---

## 5. Saved searches (advanced / auth-only)

All endpoints require auth. `user_id` derived from session.

| Method | Path | Body | Returns |
|---|---|---|---|
| `POST` | `/api/saved-searches` | `{ name, filterState }` | created record |
| `GET` | `/api/saved-searches` | — | `SavedSearch[]` |
| `DELETE` | `/api/saved-searches/:id` | — | 204 |

**`saved_searches` table:**

| col | type |
|---|---|
| id | uuid |
| user_id | fk |
| name | string (max 100) |
| filter_state | jsonb (request body shape from §2) |
| created_at | timestamp |
| last_result_count | int (nullable — populated on save) |

Note: spec says the dropdown shows "name, date saved, and result count" — backend MUST run the search once on create to populate `last_result_count`.

---

## 6. Bookmarks (advanced / auth-only)

| Method | Path | Body | Returns |
|---|---|---|---|
| `POST` | `/api/bookmarks` | `{ schoolId }` | created |
| `DELETE` | `/api/bookmarks/:schoolId` | — | 204 |
| `GET` | `/api/bookmarks` | — | `SchoolHit[]` (same shape as §2 response item) |

**`bookmarks` table:**

| col | type |
|---|---|
| user_id | fk |
| school_id | fk |
| created_at | timestamp |
| PK | (user_id, school_id) |

Basic users tapping the heart get a signup prompt — handled client-side, no endpoint call.

---

## 7. Compare endpoint

### `GET /api/compare/schools?ids=a,b,c,d`

Returns expanded school records for side-by-side. Max 4 ids. Fields are a superset of `SchoolHit`:

| Field | Type |
|---|---|
| (all `SchoolHit` fields) | |
| `tuitionByLevel` | `{ level, annualAmountAud }[]` |
| `religiousAffiliation` | enum (§3.2) |
| `programTypes` | enum[] (§3.3) |
| `englishTestMinimums` | `{ aeas, idat, duolingo, ielts, pte, cambridge }` |
| `cricosAgeRange` | `{ min, max }` |
| `applicationDeadline` | date \| null |
| `schoolSize` | int |
| `internationalStudentPct` | decimal |
| `atarAvailable` | bool |
| `englishLanguageSupport` | bool |
| `entryTerms` | enum[] |

If any id is missing, return the rest and include a `missing: string[]` array in the response.

---

## 8. Map clustering

Spec calls for "clustered school pins" across Australia.

**Option A (preferred): server-side clustering.**
- When request includes `bbox` + `zoom`, return `clusters: [{ lat, lng, count, bounds }, ...]` alongside `hits`.
- Below a threshold count, omit `clusters` and return raw `hits` for the viewport.
- Allows efficient queries — DB never returns 1000s of pins to client.

**Option B: client-side clustering.**
- Backend returns `hits` (id + lat/lng + minimal tile data) for all schools matching filters within `bbox`.
- Frontend clusters using supercluster or similar.
- Acceptable IF total result count per bbox stays under ~2000. Above that, payload + client CPU become a problem.

Backend team to pick. Frontend can support either — confirm choice early.

---

## 9. Deltas from current API

Current `POST /api/search/schools` (proxied through `src/app/api/search/schools/route.ts`) accepts the schema in `src/modules/school-search/schemas/search-request.schema.ts`:

Current request shape: `{ query, filters (free-form record), allOf/anyOf/noneOf, facets, sortBy, location (lat/lng/radiusKm), limit, offset, page, matchingStrategy }`.

Current response shape: `{ data: { hits: [{ logoUrl, ... }] }, error }` — `hits` contents are untyped; only `logoUrl` is resolved to an absolute URL.

**Deltas to deliver:**

- Replace generic `filters` / `allOf`/`anyOf`/`noneOf` / `matchingStrategy` with the typed fields in §2 (every filter named in the spec).
- Replace `location.radiusKm` with `bbox` (spec removed radius search — see §"Removed from original spec").
- Add `feeMin`/`feeMax` with per-level lowest-tuition semantics (§2, §3.1).
- Rename `query` → `q` to match spec wording.
- Rename `limit` → `pageSize`; cap at 100 (current cap is 500).
- Define `sortBy` as a closed enum (currently free string).
- Define `SchoolHit` response shape with every tile-card field (§2). Current API returns `logoUrl` only — needs `photoUrl`, `suburb`, `state`, `lat`, `lng`, `enrolmentStatus`, `sector`, `curriculumCodes[]`, `accommodation`, `annualTuitionFrom`.
- Add optional `clusters` array in response (§8).
- Enforce auth on advanced-only filters server-side (`entryTerms`, `programTypes`, `englishTest`).
- New endpoints (none of these exist today): `/api/autocomplete/schools`, `/api/autocomplete/suburbs`, `/api/saved-searches` (CRUD), `/api/bookmarks` (CRUD), `/api/compare/schools`.
- New DB columns/tables per §3.

The Next.js route handler will be updated in this repo to match the new contract; backend just needs to ship the new shape.

---

## 10. Open questions for backend team

1. **Enrolment status update cadence.** Real-time (school admin toggles), daily snapshot from a feed, or manual editorial? Affects caching strategy and how stale the badge can be.
2. **CRICOS age range source.** Where does this data come from — CRICOS register scrape, manual entry, school-supplied? Update cadence?
3. **Tuition-per-level coverage.** Are tuition figures available for every level for every school? What's the fallback when a school offers a level but has no tuition figure (omit from fee filter? treat as 0? treat as null and exclude)?
4. **Curriculum codes per school.** Is this already tracked or new? Authoritative source (state education dept, CRICOS, school-supplied)?
5. **"Catholic" sector vs religious affiliation.** Spec is explicit Catholic is its own sector pill and NOT under religious affiliation. Confirm DB models them as mutually exclusive (or that a Catholic school's `religious_affiliation` is null).
6. **English test minimums.** Are all 6 tests tracked for every school, or sparse? Filter behaviour when a school has no minimum recorded for the selected test — exclude or include?
7. **Religious affiliation cardinality.** Single value per school or multi (e.g. interdenominational + anglican)? Spec implies single.
8. **Suburb autocomplete dataset.** Use Australia Post PAF, GNAF, or a public CSV? Licensing implications.
9. **Application deadline** (advanced sort). Single annual date, per-term, or per-level? Spec only mentions "soonest".
10. **School size + international %** (advanced sorts). Self-reported by school, scraped from My School / ACARA, or editorial?
11. **Saved search `last_result_count` freshness.** Re-run on every list fetch (expensive) or stamp at create-time only? Spec implies stamp-at-create is enough.
12. **Search ranking for free-text `q`.** Weighting between name match vs suburb match vs city match? Fuzzy threshold? Confirm whether existing Strapi/Meilisearch-style index continues to power this.
13. **Bbox + filter interaction.** When `bbox` is provided, do filters still apply (filtered set within the viewport) or does bbox act as a hard scope? Recommend: filters always apply, bbox is an additional AND.
14. **Rate limiting / abuse.** Autocomplete endpoints will get hammered — confirm whether infra-level rate limits already exist or backend needs to add them.

---

*End of document.*
