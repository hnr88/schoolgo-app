'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type { AgentOnboarding } from '@/modules/agent-profile/types/agent-profile.types';

export const AGENT_ONBOARDING_QUERY_KEY = ['agent-onboarding'] as const;

export function useAgentOnboarding() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentOnboarding>({
    queryKey: AGENT_ONBOARDING_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiEnvelope<AgentOnboarding>>(
        '/api/agents/me/onboarding',
      );
      return data.data;
    },
  });
}
