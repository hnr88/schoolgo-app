'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolStaffMe } from '@/modules/school-applications/types/school-applications.types';

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school-staff-me'],
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolStaffMe> => {
      const { data } = await privateApi.get<{ data: SchoolStaffMe }>('/api/school-staffs/me');
      return data.data;
    },
  });
}
