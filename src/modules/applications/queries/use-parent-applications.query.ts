'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  PARENT_APPLICATION_POPULATE,
  PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
} from '@/modules/applications/constants/parent-applications.constants';
import type {
  ParentApplicationsResponse,
  UseParentApplicationsParams,
} from '@/modules/applications/types/parent-application.types';

export function useParentApplications({
  page = 1,
  pageSize = PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
  status,
  student,
  search,
  sort,
}: UseParentApplicationsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'applications', { page, pageSize, status, student, search, sort }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        ...PARENT_APPLICATION_POPULATE,
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'pagination[withCount]': true,
        'sort[0]': sort || 'createdAt:desc',
      };

      if (status && status !== 'all') {
        params['filters[status][$eq]'] = status;
      }

      if (student) {
        params['filters[student][documentId][$eq]'] = student;
      }

      const trimmedSearch = search?.trim();
      if (trimmedSearch) {
        params['filters[$or][0][student][firstName][$containsi]'] = trimmedSearch;
        params['filters[$or][1][student][lastName][$containsi]'] = trimmedSearch;
        params['filters[$or][2][school][name][$containsi]'] = trimmedSearch;
      }

      const { data } = await privateApi.get<ParentApplicationsResponse>('/api/applications', {
        params,
      });
      return data;
    },
  });
}
