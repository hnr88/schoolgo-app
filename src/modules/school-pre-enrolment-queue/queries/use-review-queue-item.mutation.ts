'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { PRE_ENROLMENT_QUEUE_KEY } from '@/modules/school-pre-enrolment-queue/queries/use-pre-enrolment-queue.query';
import {
  reviewQueueItemSchema,
  type ReviewQueueItemInput,
} from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

interface ReviewQueueItemVariables extends ReviewQueueItemInput {
  itemDocumentId: string;
  applicationDocumentId: string | null;
}

export function useReviewQueueItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ReviewQueueItemVariables) => {
      const payload = reviewQueueItemSchema.parse({
        status: input.status,
        note: input.note,
      });
      const { data } = await privateApi.put<unknown>(
        `/api/pre-enrolment-items/${input.itemDocumentId}/status`,
        { data: payload },
      );
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRE_ENROLMENT_QUEUE_KEY });
      if (variables.applicationDocumentId) {
        queryClient.invalidateQueries({
          queryKey: ['school-applications', variables.applicationDocumentId],
        });
      }
    },
  });
}
