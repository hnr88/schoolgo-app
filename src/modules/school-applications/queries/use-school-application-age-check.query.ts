'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  AgeEligibilityResult,
  VettingResultResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolApplicationAgeCheckKey(applicationDocumentId: string) {
  return ['school-application-age-check', applicationDocumentId] as const;
}

export function useSchoolApplicationAgeCheck(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolApplicationAgeCheckKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<AgeEligibilityResult | null> => {
      const { data } = await privateApi.get<VettingResultResponse>(
        `/api/school-staffs/me/applications/${applicationDocumentId}/vetting`,
      );
      const ageCheck = data.data.checks.find((c) => c.check === 'age_eligibility');
      return ageCheck ? { status: ageCheck.status, message: ageCheck.message } : null;
    },
  });
}
