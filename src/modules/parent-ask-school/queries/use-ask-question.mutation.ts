'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PARENT_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { AskQuestionPayload } from '@/modules/parent-ask-school/types/ask-school.types';

export function useAskQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ schoolDocumentId, topic, body }: AskQuestionPayload) => {
      const { data } = await privateApi.post(`/api/schools/${schoolDocumentId}/questions`, {
        data: { topic, body },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARENT_QUESTIONS_QUERY_KEY });
    },
  });
}
