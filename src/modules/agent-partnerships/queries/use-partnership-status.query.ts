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
      const parsed = partnershipStatusResponseSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(
          '[usePartnershipStatus] unexpected response shape',
          parsed.error.issues,
        );
        return { status: 'none' as const, partnershipDocumentId: null };
      }
      return parsed.data.data;
    },
    staleTime: 60_000,
  });
}
