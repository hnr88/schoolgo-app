'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { AgentOfferDetailResponse } from '@/modules/agent-offers/types/agent-offers.types';

export function useAgentOfferDetail(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'offer-detail', applicationDocumentId],
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<AgentOfferDetailResponse>(
        `/api/applications/${applicationDocumentId}`,
      );
      return data.data;
    },
  });
}
