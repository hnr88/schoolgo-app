'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiConversationsResponse } from '@/modules/applications/types/conversation.types';

export const AGENT_CONVERSATIONS_QUERY_KEY = ['agent', 'conversations'] as const;

export function useConversations() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: AGENT_CONVERSATIONS_QUERY_KEY,
    enabled: isAuthenticated,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiConversationsResponse>(
        '/api/messages/conversations',
      );
      return data.data;
    },
  });
}
