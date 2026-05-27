# Task 07 — Generic media upload + preview component

**Repo:** `schoolgo-app` · **Depends on:** — · **Contract:** §A

## Objective
Build a reusable **multi-purpose media upload** component with inline **preview**: image thumbnail/preview for images and an **audio player** (listen) for audio. Handles selecting a file, uploading to Strapi `/api/upload`, showing progress, returning the media `id`, and removing/replacing. Used by the student wizard (photo + voice) and reusable elsewhere.

## Read first (binding)
- `schoolgo-app/CLAUDE.md`
- `.claude/rules/module-pattern.md`, `.claude/rules/state-data.md`, `.claude/rules/imports.md`, `.claude/rules/tailwind.md`
- Axios: `src/lib/axios/private.ts` (auth + interceptors). Mirror mutation style from `src/modules/applications/queries/*` and existing `src/modules/students/queries/use-upload-document.mutation.ts`.

## Module: extend `src/modules/forms/` (or `forms/media/`)
```
forms/
  components/
    MediaUpload.tsx         # generic dropzone/button + state; ≤120 lines
    ImagePreview.tsx        # object-fit preview + remove
    AudioPreview.tsx        # <audio controls> player + remove
  hooks/
    use-media-upload.mutation.ts   # POST /api/upload (multipart) → { id, url, mime, name }
  types/
    media.types.ts          # UploadedMedia, MediaUploadProps (accept: 'image'|'audio', value, onChange)
```

## Design constraints
- `MediaUpload` props: `accept: 'image' | 'audio'`, `value?: UploadedMedia | null`, `onChange(media | null)`, `label`, `maxSizeMb?`, disabled/loading. Renders `ImagePreview` or `AudioPreview` based on `accept`/`mime`.
- Upload via `privateApi.post('/api/upload', formData)` with field **`files`**; **override the JSON content-type** so Axios sets the multipart boundary. Map `res.data[0]` → `{ id, url, mime, name, size }`.
- Show upload progress (Axios `onUploadProgress`), error toast via `sonner`, client-side type/size validation before upload.
- Audio preview = native `<audio controls src={url}>` (listen). Image preview = `next/image` or `<img>` with object-fit (follow tailwind rules); revoke object URLs on unmount.
- No student-specific logic. `'use client'`. No edits to `components/ui/*`.
- All copy via `t()` / props (no hardcoded strings).

## Sub-agent breakdown (4)
1. **Mutation + types agent** — `use-media-upload.mutation.ts` (multipart, progress, error mapping) + `media.types.ts`.
2. **Image preview agent** — `ImagePreview.tsx` (preview, remove, object-fit, a11y alt).
3. **Audio preview agent** — `AudioPreview.tsx` (`<audio controls>`, filename, remove).
4. **Container + barrel agent** — `MediaUpload.tsx` wiring accept/value/onChange/progress/validation; update `forms/index.ts`; `tsc`/`lint`.

## Acceptance / DoD
- `pnpm tsc --noEmit` and `pnpm lint` pass.
- Uploading an image shows a preview; uploading audio shows a playable player; remove clears value; `onChange` emits the media `id`.
- Multipart request hits `/api/upload` with field `files` and auth header. Reusable (no parent/student coupling). Size limits respected; `@/` imports; barrel exports.
