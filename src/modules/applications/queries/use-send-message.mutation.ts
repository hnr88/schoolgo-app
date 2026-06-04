'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { AGENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-conversations.query';
import { agentThreadQueryKey } from '@/modules/applications/queries/use-application-messages.query';
import type {
  MessageThreadItem,
  SendMessageInput,
} from '@/modules/applications/types/detail.types';

interface SendContext {
  previous: MessageThreadItem[] | undefined;
  optimisticId: string;
}

function buildOptimisticMessage(optimisticId: string, content: string): MessageThreadItem {
  return {
    id: -1,
    documentId: optimisticId,
    content,
    senderRole: 'agent',
    sender: null,
    createdAt: new Date().toISOString(),
    readAt: null,
  };
}

export function useSendMessage(applicationDocumentId: string) {
  const queryClient = useQueryClient();
  const queryKey = agentThreadQueryKey(applicationDocumentId);

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
    onMutate: async (input: SendMessageInput): Promise<SendContext> => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<MessageThreadItem[]>(queryKey);
      const optimisticId = `optimistic-${crypto.randomUUID()}`;
      const optimistic = buildOptimisticMessage(optimisticId, input.content);
      queryClient.setQueryData<MessageThreadItem[]>(queryKey, (current) => [
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
      queryClient.setQueryData<MessageThreadItem[]>(queryKey, (current) =>
        (current ?? []).map((message) =>
          message.documentId === context.optimisticId ? created : message,
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: AGENT_CONVERSATIONS_QUERY_KEY });
    },
  });
}
