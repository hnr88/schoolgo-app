'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentAnalyticsResponseSchema } from '@/modules/agent-analytics/schemas/agent-analytics.schema';
import type { AgentAnalytics } from '@/modules/agent-analytics/types/agent-analytics.types';

async function fetchAgentAnalytics(): Promise<AgentAnalytics> {
  const { data } = await privateApi.get('/api/agents/me/analytics');
  return agentAnalyticsResponseSchema.parse(data).data;
}

export function useAgentAnalytics() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'analytics', 'summary'],
    queryFn: fetchAgentAnalytics,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
