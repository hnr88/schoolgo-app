'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  AgentSearchResult,
  StrapiCollection,
} from '@/modules/school-partnerships/types/school-partnerships.types';

export function useAgentSearch(query: string, enabled: boolean) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const trimmed = query.trim();

  return useQuery({
    queryKey: ['school', 'partnerships', 'agent-search', trimmed],
    enabled: isAuthenticated && enabled,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiCollection<AgentSearchResult>>(
        '/api/agent-partnerships/agent-search',
        { params: trimmed ? { q: trimmed } : undefined },
      );
      return data.data;
    },
  });
}
