'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentFollowUpsResponseSchema } from '@/modules/agent-follow-ups/schemas/agent-follow-ups.schema';
import type { AgentFollowUpsResponse } from '@/modules/agent-follow-ups/types/agent-follow-ups.types';

async function fetchAgentFollowUps(): Promise<AgentFollowUpsResponse> {
  const { data } = await privateApi.get('/api/agents/me/follow-ups');
  return agentFollowUpsResponseSchema.parse(data);
}

export function useAgentFollowUps() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'follow-ups'],
    queryFn: fetchAgentFollowUps,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
