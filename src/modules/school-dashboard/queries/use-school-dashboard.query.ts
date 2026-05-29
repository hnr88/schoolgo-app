'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolDashboardData,
  StrapiEnvelope,
} from '@/modules/school-dashboard/types/school-dashboard.types';

export function useSchoolDashboard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolDashboardData>({
    queryKey: ['school-dashboard'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<SchoolDashboardData>>(
        '/api/school-staffs/me/dashboard',
      );
      return res.data.data;
    },
  });
}
