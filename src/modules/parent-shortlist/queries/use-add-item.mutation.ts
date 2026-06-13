'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SHORTLIST_QUERY_KEY } from '@/modules/parent-shortlist/constants/shortlist.constants';
import { shortlistItemResponseSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import { useShortlistItemsStore } from '@/modules/parent-shortlist/stores/use-shortlist-items-store';
import type { AddItemInput } from '@/modules/parent-shortlist/types/shortlist.types';

export function useAddItem(shortlistDocumentId: string) {
  const t = useTranslations('ParentShortlist');
  const queryClient = useQueryClient();
  const recordItem = useShortlistItemsStore((s) => s.addItem);

  return useMutation({
    mutationFn: async (input: AddItemInput) => {
      const { data } = await privateApi.post('/api/shortlist-items', {
        shortlistId: shortlistDocumentId,
        schoolId: input.schoolId,
        decisionStatus: input.decisionStatus,
      });
      return shortlistItemResponseSchema.parse(data).data;
    },
    onSuccess: (item) => {
      recordItem(item);
      queryClient.invalidateQueries({ queryKey: SHORTLIST_QUERY_KEY });
      toast.success(t('addItemSuccess'));
    },
    onError: () => {
      toast.error(t('addItemError'));
    },
  });
}
