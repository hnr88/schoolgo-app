'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  PARENT_REVIEWS_PAGE_SIZE,
  PARENT_REVIEW_SCHOOLS_QUERY_KEY,
} from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import { toReviewableSchools } from '@/modules/parent-school-reviews/lib/parent-school-reviews';
import type { ParentApplicationsResponse } from '@/modules/applications/types/parent-application.types';
import type { ReviewableSchool } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

export function useReviewableSchools() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<ReviewableSchool[]>({
    queryKey: PARENT_REVIEW_SCHOOLS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentApplicationsResponse>('/api/applications', {
        params: {
          'populate[school][fields][0]': 'name',
          'pagination[page]': 1,
          'pagination[pageSize]': PARENT_REVIEWS_PAGE_SIZE,
          'sort[0]': 'createdAt:desc',
        },
      });
      return toReviewableSchools(data.data);
    },
  });
}
