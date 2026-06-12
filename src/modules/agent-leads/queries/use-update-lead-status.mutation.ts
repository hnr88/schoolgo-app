'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { privateApi } from '@/lib/axios';
import {
  AGENT_LEADS_ENDPOINT,
  AGENT_LEADS_QUERY_KEY,
} from '@/modules/agent-leads/constants/agent-leads.constants';
import type { UpdateLeadStatusPayload } from '@/modules/agent-leads/types/agent-leads.types';

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  const t = useTranslations('AgentLeads');

  return useMutation({
    mutationFn: async ({ documentId, status }: UpdateLeadStatusPayload) => {
      const { data } = await privateApi.put(`${AGENT_LEADS_ENDPOINT}/${documentId}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENT_LEADS_QUERY_KEY });
      toast.success(t('statusUpdateSuccess'));
    },
    onError: () => {
      toast.error(t('statusUpdateError'));
    },
  });
}
