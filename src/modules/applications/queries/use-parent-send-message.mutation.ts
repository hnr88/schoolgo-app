'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PARENT_CONVERSATIONS_QUERY_KEY } from '@/modules/applications/queries/use-parent-conversations.query';
import { parentThreadQueryKey } from '@/modules/applications/queries/use-parent-thread.query';
import type {
  ParentSendMessageInput,
  ParentSendMessageResponse,
} from '@/modules/applications/types/parent-message.types';

export function useParentSendMessage(applicationDocumentId: string) {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parentThreadQueryKey(applicationDocumentId),
      });
      queryClient.invalidateQueries({ queryKey: PARENT_CONVERSATIONS_QUERY_KEY });
    },
  });
}
