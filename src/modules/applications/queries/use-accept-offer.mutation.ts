'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Application } from '@/modules/applications/types/application.types';

export function useAcceptOffer(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await privateApi.post<{ data: Application }>(
        `/api/applications/${applicationDocumentId}/accept-offer`,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', applicationDocumentId] });
    },
  });
}
