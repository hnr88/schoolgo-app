'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentPreEnrolmentResponse } from '@/modules/applications/types/parent-pre-enrolment.types';

export function useParentPreEnrolment(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'pre-enrolment', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentPreEnrolmentResponse>(
        `/api/pre-enrolment-items/mine/by-application/${applicationDocumentId}`,
      );
      return data;
    },
  });
}
