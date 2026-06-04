'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function useParentAcceptOffer(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await privateApi.post<{ data: ParentApplication }>(
        `/api/applications/${applicationDocumentId}/parent-accept-offer`,
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
