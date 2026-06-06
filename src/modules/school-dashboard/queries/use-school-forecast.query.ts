'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  IntakeForecast,
  IntakeForecastEnvelope,
  IntakeForecastParams,
} from '@/modules/school-dashboard/types/school-analytics.types';

export function useSchoolForecast({ intakeYear }: IntakeForecastParams = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<IntakeForecast>({
    queryKey: ['school-forecast', { intakeYear }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, number> = {};
      if (intakeYear !== undefined) params.intakeYear = intakeYear;

      const res = await privateApi.get<IntakeForecastEnvelope>(
        '/api/school-staffs/me/analytics/intake-forecast',
        { params },
      );
      return res.data.data;
    },
  });
}
