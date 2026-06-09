'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

export function useMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Scope the cache to the authenticated user so two accounts on the same
  // browser can never share the ['parent','me'] slot (which let a not-onboarded
  // account's profileCompleted bounce an onboarded one to /parent/onboarding).
  const userId = useAuthStore((s) => s.user?.id ?? null);

  return useQuery({
    queryKey: ['parent', 'me', userId],
    enabled: isAuthenticated,
    staleTime: 0,
    queryFn: async () => {
      const { data } = await privateApi.get<ParentMe>('/api/users/me');
      return data;
    },
  });
}
