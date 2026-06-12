'use client';

import { useMemo, useState } from 'react';
import { useUpdateAgentProfile } from '@/modules/agent-profile/mutations/use-update-agent-profile.mutation';
import { hydrateComplianceValues } from '@/modules/agent-profile/lib/builder-scalars';
import type {
  AgentComplianceValues,
  AgentPublicProfilePreview,
  AgentSectionVisibility,
} from '@/modules/agent-profile/types/agent-profile.types';

/** Compliance (fee/ethics/availability) scalar draft + per-tab save. */
export function useComplianceDraft(preview: AgentPublicProfilePreview) {
  const initial = useMemo(() => hydrateComplianceValues(preview), [preview]);
  const [values, setValues] = useState<AgentComplianceValues>(initial);
  const mutation = useUpdateAgentProfile();

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initial),
    [values, initial],
  );

  const update = (patch: Partial<AgentComplianceValues>) =>
    setValues((prev) => ({ ...prev, ...patch }));

  const save = () => mutation.mutate({ ...values });

  return { values, update, save, isDirty, isPending: mutation.isPending };
}

/** Section-visibility map draft + per-tab save (`sectionVisibility` json). */
export function useVisibilityDraft(initial: AgentSectionVisibility) {
  const [visibility, setVisibility] = useState<AgentSectionVisibility>(initial);
  const mutation = useUpdateAgentProfile();

  const isDirty = useMemo(
    () => JSON.stringify(visibility) !== JSON.stringify(initial),
    [visibility, initial],
  );

  const update = (patch: AgentSectionVisibility) =>
    setVisibility((prev) => ({ ...prev, ...patch }));

  const save = () => mutation.mutate({ sectionVisibility: visibility });

  return { visibility, update, save, isDirty, isPending: mutation.isPending };
}
