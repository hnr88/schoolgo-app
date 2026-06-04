'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';
import type { ParentDeclineOfferInput } from '@/modules/applications/types/parent-offer.types';

export function useParentDeclineOffer(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ParentDeclineOfferInput) => {
      const declineNote = input.declineNote?.trim();
      const { data } = await privateApi.post<{ data: ParentApplication }>(
        `/api/applications/${applicationDocumentId}/parent-decline-offer`,
        { data: declineNote ? { declineNote } : {} },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parent', 'application', applicationDocumentId],
      });
      queryClient.invalidateQueries({ queryKey: ['parent', 'applications'] });
    },
  });
}
