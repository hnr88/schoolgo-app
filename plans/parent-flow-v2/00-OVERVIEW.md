# Parent Flow v2 — 7 New Parent-Portal Features (Overview)

Cross-repo build adding **7 parent-portal features** on top of the shipped parent flow.

- **Frontend:** `/Users/hunor.nagy/Code/schoolgo-app` (Next.js 16, App Router, next-intl, TanStack Query, Zustand, Axios).
- **Backend:** `/Users/hunor.nagy/Code/schoolgo-api` (Strapi v5, Document Service API).
- **Contracts:** `00-API-CONTRACTS.md` — single source of truth. Every signature in it was **verified against the real schema/controller** (not assumed). Implement against it; do not invent shapes.

## Scope (locked by product owner)

| # | Feature | Backend content-type | Backend work | Frontend work |
|---|---|---|---|---|
| 1 | Notifications center | `notification` | **none (complete)** | module + page + header bell + nav |
| 2 | Saved / bookmarked schools | `bookmark` | **none (complete)** | parent page + nav (reuse `school-search` hooks) |
| 3 | Saved searches | `saved-search` | **none (complete)** | parent page + nav (reuse `school-search` hooks) |
| 4 | Document requests + upload | `document-request` + `student-document` | parent `find` branch + parent list + parent create + enum migration | detail-page section + upload |
| 5 | Application timeline | `timeline-event` | parent `find` branch | detail-page section |
| 6 | Pre-enrolment checklist | `pre-enrolment-item` | parent read-only list (ownership) | detail-page section |
| 7 | Edit / archive student | `student` | **none (complete)** | edit mode + archive/restore UI |

## What already EXISTS (verified — DO NOT rebuild)

- **Notifications backend**: `GET /notifications/me` (paginated, enriched `timeGroup`/`entityType`/`entityDocumentId`), `GET /notifications/unread-count`, `PUT /notifications/read-all`, `PUT /notifications/:documentId/read` — all `global::is-authenticated`, user-scoped by `ctx.state.user.documentId`. Parents already authorized.
- **Bookmark backend**: `POST /bookmarks` `{schoolId}`, `GET /bookmarks` (returns `SchoolHit[]`), `DELETE /bookmarks/:schoolDocumentId` — `is-authenticated`, user-scoped.
- **Saved-search backend**: `POST /saved-searches` `{name, filterState}`, `GET /saved-searches`, `DELETE /saved-searches/:documentId` — `is-authenticated`, user-scoped.
- **Bookmark + saved-search FRONTEND**: `src/modules/school-search/queries/` already exposes `useBookmarks`, `useCreateBookmark`, `useDeleteBookmark`, `useSavedSearches`, `useCreateSavedSearch`, `useDeleteSavedSearch`, plus `/api/bookmarks` & `/api/saved-searches` proxy routes and `SavedSearchesPanel` / `SaveSearchButton` / `CardActions`. **Reuse — never duplicate.**
- **Student backend** (`student` controller): fully parent-aware. `find`/`findOne`/`create`/`update`/`delete` scope by `getStudentActorScope` (handles `userType === 'parent'`). Custom: `POST /students/:documentId/archive`, `POST /students/:documentId/unarchive`, `GET /students/:documentId/activity` — all `is-authenticated` + ownership-checked.
- **Parent FE gold standard**: `src/modules/applications` (queries/types/constants/lib/hooks/components + barrel). Mirror its layout.
- **Media upload primitive**: `src/modules/forms/` `MediaUpload` (`accept: 'image'|'audio'`) + `useMediaUpload` mutation (POST `/api/upload`, field `files`). Document upload reuses the **mutation hook** (network-agnostic); do NOT modify the shared `MediaUpload` to add a file type unless the FE subagent confirms it's non-breaking.
- **Parent application detail page**: `ParentApplicationDetailPage` → `ParentApplicationDetailBody` (2-col grid of card sections). Features 4/5/6 mount here as new sections.

## Task DAG

Backend slices have no inter-dependencies. Frontend sections that need new endpoints depend on their backend slice.

```
BE-T5  timeline-event parent find branch ............... (none)
BE-T4  document-request parent find + student-document parent list/create + enum migration ... (none)
BE-T6  pre-enrolment-item parent read-only list ........ (none)

FE-T1  Notifications center ........................... (none)        [no backend]
FE-T2  Saved schools page ............................. (none)        [no backend]
FE-T3  Saved searches page ............................ (none)        [no backend]
FE-T7  Edit / archive student ......................... (none)        [no backend]
FE-T5  Application timeline section ................... BE-T5
FE-T4  Document requests + upload section ............. BE-T4
FE-T6  Pre-enrolment checklist section ................ BE-T6
```

## Loop protocol (one feature per iteration, sequential)

Features run **one at a time** (NOT parallel) because several share files (`en.json`, the 6 locale files, `ui.constants.ts`, `DashboardSidebar.tsx`, `ParentApplicationDetailBody.tsx`, module barrels). Parallel feature runs would clobber these.

For each feature task:

1. **Sub-agents (2–5) own DISJOINT files.** Never two agents editing the same file in one task. Shared files (`en.json` at minimum, `ui.constants.ts`, the detail body, a barrel) are edited by exactly ONE designated agent in that task.
2. **Every sub-agent reads the rules first.** Backend agents: `schoolgo-api/CLAUDE.md` + the matching `.claude/rules/*.md`. Frontend agents: `schoolgo-app/CLAUDE.md`. The agent must be told its repo and to follow that repo's CLAUDE.md exactly.
3. **Implement strictly against `00-API-CONTRACTS.md`.** No shape drift across repos.
4. **No memory leaks.** Polling (notification badge) uses TanStack Query `refetchInterval` — never a raw `setInterval`/`addEventListener` without cleanup.
5. **Definition of done (per task):**
   - Backend: `pnpm tsc --noEmit` passes; Document Service only (no `entityService`); no `populate: '*'`; custom routes `01-`-prefixed; sanitize/transform in overrides; `@strapi/utils` errors; migration has `down()`; `pnpm strapi ts:generate-types` after schema changes.
   - Frontend: `pnpm tsc --noEmit` + `pnpm lint` pass; Server Components by default; no client `fetch` (typed Axios only); types in `types/`; logic in `hooks/`/`lib/`; queries/mutations in `queries/`; `@/` imports; barrel exports; files ≤200 lines, components ≤120.
   - i18n: add `en` keys; run the **i18n-sync agent** to mirror into `ko, ms, th, vi, zh`.
6. **Never run** `dev`/`build`/`start` in either repo.
7. On completion: typecheck/lint the affected repo(s), mark the task done, proceed to the next.

## Conventions cheat-sheet

- FE module layout mirrors `src/modules/applications`. Query keys: `['parent','notifications', params]`, `['parent','notifications','unread-count']`, `['parent','bookmarks']`, `['parent','saved-searches']`, `['parent','timeline', applicationDocumentId]`, `['parent','document-requests', applicationDocumentId]`, `['parent','student-documents', applicationDocumentId]`, `['parent','pre-enrolment', applicationDocumentId]`. Invalidate the relevant key after mutations.
- FE calls relative `/api/...` (Next proxy → Strapi) via `privateApi` (auth) / `publicApi`.
- Strapi v5: `documentId` everywhere; list `{ data, meta.pagination }`, single `{ data }`; media `multiple:false` → object.
- i18n namespaces PascalCase, keys camelCase, 6 locales `en, ko, ms, th, vi, zh`.
</content>
</invoke>
