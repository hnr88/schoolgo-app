'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolStaffTeamResponse } from '@/modules/school-staff/types/school-staff.types';

export const SCHOOL_STAFF_QUERY_KEY = ['school', 'staff', 'team'] as const;

export function useSchoolStaff() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SCHOOL_STAFF_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<SchoolStaffTeamResponse>(
        '/api/school-staffs/me/team',
      );
      return data;
    },
  });
}
