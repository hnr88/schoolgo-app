'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentFollowUpsResponseSchema } from '@/modules/agent-follow-ups/schemas/agent-follow-ups.schema';
import type { AgentFollowUpsResponse } from '@/modules/agent-follow-ups/types/agent-follow-ups.types';

const EMPTY_FOLLOW_UPS: AgentFollowUpsResponse = {
  data: { staleInReview: [], agingDrafts: [], expiringOffers: [] },
  meta: { counts: { staleInReview: 0, agingDrafts: 0, expiringOffers: 0 } },
};

async function fetchAgentFollowUps(): Promise<AgentFollowUpsResponse> {
  const { data } = await privateApi.get('/api/agents/me/follow-ups');
  const parsed = agentFollowUpsResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useAgentFollowUps] unexpected response shape', parsed.error.issues);
    return EMPTY_FOLLOW_UPS;
  }
  return parsed.data;
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
