'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';

export function useRequestPartnership() {
  const queryClient = useQueryClient();
  const t = useTranslations('AgentPartnerships');

  return useMutation({
    mutationFn: async (schoolDocumentId: string) => {
      const { data } = await privateApi.post('/api/agent-partnerships/request', {
        schoolDocumentId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agent', 'partnerships'] });
      toast.success(t('requestSuccess'));
    },
    onError: () => {
      toast.error(t('requestError'));
    },
  });
}
