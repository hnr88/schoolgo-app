'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/school-profile/types/school-profile.types';

export interface SchoolStaffMeLite {
  documentId: string;
  permissionLevel: 'admin' | 'staff';
  status: 'active' | 'deactivated';
  school: { documentId: string; name: string };
}

export const SCHOOL_STAFF_ME_QUERY_KEY = ['school-profile-staff-me'] as const;

export function useSchoolStaffMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<SchoolStaffMeLite>({
    queryKey: SCHOOL_STAFF_ME_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<SchoolStaffMeLite>>(
        '/api/school-staffs/me',
      );
      return res.data.data;
    },
  });
}
