'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { applicantFitConfigResponseSchema } from '@/modules/school-applicant-fit/schemas/applicant-fit.schema';
import type { ApplicantFitConfig } from '@/modules/school-applicant-fit/types/applicant-fit.types';

export const FIT_CONFIG_QUERY_KEY = ['school', 'applicant-fit', 'config'] as const;

async function fetchFitConfig(): Promise<ApplicantFitConfig> {
  const { data } = await privateApi.get('/api/school-staffs/me/applicant-fit-config');
  return applicantFitConfigResponseSchema.parse(data).data;
}

export function useFitConfig() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: FIT_CONFIG_QUERY_KEY,
    queryFn: fetchFitConfig,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
