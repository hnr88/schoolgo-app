'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { SCHOOL_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { AnswerQuestionPayload } from '@/modules/parent-ask-school/types/ask-school.types';

export function useAnswerQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionDocumentId, body, publish }: AnswerQuestionPayload) => {
      const { data } = await privateApi.post(
        `/api/school-staffs/me/questions/${questionDocumentId}/answer`,
        { data: { body, publish } },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHOOL_QUESTIONS_QUERY_KEY });
    },
  });
}
