'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  ServiceCatalogCategory,
  ServiceCatalogItem,
  ServiceCatalogResponse,
} from '@/modules/school-applications/types/school-applications.types';

export const SERVICE_CATALOG_QUERY_KEY = ['service-catalog'] as const;

export interface UseServiceCatalogParams {
  active?: boolean;
  category?: ServiceCatalogCategory;
}

export function useServiceCatalog({ active, category }: UseServiceCatalogParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...SERVICE_CATALOG_QUERY_KEY, { active, category }],
    enabled: isAuthenticated,
    queryFn: async (): Promise<ServiceCatalogItem[]> => {
      const params: Record<string, unknown> = {};
      if (active !== undefined) params.active = active;
      if (category) params.category = category;

      const { data } = await privateApi.get<ServiceCatalogResponse>(
        '/api/service-catalog-items/mine',
        { params },
      );
      return data.data;
    },
  });
}
