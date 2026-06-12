'use client';

import { useMemo, useState } from 'react';
import { useUpdateAgentProfile } from '@/modules/agent-profile/mutations/use-update-agent-profile.mutation';
import type { RepeatableSectionEntry } from '@/modules/agent-profile/types/builder-sections.types';
import type { UpdateAgentProfilePayload } from '@/modules/agent-profile/types/agent-profile.types';

interface UseRepeatableSectionDraftArgs {
  entry: RepeatableSectionEntry;
  raw: unknown;
}

interface UseRepeatableSectionDraftReturn {
  items: unknown[];
  setItems: (items: unknown[]) => void;
  save: () => void;
  isDirty: boolean;
  isPending: boolean;
}

/**
 * Owns one repeatable section's editing draft: hydrates the read-side projection
 * array into editor items, tracks the working copy, and saves ONLY this section's
 * `payloadKey` via `updateMe` (replace-array). Saving a single key never touches
 * other (possibly hidden) sections, so untouched data is never overwritten.
 */
export function useRepeatableSectionDraft({
  entry,
  raw,
}: UseRepeatableSectionDraftArgs): UseRepeatableSectionDraftReturn {
  const hydrated = useMemo(() => entry.hydrate(raw), [entry, raw]);
  const [items, setItems] = useState<unknown[]>(hydrated);
  const mutation = useUpdateAgentProfile();

  const isDirty = useMemo(
    () => JSON.stringify(items) !== JSON.stringify(hydrated),
    [items, hydrated],
  );

  const save = () => {
    const payload = { [entry.payloadKey]: items } as UpdateAgentProfilePayload;
    mutation.mutate(payload);
  };

  return { items, setItems, save, isDirty, isPending: mutation.isPending };
}
