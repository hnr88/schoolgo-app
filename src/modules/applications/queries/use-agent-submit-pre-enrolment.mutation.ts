'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { ParentPreEnrolmentItem } from '@/modules/applications/types/parent-pre-enrolment.types';

export function useAgentSubmitPreEnrolment(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemDocumentId: string) => {
      const { data } = await privateApi.post<{ data: ParentPreEnrolmentItem }>(
        `/api/pre-enrolment-items/${itemDocumentId}/submit`,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['agent', 'pre-enrolment-items', applicationDocumentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['agent', 'pre-enrolment-summary', applicationDocumentId],
      });
    },
  });
}
