'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { conversationsResponseSchema } from '@/modules/school-messages/schemas/school-conversations.schema';
import type { ConversationsResponse } from '@/modules/school-messages/types/school-messages.types';

async function fetchSchoolConversations(): Promise<ConversationsResponse> {
  const { data } = await privateApi.get('/api/school-staffs/me/conversations');
  return conversationsResponseSchema.parse(data);
}

export function useSchoolConversations() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'messages', 'conversations'],
    queryFn: fetchSchoolConversations,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}
