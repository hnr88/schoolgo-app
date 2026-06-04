'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { AGENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-conversations.query';
import { agentThreadQueryKey } from '@/modules/applications/queries/use-application-messages.query';
import type { MessageThreadItem } from '@/modules/applications/types/detail.types';

export function useMarkRead(applicationDocumentId: string) {
  const queryClient = useQueryClient();
  const queryKey = agentThreadQueryKey(applicationDocumentId);

  return useMutation({
    mutationFn: async (messageDocumentIds: string[]) => {
      await Promise.all(
        messageDocumentIds.map((documentId) =>
          privateApi.put(`/api/messages/${documentId}/read`),
        ),
      );
      return messageDocumentIds;
    },
    onMutate: async (messageDocumentIds: string[]) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<MessageThreadItem[]>(queryKey);
      const readAt = new Date().toISOString();
      queryClient.setQueryData<MessageThreadItem[]>(queryKey, (current) =>
        current?.map((message) =>
          messageDocumentIds.includes(message.documentId) && message.readAt === null
            ? { ...message, readAt }
            : message,
        ),
      );
      return { previous };
    },
    onError: (_error, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENT_CONVERSATIONS_QUERY_KEY });
    },
  });
}
