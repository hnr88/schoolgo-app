'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { PARENT_REVIEWS_QUERY_KEY } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import { toWriteReviewPayload } from '@/modules/parent-school-reviews/lib/parent-school-reviews';
import type { WriteReviewValues } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';

export function useWriteReview() {
  const queryClient = useQueryClient();
  const t = useTranslations('ParentReviews');

  return useMutation({
    mutationFn: async (values: WriteReviewValues) => {
      const { schoolDocumentId } = values;
      const payload = toWriteReviewPayload(values);
      const { data } = await privateApi.post(
        `/api/schools/${schoolDocumentId}/reviews`,
        { data: payload },
      );
      return data;
    },
    onSuccess: (_data, values) => {
      toast.success(t('submitSuccess'));
      queryClient.invalidateQueries({
        queryKey: [...PARENT_REVIEWS_QUERY_KEY, values.schoolDocumentId],
      });
    },
    onError: (error) => {
      const message =
        isAxiosError(error) && typeof error.response?.data?.error?.message === 'string'
          ? error.response.data.error.message
          : t('submitError');
      toast.error(message);
    },
  });
}
