'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolUserMe } from '@/modules/school-settings/types/school-settings.types';

export function useSchoolMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<SchoolUserMe>('/api/users/me');
      return data;
    },
  });
}
