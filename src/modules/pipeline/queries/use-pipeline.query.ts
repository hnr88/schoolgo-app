'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { withApplicationComputedFields } from '@/modules/applications/lib/format';
import { groupByColumn } from '@/modules/pipeline/lib/group-pipeline';
import type { StrapiApplicationListResponse } from '@/modules/applications/types/application.types';

export const PIPELINE_QUERY_KEY = ['pipeline'] as const;

export function usePipeline() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PIPELINE_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiApplicationListResponse>('/api/applications', {
        params: {
          'pagination[pageSize]': 500,
          'pagination[withCount]': true,
          'sort[0]': 'createdAt:desc',
          'populate[student][fields][0]': 'firstName',
          'populate[student][fields][1]': 'lastName',
          'populate[student][fields][2]': 'nationality',
          'populate[school][fields][0]': 'name',
          'populate[school][fields][1]': 'state',
          'populate[school][fields][2]': 'cricosCode',
        },
      });
      const applications = data.data.map(withApplicationComputedFields);
      return {
        applications,
        byColumn: groupByColumn(applications),
        total: data.meta.pagination.total,
      };
    },
  });
}
