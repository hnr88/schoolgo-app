'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PARENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-parent-conversations.query';
import { parentThreadQueryKey } from '@/modules/applications/queries/use-parent-thread.query';
import type {
  ParentMessageThreadItem,
  ParentSendMessageInput,
  ParentSendMessageResponse,
} from '@/modules/applications/types/parent-message.types';

interface SendContext {
  previous: ParentMessageThreadItem[] | undefined;
  optimisticId: string;
}

function buildOptimisticMessage(
  optimisticId: string,
  content: string,
): ParentMessageThreadItem {
  const timestamp = new Date().toISOString();
  return {
    id: -1,
    documentId: optimisticId,
    senderRole: 'parent',
    content,
    readAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
    publishedAt: timestamp,
    attachments: null,
  };
}

export function useParentSendMessage(applicationDocumentId: string) {
  const queryClient = useQueryClient();
  const queryKey = parentThreadQueryKey(applicationDocumentId);

  return useMutation({
    mutationFn: async (input: ParentSendMessageInput) => {
      const { data } = await privateApi.post<ParentSendMessageResponse>(
        '/api/messages/parent-send',
        {
          data: {
            application: applicationDocumentId,
            content: input.content,
          },
        },
      );
      return data.data;
    },
    onMutate: async (input: ParentSendMessageInput): Promise<SendContext> => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<ParentMessageThreadItem[]>(queryKey);
      const optimisticId = `optimistic-${crypto.randomUUID()}`;
      const optimistic = buildOptimisticMessage(optimisticId, input.content);
      queryClient.setQueryData<ParentMessageThreadItem[]>(queryKey, (current) => [
        ...(current ?? []),
        optimistic,
      ]);
      return { previous, optimisticId };
    },
    onError: (_error, _input, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSuccess: (created, _input, context) => {
      queryClient.setQueryData<ParentMessageThreadItem[]>(queryKey, (current) =>
        (current ?? []).map((message) =>
          message.documentId === context.optimisticId ? created : message,
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: PARENT_CONVERSATIONS_QUERY_KEY });
    },
  });
}
