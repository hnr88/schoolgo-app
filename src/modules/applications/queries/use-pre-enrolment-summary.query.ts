'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { PreEnrolmentSummary } from '@/modules/applications/types/parent-pre-enrolment.types';

export function usePreEnrolmentSummary(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'pre-enrolment-summary', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<{ data: PreEnrolmentSummary }>(
        `/api/pre-enrolment-items/summary/${applicationDocumentId}`,
      );
      return data.data;
    },
  });
}
