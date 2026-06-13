'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { GROWTH_SERVICES_QUERY_KEY } from '@/modules/school-growth-services/constants/growth-services.constants';
import { growthServicesResponseSchema } from '@/modules/school-growth-services/schemas/growth-services.schema';
import type { GrowthService } from '@/modules/school-growth-services/types/growth-services.types';

export function useGrowthServices() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: GROWTH_SERVICES_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<GrowthService[]> => {
      const { data } = await privateApi.get<unknown>('/api/school-staffs/me/growth-services');
      return growthServicesResponseSchema.parse(data).data;
    },
  });
}
