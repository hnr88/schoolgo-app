'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiParentThreadResponse } from '@/modules/applications/types/parent-message.types';

export const parentThreadQueryKey = (applicationDocumentId: string) =>
  ['parent', 'thread', applicationDocumentId] as const;

export function useParentThread(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: parentThreadQueryKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiParentThreadResponse>(
        `/api/messages/parent-thread/${applicationDocumentId}`,
      );
      return data.data;
    },
  });
}
