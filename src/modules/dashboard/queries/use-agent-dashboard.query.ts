'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type {
  AgentActionItemsPayload,
  AgentActivityEvent,
  AgentDashboardData,
  AgentDashboardStats,
  AgentDeadlinesPayload,
  StrapiEnvelope,
} from '@/modules/dashboard/types/agent-dashboard.types';

export function useAgentDashboard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentDashboardData>({
    queryKey: ['agent-dashboard'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const [stats, activity, deadlines, actionItems] = await Promise.all([
        privateApi.get<StrapiEnvelope<AgentDashboardStats>>('/api/agents/me/dashboard'),
        privateApi.get<StrapiEnvelope<AgentActivityEvent[]>>('/api/agents/me/activity-feed'),
        privateApi.get<StrapiEnvelope<AgentDeadlinesPayload>>('/api/agents/me/deadlines'),
        privateApi.get<StrapiEnvelope<AgentActionItemsPayload>>('/api/agents/me/action-items'),
      ]);

      return {
        stats: stats.data.data,
        activity: activity.data.data,
        deadlines: deadlines.data.data,
        actionItems: actionItems.data.data,
      };
    },
  });
}
