'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  SCHOOL_REPUTATION_PAGE_SIZE,
  SCHOOL_REPUTATION_REVIEWS_QUERY_KEY,
} from '@/modules/school-reputation/constants/school-reputation.constants';
import { reputationReviewsResponseSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import type { ReputationReviewsResponse } from '@/modules/school-reputation/types/school-reputation.types';

export function useReputationReviews() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<ReputationReviewsResponse>({
    queryKey: [...SCHOOL_REPUTATION_REVIEWS_QUERY_KEY],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<unknown>('/api/school-staffs/me/reviews', {
        params: { pageSize: SCHOOL_REPUTATION_PAGE_SIZE },
      });
      return reputationReviewsResponseSchema.parse(data);
    },
  });
}
