'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import {
  WAITLIST_QUERY_KEY,
  YIELD_PLAN_QUERY_KEY,
} from '@/modules/school-capacity-planner/constants/capacity-planner.constants';
import { promoteWaitlistSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type { PromoteWaitlistFormValues } from '@/modules/school-capacity-planner/types/capacity-planner.types';

interface PromoteWaitlistVariables extends PromoteWaitlistFormValues {
  documentId: string;
}

export function usePromoteWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ documentId, ...input }: PromoteWaitlistVariables) => {
      const parsed = promoteWaitlistSchema.parse(input);
      const { data } = await privateApi.post<unknown>(
        `/api/school-staffs/me/capacity/waitlist/${documentId}/promote`,
        { data: parsed },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAITLIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: YIELD_PLAN_QUERY_KEY });
    },
  });
}
