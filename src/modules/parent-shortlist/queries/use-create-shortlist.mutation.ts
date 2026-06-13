'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SHORTLIST_QUERY_KEY } from '@/modules/parent-shortlist/constants/shortlist.constants';
import { shortlistResponseSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { CreateShortlistInput } from '@/modules/parent-shortlist/types/shortlist.types';

export function useCreateShortlist() {
  const t = useTranslations('ParentShortlist');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateShortlistInput) => {
      const { data } = await privateApi.post('/api/shortlists', { name: input.name });
      return shortlistResponseSchema.parse(data).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHORTLIST_QUERY_KEY });
      toast.success(t('createSuccess'));
    },
    onError: () => {
      toast.error(t('createError'));
    },
  });
}
