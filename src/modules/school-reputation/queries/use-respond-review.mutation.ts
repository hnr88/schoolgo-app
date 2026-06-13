'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { SCHOOL_REPUTATION_REVIEWS_QUERY_KEY } from '@/modules/school-reputation/constants/school-reputation.constants';
import { respondResponseSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import type { RespondValues } from '@/modules/school-reputation/types/school-reputation.types';

export function useRespondReview(documentId: string) {
  const queryClient = useQueryClient();
  const t = useTranslations('SchoolReputation');

  return useMutation({
    mutationFn: async (values: RespondValues) => {
      const { data } = await privateApi.post<unknown>(
        `/api/school-staffs/me/reviews/${documentId}/respond`,
        { data: { body: values.body } },
      );
      return respondResponseSchema.parse(data);
    },
    onSuccess: () => {
      toast.success(t('respondSuccess'));
      queryClient.invalidateQueries({ queryKey: SCHOOL_REPUTATION_REVIEWS_QUERY_KEY });
    },
    onError: (error) => {
      const message =
        isAxiosError(error) && typeof error.response?.data?.error?.message === 'string'
          ? error.response.data.error.message
          : t('respondError');
      toast.error(message);
    },
  });
}
