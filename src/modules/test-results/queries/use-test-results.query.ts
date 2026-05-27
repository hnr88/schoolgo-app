'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  TEST_RESULTS_DEFAULT_PAGE_SIZE,
  TEST_RESULTS_POPULATE,
} from '@/modules/test-results/constants/test-results.constants';
import type {
  TestResultsResponse,
  UseTestResultsParams,
} from '@/modules/test-results/types/test-result.types';

export function useTestResults({
  studentDocumentId,
  page = 1,
  pageSize = TEST_RESULTS_DEFAULT_PAGE_SIZE,
}: UseTestResultsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'test-results', studentDocumentId],
    enabled: isAuthenticated && Boolean(studentDocumentId),
    queryFn: async () => {
      const params: Record<string, unknown> = {
        ...TEST_RESULTS_POPULATE,
        'filters[student][documentId][$eq]': studentDocumentId,
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
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
