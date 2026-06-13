'use client';

import { useQueries } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { demandSignalResponseSchema } from '@/modules/parent-admission-likelihood/schemas/admission-likelihood.schema';
import type { DemandSignal } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

async function fetchDemandSignal(schoolDocumentId: string): Promise<DemandSignal> {
  const { data } = await privateApi.get(`/api/schools/${schoolDocumentId}/demand-signal`);
  return demandSignalResponseSchema.parse(data).data;
}

export function useDemandSignals(schoolDocumentIds: string[], enabled: boolean) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQueries({
    queries: schoolDocumentIds.map((schoolDocumentId) => ({
      queryKey: ['parent', 'demand-signal', schoolDocumentId],
      queryFn: () => fetchDemandSignal(schoolDocumentId),
      enabled: enabled && isAuthenticated,
      staleTime: 60_000,
      retry: false,
    })),
  });
}
