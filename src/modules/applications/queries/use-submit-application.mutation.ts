'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { CreatedApplication } from '@/modules/applications/types/create-application.types';

export function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationDocumentId: string) => {
      const { data } = await privateApi.post<{ data: CreatedApplication }>(
        `/api/applications/${applicationDocumentId}/submit`,
        { data: {} },
      );
      return data.data;
    },
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications', application.documentId] });
    },
  });
}
