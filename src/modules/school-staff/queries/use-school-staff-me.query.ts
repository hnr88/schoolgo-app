'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolStaffMe } from '@/modules/school-staff/types/me.types';

interface StrapiSingle<T> {
  data: T;
  meta: Record<string, unknown>;
}

export const SCHOOL_STAFF_ME_QUERY_KEY = ['school', 'staff', 'me'] as const;

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolStaffMe>({
    queryKey: SCHOOL_STAFF_ME_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiSingle<SchoolStaffMe>>('/api/school-staffs/me');
      return res.data.data;
    },
  });
}
