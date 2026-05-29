'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolStaffMe,
  StrapiEnvelope,
} from '@/modules/school-dashboard/types/school-dashboard.types';

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolStaffMe>({
    queryKey: ['school-staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<SchoolStaffMe>>(
        '/api/school-staffs/me',
      );
      return res.data.data;
    },
  });
}
