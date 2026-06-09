'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  SchoolTeamMember,
  SchoolTeamResponse,
} from '@/modules/school-applications/types/school-applications.types';

export function useSchoolTeam({ enabled = true }: { enabled?: boolean } = {}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'staff', 'team'],
    enabled: isAuthenticated && enabled,
    queryFn: async (): Promise<SchoolTeamMember[]> => {
      const { data } = await privateApi.get<SchoolTeamResponse>('/api/school-staffs/me/team');
      return data.data;
    },
  });
}
