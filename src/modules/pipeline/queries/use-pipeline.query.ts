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
      const PAGE_SIZE = 100; // backend hard-caps pageSize at 100
      const baseParams = {
        'pagination[pageSize]': PAGE_SIZE,
        'pagination[withCount]': true,
        'sort[0]': 'createdAt:desc',
        'populate[student][fields][0]': 'firstName',
        'populate[student][fields][1]': 'lastName',
        'populate[student][fields][2]': 'nationality',
        'populate[school][fields][0]': 'name',
        'populate[school][fields][1]': 'state',
        'populate[school][fields][2]': 'cricosCode',
      };

      const first = await privateApi.get<StrapiApplicationListResponse>('/api/applications', {
        params: { ...baseParams, 'pagination[page]': 1 },
      });
      const total = first.data.meta.pagination.total;
      const pageCount = first.data.meta.pagination.pageCount;
      const rows = [...first.data.data];

      if (pageCount > 1) {
        const rest = await Promise.all(
          Array.from({ length: pageCount - 1 }, (_, i) =>
            privateApi.get<StrapiApplicationListResponse>('/api/applications', {
              params: { ...baseParams, 'pagination[page]': i + 2 },
            }),
          ),
        );
        for (const res of rest) rows.push(...res.data.data);
      }

      const applications = rows.map(withApplicationComputedFields);
      return {
        applications,
        byColumn: groupByColumn(applications),
        total,
      };
    },
  });
}
