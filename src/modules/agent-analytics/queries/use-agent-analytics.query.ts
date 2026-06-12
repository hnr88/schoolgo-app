'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentAnalyticsResponseSchema } from '@/modules/agent-analytics/schemas/agent-analytics.schema';
import type { AgentAnalytics } from '@/modules/agent-analytics/types/agent-analytics.types';

const EMPTY_ANALYTICS: AgentAnalytics = {
  bySchool: [],
  totals: {
    applications: 0,
    submitted: 0,
    offers: 0,
    enrolled: 0,
    offerRate: 0,
    avgDaysToOffer: null,
  },
};

async function fetchAgentAnalytics(): Promise<AgentAnalytics> {
  const { data } = await privateApi.get('/api/agents/me/analytics');
  const parsed = agentAnalyticsResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useAgentAnalytics] unexpected response shape', parsed.error.issues);
    return EMPTY_ANALYTICS;
  }
  return parsed.data.data;
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
