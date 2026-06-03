'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';
import type { ParentApplicationsResponse } from '@/modules/applications/types/parent-application.types';

interface UseParentApplicationCountParams {
  statuses: ApplicationStatus[];
  queryKey: string;
  student?: string;
}

export function useParentApplicationCount({
  statuses,
  queryKey,
  student,
}: UseParentApplicationCountParams) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'applications', 'count', queryKey, student],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'fields[0]': 'documentId',
        'pagination[page]': 1,
        'pagination[pageSize]': 1,
        'pagination[withCount]': true,
      };

      statuses.forEach((status, index) => {
        params[`filters[status][$in][${index}]`] = status;
      });

      if (student) {
        params['filters[student][documentId][$eq]'] = student;
      }

      const { data } = await privateApi.get<ParentApplicationsResponse>('/api/applications', {
        params,
      });
      return data.meta.pagination.total;
    },
  });
}
