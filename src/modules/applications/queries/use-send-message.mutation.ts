'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  MessageThreadItem,
  SendMessageInput,
} from '@/modules/applications/types/detail.types';

export function useSendMessage(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SendMessageInput) => {
      const { data } = await privateApi.post<{ data: MessageThreadItem }>('/api/messages', {
        data: {
          application: applicationDocumentId,
          content: input.content,
        },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications', applicationDocumentId, 'messages'],
      });
    },
  });
}
