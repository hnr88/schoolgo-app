'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolPayoutsResponse } from '@/modules/school-invoices/types/school-invoices.types';

export function useSchoolPayouts() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'payouts'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<SchoolPayoutsResponse>('/api/payouts/mine');
      return data.data;
    },
  });
}
