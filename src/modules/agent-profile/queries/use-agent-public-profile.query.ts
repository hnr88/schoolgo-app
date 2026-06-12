'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiEnvelope } from '@/modules/dashboard/types/agent-dashboard.types';
import type { AgentPublicProfilePreview } from '@/modules/agent-profile/types/agent-profile.types';

export const AGENT_PUBLIC_PROFILE_QUERY_KEY = ['agent-public-profile'] as const;

/**
 * Self preview/editor source for the profile builder. Hits the extended
 * `GET /api/agents/me/public-preview` (privateApi → authed agent) which returns
 * the full public projection PLUS the builder-only context: `sectionVisibility`
 * map, the live `completeness`, the stored `completenessScore`, and
 * `publicProfileEnabled` / `status`. Edit + preview share one source.
 */
export function useAgentPublicProfile() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AgentPublicProfilePreview>({
    queryKey: AGENT_PUBLIC_PROFILE_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await privateApi.get<StrapiEnvelope<AgentPublicProfilePreview>>(
        '/api/agents/me/public-preview',
      );
      return data.data;
    },
  });
}
