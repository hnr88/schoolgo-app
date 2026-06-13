'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { WAITLIST_QUERY_KEY } from '@/modules/school-capacity-planner/constants/capacity-planner.constants';
import { addWaitlistSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type { AddWaitlistFormValues } from '@/modules/school-capacity-planner/types/capacity-planner.types';

export function useAddWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddWaitlistFormValues) => {
      const parsed = addWaitlistSchema.parse(input);
      const payload: Record<string, string> = {
        applicationDocumentId: parsed.applicationDocumentId,
      };
      if (parsed.intakePeriod) payload.intakePeriod = parsed.intakePeriod;
      if (parsed.yearLevel) payload.yearLevel = parsed.yearLevel;
      const { data } = await privateApi.post<unknown>(
        '/api/school-staffs/me/capacity/waitlist',
        { data: payload },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAITLIST_QUERY_KEY });
    },
  });
}
