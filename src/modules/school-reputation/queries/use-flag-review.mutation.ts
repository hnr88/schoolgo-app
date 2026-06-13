'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { SCHOOL_REPUTATION_REVIEWS_QUERY_KEY } from '@/modules/school-reputation/constants/school-reputation.constants';
import { flagResponseSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import type { FlagValues } from '@/modules/school-reputation/types/school-reputation.types';

export function useFlagReview(documentId: string) {
  const queryClient = useQueryClient();
  const t = useTranslations('SchoolReputation');

  return useMutation({
    mutationFn: async (values: FlagValues) => {
      const { data } = await privateApi.post<unknown>(
        `/api/school-staffs/me/reviews/${documentId}/flag`,
        { data: { reason: values.reason } },
      );
      return flagResponseSchema.parse(data);
    },
    onSuccess: () => {
      toast.success(t('flagSuccess'));
      queryClient.invalidateQueries({ queryKey: SCHOOL_REPUTATION_REVIEWS_QUERY_KEY });
    },
    onError: (error) => {
      const message =
        isAxiosError(error) && typeof error.response?.data?.error?.message === 'string'
          ? error.response.data.error.message
          : t('flagError');
      toast.error(message);
    },
  });
}
