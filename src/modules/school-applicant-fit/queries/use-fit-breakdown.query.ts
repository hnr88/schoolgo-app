'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { fitBreakdownResponseSchema } from '@/modules/school-applicant-fit/schemas/applicant-fit.schema';
import type { FitBreakdown } from '@/modules/school-applicant-fit/types/applicant-fit.types';

async function fetchFitBreakdown(documentId: string): Promise<FitBreakdown> {
  const { data } = await privateApi.get(
    `/api/school-staffs/me/applications/${documentId}/fit-breakdown`,
  );
  return fitBreakdownResponseSchema.parse(data).data;
}

export function useFitBreakdown(documentId: string | null) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'applicant-fit', 'breakdown', documentId],
    queryFn: () => fetchFitBreakdown(documentId as string),
    enabled: isAuthenticated && documentId !== null,
    staleTime: 30_000,
  });
}
