'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { Application } from '@/modules/applications/types/application.types';

export function useWithdrawApplication(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reason?: string) => {
      const { data } = await privateApi.post<{ data: Application }>(
        `/api/applications/${applicationDocumentId}/withdraw`,
        { data: reason ? { reason } : {} },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', applicationDocumentId] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['pipeline'] });
    },
  });
}
