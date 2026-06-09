'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolUserMe } from '@/modules/school-settings/types/school-settings.types';

export function useSchoolMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Scope the cache to the authenticated user so two accounts on the same
  // browser can never share the ['school','me'] slot (mirrors the parent me key).
  const userId = useAuthStore((s) => s.user?.id ?? null);

  return useQuery({
    queryKey: ['school', 'me', userId],
    enabled: isAuthenticated,
    staleTime: 0,
    queryFn: async () => {
      const { data } = await privateApi.get<SchoolUserMe>('/api/users/me');
      return data;
    },
  });
}
