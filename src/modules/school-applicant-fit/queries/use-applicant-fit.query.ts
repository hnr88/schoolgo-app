'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { applicantFitResponseSchema } from '@/modules/school-applicant-fit/schemas/applicant-fit.schema';
import type {
  ApplicantFitQueryParams,
  ApplicantFitResponse,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

export const APPLICANT_FIT_QUERY_KEY = ['school', 'applicant-fit'] as const;

async function fetchApplicantFit(params: ApplicantFitQueryParams): Promise<ApplicantFitResponse> {
  const { data } = await privateApi.get('/api/school-staffs/me/applicant-fit', {
    params: {
      sort: params.sort,
      order: params.order,
      page: params.page,
      pageSize: params.pageSize,
    },
  });
  return applicantFitResponseSchema.parse(data);
}

export function useApplicantFit(params: ApplicantFitQueryParams) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...APPLICANT_FIT_QUERY_KEY, params],
    queryFn: () => fetchApplicantFit(params),
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}
