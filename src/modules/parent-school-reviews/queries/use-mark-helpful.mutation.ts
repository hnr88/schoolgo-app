'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { privateApi } from '@/lib/axios';
import { PARENT_REVIEWS_QUERY_KEY } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import { helpfulResponseSchema } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';

interface MarkHelpfulInput {
  reviewDocumentId: string;
  schoolDocumentId: string;
}

export function useMarkHelpful() {
  const queryClient = useQueryClient();
  const t = useTranslations('ParentReviews');

  return useMutation({
    mutationFn: async ({ reviewDocumentId }: MarkHelpfulInput) => {
      const { data } = await privateApi.post<unknown>(
        `/api/reviews/${reviewDocumentId}/helpful`,
      );
      return helpfulResponseSchema.parse(data);
    },
    onSuccess: (result, { schoolDocumentId }) => {
      toast.success(result.data.alreadyVoted ? t('helpfulAlready') : t('helpfulThanks'));
      queryClient.invalidateQueries({
        queryKey: [...PARENT_REVIEWS_QUERY_KEY, schoolDocumentId],
      });
    },
    onError: () => {
      toast.error(t('helpfulError'));
    },
  });
}
