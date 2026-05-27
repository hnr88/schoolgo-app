'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

export function useMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['parent', 'me'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentMe>('/api/users/me');
      return data;
    },
  });
}
