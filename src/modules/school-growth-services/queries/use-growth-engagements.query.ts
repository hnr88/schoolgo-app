'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { GROWTH_ENGAGEMENTS_QUERY_KEY } from '@/modules/school-growth-services/constants/growth-services.constants';
import { growthEngagementsResponseSchema } from '@/modules/school-growth-services/schemas/growth-services.schema';
import type { GrowthEngagement } from '@/modules/school-growth-services/types/growth-services.types';

export function useGrowthEngagements() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: GROWTH_ENGAGEMENTS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<GrowthEngagement[]> => {
      const { data } = await privateApi.get<unknown>('/api/school-staffs/me/growth-engagements');
      return growthEngagementsResponseSchema.parse(data).data;
    },
  });
}
