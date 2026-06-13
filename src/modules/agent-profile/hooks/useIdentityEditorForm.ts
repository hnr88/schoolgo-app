'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateAgentProfile } from '@/modules/agent-profile/mutations/use-update-agent-profile.mutation';
import {
  identitySchema,
  type IdentityFormValues,
} from '@/modules/agent-profile/schemas/identity.schema';
import type {
  AgentPublicProfilePreview,
  UpdateAgentProfilePayload,
} from '@/modules/agent-profile/types/agent-profile.types';

const TEXT_FIELDS = [
  'displayName',
  'headline',
  'tagline',
  'publicSummary',
  'legalEntityName',
  'tradingName',
  'directorName',
  'countryOfRegistration',
  'website',
  'phone',
] as const;

function legalSlice(preview: AgentPublicProfilePreview): Record<string, unknown> {
  const value = preview.editorSections.legalIdentity;
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function buildDefaults(preview: AgentPublicProfilePreview): IdentityFormValues {
  const legal = legalSlice(preview);
  const str = (value: unknown): string => (typeof value === 'string' ? value : '');
  const year = legal.yearEstablished;
  return {
    displayName: preview.displayName ?? '',
    headline: preview.headline ?? '',
    tagline: preview.tagline ?? '',
    publicSummary: preview.publicSummary ?? '',
    legalEntityName: str(legal.legalEntityName),
    tradingName: preview.tradingName ?? str(legal.tradingName),
    directorName: str(legal.directorName),
    countryOfRegistration: str(legal.countryOfRegistration),
    yearEstablished: typeof year === 'number' ? String(year) : '',
    website: preview.website ?? '',
    phone: '',
  };
}

/**
 * Owns the IdentityEditor's react-hook-form + save. Sends only dirty scalar
 * fields via `updateMe` (replace semantics); `yearEstablished` is coerced to a
 * number. Media relations (logo/cover/photo) are merged in by the caller as
 * numeric ids. Keeps the editor component dumb (module pattern).
 */
export function useIdentityEditorForm(preview: AgentPublicProfilePreview) {
  const { mutateAsync, isPending } = useUpdateAgentProfile();

  const form = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: buildDefaults(preview),
  });

  const submit = async (values: IdentityFormValues, media: UpdateAgentProfilePayload) => {
    const dirty = form.formState.dirtyFields;
    const payload: UpdateAgentProfilePayload = { ...media };

    for (const key of TEXT_FIELDS) {
      if (dirty[key]) payload[key] = (values[key] ?? '').trim();
    }
    if (dirty.yearEstablished) {
      const year = values.yearEstablished?.trim();
      payload.yearEstablished = year ? Number(year) : undefined;
    }
    if (Object.keys(payload).length === 0) {
      payload.displayName = values.displayName.trim();
    }

    await mutateAsync(payload);
    form.reset(values);
  };

  return { form, submit, isPending };
}
