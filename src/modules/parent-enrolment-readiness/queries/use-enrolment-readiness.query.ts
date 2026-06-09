'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { readinessResponseSchema } from '@/modules/parent-enrolment-readiness/schemas/enrolment-readiness.schema';
import type { ReadinessItem } from '@/modules/parent-enrolment-readiness/types/enrolment-readiness.types';

async function fetchEnrolmentReadiness(): Promise<ReadinessItem[]> {
  const { data } = await privateApi.get('/api/pre-enrolment-items/mine');
  return readinessResponseSchema.parse(data).data;
}

export function useEnrolmentReadiness() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'enrolment-readiness', 'mine'],
    queryFn: fetchEnrolmentReadiness,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
