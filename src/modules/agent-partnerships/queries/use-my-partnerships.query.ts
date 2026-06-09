'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { myPartnershipsResponseSchema } from '@/modules/agent-partnerships/schemas/agent-partnership.schema';
import type { AgentPartnership } from '@/modules/agent-partnerships/types/agent-partnership.types';

export const MY_PARTNERSHIPS_QUERY_KEY = ['agent', 'partnerships', 'mine'] as const;

async function fetchMyPartnerships(): Promise<AgentPartnership[]> {
  const { data } = await privateApi.get('/api/agent-partnerships/mine');
  return myPartnershipsResponseSchema.parse(data).data;
}

export function useMyPartnerships() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: MY_PARTNERSHIPS_QUERY_KEY,
    queryFn: fetchMyPartnerships,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
