'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { AGENT_THREAD_POLL_INTERVAL_MS } from '@/modules/applications/constants/agent-message.constants';
import type { StrapiMessageThreadResponse } from '@/modules/applications/types/detail.types';

export const agentThreadQueryKey = (applicationDocumentId: string) =>
  ['applications', applicationDocumentId, 'messages'] as const;

export function useApplicationMessages(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: agentThreadQueryKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    refetchInterval: AGENT_THREAD_POLL_INTERVAL_MS,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiMessageThreadResponse>(
        `/api/messages/thread/${applicationDocumentId}`
      );
      return data.data;
    },
  });
}
