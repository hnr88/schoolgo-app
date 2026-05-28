'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type { AgentVerificationStatus } from '@/modules/agent-profile/types/agent-profile.types';

export const AGENT_VERIFICATION_QUERY_KEY = ['agent-verification-status'] as const;

export function useAgentVerificationStatus() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentVerificationStatus>({
    queryKey: AGENT_VERIFICATION_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiEnvelope<AgentVerificationStatus>>(
        '/api/agents/me/verification-status',
      );
      return data.data;
    },
  });
}
