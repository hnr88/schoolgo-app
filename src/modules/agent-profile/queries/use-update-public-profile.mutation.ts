'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { AGENT_PUBLIC_PREVIEW_QUERY_KEY } from '@/modules/agent-profile/queries/use-public-preview.query';
import { AGENT_VERIFICATION_QUERY_KEY } from '@/modules/agent-profile/queries/use-verification-status.query';
import { AGENT_ONBOARDING_QUERY_KEY } from '@/modules/agent-profile/queries/use-agent-onboarding.query';
import type { UpdatePublicProfilePayload } from '@/modules/agent-profile/types/agent-profile.types';

export function useUpdatePublicProfile() {
  const qc = useQueryClient();
  const t = useTranslations('AgentProfile');

  return useMutation({
    mutationFn: async (payload: UpdatePublicProfilePayload) => {
      await privateApi.put('/api/agents/me', { data: payload });
      return payload;
    },
    onSuccess: () => {
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
