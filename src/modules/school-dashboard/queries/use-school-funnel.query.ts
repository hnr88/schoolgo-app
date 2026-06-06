'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  FunnelAnalytics,
  FunnelAnalyticsEnvelope,
  FunnelAnalyticsParams,
} from '@/modules/school-dashboard/types/school-analytics.types';

export function useSchoolFunnel({ intakeYear, from, to }: FunnelAnalyticsParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<FunnelAnalytics>({
    queryKey: ['school-funnel', { intakeYear, from, to }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (intakeYear !== undefined) params.intakeYear = intakeYear;
      if (from !== undefined) params.from = from;
      if (to !== undefined) params.to = to;

      const res = await privateApi.get<FunnelAnalyticsEnvelope>(
        '/api/school-staffs/me/analytics/funnel',
        { params },
      );
      return res.data.data;
    },
  });
}
