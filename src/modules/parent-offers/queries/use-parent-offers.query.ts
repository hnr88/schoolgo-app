'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  PARENT_OFFERS_PAGE_SIZE,
  PARENT_OFFERS_POPULATE,
  PARENT_OFFERS_QUERY_KEY,
  PARENT_OFFER_STATUSES,
} from '@/modules/parent-offers/constants/parent-offers.constants';
import type { ParentApplicationsResponse } from '@/modules/applications/types/parent-application.types';

export function useParentOffers(student?: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useInfiniteQuery({
    queryKey: [...PARENT_OFFERS_QUERY_KEY, student],
    enabled: isAuthenticated,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params: Record<string, unknown> = {
        ...PARENT_OFFERS_POPULATE,
        'pagination[page]': pageParam,
        'pagination[pageSize]': PARENT_OFFERS_PAGE_SIZE,
        'pagination[withCount]': true,
        'sort[0]': 'statusChangedAt:desc',
      };

      PARENT_OFFER_STATUSES.forEach((status, index) => {
        params[`filters[status][$in][${index}]`] = status;
      });

      if (student) {
        params['filters[student][documentId][$eq]'] = student;
      }

      const { data } = await privateApi.get<ParentApplicationsResponse>('/api/applications', {
        params,
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
  });
}
