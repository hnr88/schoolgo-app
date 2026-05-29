'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolMessageThreadItem,
  SchoolMessageThreadResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function schoolMessagesKey(applicationDocumentId: string) {
  return ['school-applications', applicationDocumentId, 'messages'] as const;
}

export function useSchoolMessages(applicationDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: schoolMessagesKey(applicationDocumentId),
    enabled: isAuthenticated && !!applicationDocumentId,
    queryFn: async (): Promise<SchoolMessageThreadItem[]> => {
      const { data } = await privateApi.get<SchoolMessageThreadResponse>(
        `/api/messages/school-thread/${applicationDocumentId}`,
      );
      return data.data;
    },
  });
}

export function useSendSchoolMessage(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const { data } = await privateApi.post('/api/messages/school-send', {
        data: { application: applicationDocumentId, content },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolMessagesKey(applicationDocumentId) });
    },
  });
}
