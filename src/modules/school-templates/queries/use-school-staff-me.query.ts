'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolTemplatesStaff } from '@/modules/school-templates/types/staff.types';
import type { StrapiSingle } from '@/modules/school-templates/types/school-templates.types';

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolTemplatesStaff>({
    queryKey: ['school-templates', 'staff-me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiSingle<SchoolTemplatesStaff>>(
        '/api/school-staffs/me',
      );
      return res.data.data;
    },
  });
}
