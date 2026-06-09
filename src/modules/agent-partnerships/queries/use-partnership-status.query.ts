'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { partnershipStatusResponseSchema } from '@/modules/agent-partnerships/schemas/agent-partnership.schema';
import type { PartnershipStatusResponse } from '@/modules/agent-partnerships/types/agent-partnership.types';

export function usePartnershipStatus(schoolDocumentId: string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<PartnershipStatusResponse['data']>({
    queryKey: ['agent', 'partnerships', 'status', schoolDocumentId],
    enabled: isAuthenticated && Boolean(schoolDocumentId),
    queryFn: async () => {
      const { data } = await privateApi.get(
        `/api/agent-partnerships/my-status/${schoolDocumentId}`,
      );
      return partnershipStatusResponseSchema.parse(data).data;
    },
    staleTime: 60_000,
  });
}
