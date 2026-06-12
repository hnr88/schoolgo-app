'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { AGENT_PUBLIC_PROFILE_QUERY_KEY } from '@/modules/agent-profile/queries/use-agent-public-profile.query';
import { AGENT_PUBLIC_PREVIEW_QUERY_KEY } from '@/modules/agent-profile/queries/use-public-preview.query';
import { AGENT_VERIFICATION_QUERY_KEY } from '@/modules/agent-profile/queries/use-verification-status.query';
import { AGENT_ONBOARDING_QUERY_KEY } from '@/modules/agent-profile/queries/use-agent-onboarding.query';
import type { UpdateAgentProfilePayload } from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Saves a partial slice of the agent's public profile via `PUT /api/agents/me`
 * (updateMe). Only fields present in the payload are sent; the BE picks the
 * allowed subset and applies replace-array semantics to repeatable components.
 * Invalidates the builder preview + the legacy preview/verification/onboarding
 * queries so every surface reflects the change.
 */
export function useUpdateAgentProfile() {
  const qc = useQueryClient();
  const t = useTranslations('AgentProfileBuilder');

  return useMutation({
    mutationFn: async (payload: UpdateAgentProfilePayload) => {
      await privateApi.put('/api/agents/me', { data: payload });
      return payload;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AGENT_PUBLIC_PROFILE_QUERY_KEY });
      qc.invalidateQueries({ queryKey: AGENT_PUBLIC_PREVIEW_QUERY_KEY });
      qc.invalidateQueries({ queryKey: AGENT_VERIFICATION_QUERY_KEY });
      qc.invalidateQueries({ queryKey: AGENT_ONBOARDING_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
