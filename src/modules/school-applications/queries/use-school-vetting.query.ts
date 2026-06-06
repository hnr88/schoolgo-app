'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  VettingResult,
  VettingResultResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolVettingKey(applicationDocumentId: string) {
  return ['school-vetting', applicationDocumentId] as const;
}

export function useSchoolVetting(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolVettingKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<VettingResult> => {
      const { data } = await privateApi.get<VettingResultResponse>(
        `/api/school-staffs/me/applications/${applicationDocumentId}/vetting`,
      );
      return data.data;
    },
  });
}
