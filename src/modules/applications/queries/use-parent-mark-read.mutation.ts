'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PARENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-parent-conversations.query';
import { parentThreadQueryKey } from '@/modules/applications/queries/use-parent-thread.query';
import type { ParentMessageThreadItem } from '@/modules/applications/types/parent-message.types';

export function useParentMarkRead(applicationDocumentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageDocumentIds: string[]) => {
      await Promise.all(
        messageDocumentIds.map((documentId) =>
          privateApi.put(`/api/messages/${documentId}/parent-read`),
        ),
      );
      return messageDocumentIds;
    },
    onMutate: async (messageDocumentIds: string[]) => {
      const queryKey = parentThreadQueryKey(applicationDocumentId);
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<ParentMessageThreadItem[]>(queryKey);
      const readAt = new Date().toISOString();
      queryClient.setQueryData<ParentMessageThreadItem[]>(queryKey, (current) =>
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
        queryClient.setQueryData(
          parentThreadQueryKey(applicationDocumentId),
          context.previous,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARENT_CONVERSATIONS_QUERY_KEY });
    },
  });
}
