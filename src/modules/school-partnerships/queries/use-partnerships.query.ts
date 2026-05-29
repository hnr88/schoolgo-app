'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  AgentPartnership,
  StrapiCollection,
} from '@/modules/school-partnerships/types/school-partnerships.types';

export const PARTNERSHIPS_QUERY_KEY = ['school', 'partnerships'] as const;

export function usePartnerships() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PARTNERSHIPS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiCollection<AgentPartnership>>(
        '/api/agent-partnerships/by-school',
      );
      return data.data;
    },
  });
}
