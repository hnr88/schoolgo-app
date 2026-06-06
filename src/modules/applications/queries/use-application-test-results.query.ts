'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { TestResultsResponse } from '@/modules/test-results';

export function useApplicationTestResults(studentDocumentId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'application-test-results', studentDocumentId],
    enabled: isAuthenticated && Boolean(studentDocumentId),
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'filters[student][documentId][$eq]': studentDocumentId,
        'populate[student][fields][0]': 'documentId',
        'populate[student][fields][1]': 'firstName',
        'populate[student][fields][2]': 'lastName',
        'populate[reportDocument][fields][0]': 'documentId',
        'populate[reportDocument][fields][1]': 'fileName',
        'populate[reportDocument][populate][file][fields][0]': 'url',
        'populate[reportDocument][populate][file][fields][1]': 'name',
        'pagination[pageSize]': 50,
        'pagination[withCount]': true,
        'sort[0]': 'testDate:desc',
      };

      const { data } = await privateApi.get<TestResultsResponse>('/api/english-test-results', {
        params,
      });
      return data;
    },
  });
}
