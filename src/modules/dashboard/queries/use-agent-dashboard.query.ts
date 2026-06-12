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
      const [stats, activity, deadlines, actionItems] = await Promise.allSettled([
        privateApi.get<StrapiEnvelope<AgentDashboardStats>>('/api/agents/me/dashboard'),
        privateApi.get<StrapiEnvelope<AgentActivityEvent[]>>('/api/agents/me/activity-feed'),
        privateApi.get<StrapiEnvelope<AgentDeadlinesPayload>>('/api/agents/me/deadlines'),
        privateApi.get<StrapiEnvelope<AgentActionItemsPayload>>('/api/agents/me/action-items'),
      ]);

      logSectionFailures({ stats, activity, deadlines, actionItems });

      return {
        stats: stats.status === 'fulfilled' ? stats.value.data.data : null,
        activity: activity.status === 'fulfilled' ? activity.value.data.data : null,
        deadlines: deadlines.status === 'fulfilled' ? deadlines.value.data.data : null,
        actionItems: actionItems.status === 'fulfilled' ? actionItems.value.data.data : null,
        sectionErrors: {
          stats: stats.status === 'rejected',
          activity: activity.status === 'rejected',
          deadlines: deadlines.status === 'rejected',
          actionItems: actionItems.status === 'rejected',
        },
      };
    },
  });
}

function logSectionFailures(results: {
  stats: PromiseSettledResult<unknown>;
  activity: PromiseSettledResult<unknown>;
  deadlines: PromiseSettledResult<unknown>;
  actionItems: PromiseSettledResult<unknown>;
}): void {
  for (const [section, result] of Object.entries(results)) {
    if (result.status === 'rejected') {
      console.warn(`[useAgentDashboard] ${section} failed to load`, result.reason);
    }
  }
}
