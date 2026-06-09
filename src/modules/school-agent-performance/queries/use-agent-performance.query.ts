'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentPerformanceResponseSchema } from '@/modules/school-agent-performance/schemas/agent-performance.schema';
import type { AgentPerformance } from '@/modules/school-agent-performance/types/agent-performance.types';

async function fetchAgentPerformance(): Promise<AgentPerformance> {
  const { data } = await privateApi.get('/api/school-staffs/me/analytics/agent-performance');
  return agentPerformanceResponseSchema.parse(data).data;
}

export function useAgentPerformance() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['school', 'analytics', 'agent-performance'],
    queryFn: fetchAgentPerformance,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
