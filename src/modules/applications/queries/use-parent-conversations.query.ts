'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiParentConversationsResponse } from '@/modules/applications/types/parent-message.types';

export const PARENT_CONVERSATIONS_QUERY_KEY = ['parent', 'conversations'] as const;

export function useParentConversations() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PARENT_CONVERSATIONS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiParentConversationsResponse>(
        '/api/messages/parent-conversations',
      );
      return data.data;
    },
  });
}
