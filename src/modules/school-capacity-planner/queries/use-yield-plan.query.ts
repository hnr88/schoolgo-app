'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import { YIELD_PLAN_QUERY_KEY } from '@/modules/school-capacity-planner/constants/capacity-planner.constants';
import { yieldPlanResponseSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type { YieldPlanIntake } from '@/modules/school-capacity-planner/types/capacity-planner.types';

export function useYieldPlan() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<YieldPlanIntake[]>({
    queryKey: YIELD_PLAN_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<unknown>('/api/school-staffs/me/capacity/yield-plan');
      return yieldPlanResponseSchema.parse(res.data).data.intakes;
    },
  });
}
