'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  TestCatalogResponse,
  UseTestCatalogParams,
} from '@/modules/test-results/types/test-catalog.types';

export function useTestCatalog({ mode }: UseTestCatalogParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['test-catalog', mode ?? 'all'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params = mode ? { mode } : undefined;
      const { data } = await privateApi.get<TestCatalogResponse>('/api/tests/catalog', {
        params,
      });
      return data;
    },
  });
}
