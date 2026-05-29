'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolOnboardingState,
  StrapiEnvelope,
} from '@/modules/school-dashboard/types/school-dashboard.types';

export function useSchoolOnboarding() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolOnboardingState>({
    queryKey: ['school-onboarding'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<SchoolOnboardingState>>(
        '/api/school-staffs/me/onboarding',
      );
      return res.data.data;
    },
  });
}
