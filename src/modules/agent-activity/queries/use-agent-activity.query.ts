'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { AGENT_ACTIVITY_PAGE_SIZE } from '@/modules/agent-activity/constants/agent-activity.constants';
import { agentActivityResponseSchema } from '@/modules/agent-activity/schemas/agent-activity.schema';
import type { AgentActivityHistory } from '@/modules/agent-activity/types/agent-activity.types';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

async function fetchAgentActivity(
  page: number,
  pageSize: number,
): Promise<AgentActivityHistory> {
  const { data } = await privateApi.get('/api/agents/me/activity-feed', {
    params: { page, pageSize },
  });
  const parsed = agentActivityResponseSchema.parse(data);

  return {
    events: parsed.data.map((event) => ({
      ...event,
      actorRole: event.actorRole ?? 'system',
      application: event.application
        ? {
            ...event.application,
            school: event.application.school ?? null,
            student: event.application.student ?? null,
          }
        : null,
    })),
    pagination: parsed.meta.pagination,
  };
}

export function useAgentActivity(
  page: number,
  pageSize: number = AGENT_ACTIVITY_PAGE_SIZE,
) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'activity', page, pageSize],
    queryFn: () => fetchAgentActivity(page, pageSize),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
