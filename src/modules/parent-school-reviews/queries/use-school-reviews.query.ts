'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/axios';
import { PARENT_REVIEWS_QUERY_KEY } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import { reviewsForSchoolResponseSchema } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';
import type { ReviewsForSchoolResponse } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

export function useSchoolReviews(schoolDocumentId: string | null) {
  return useQuery<ReviewsForSchoolResponse>({
    queryKey: [...PARENT_REVIEWS_QUERY_KEY, schoolDocumentId],
    enabled: Boolean(schoolDocumentId),
    queryFn: async () => {
      const { data } = await publicApi.get<unknown>(
        `/api/schools/${schoolDocumentId}/reviews`,
        { params: { pageSize: 100 } },
      );
      return reviewsForSchoolResponseSchema.parse(data);
    },
  });
}
