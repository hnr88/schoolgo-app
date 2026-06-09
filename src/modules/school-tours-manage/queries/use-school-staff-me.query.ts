'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  ToursStaffMe,
  ToursStaffMeResponse,
} from '@/modules/school-tours-manage/types/school-tours-manage.types';

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<ToursStaffMe>({
    queryKey: ['school-tours-manage', 'staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<ToursStaffMeResponse>('/api/school-staffs/me');
      return res.data.data;
    },
  });
}
