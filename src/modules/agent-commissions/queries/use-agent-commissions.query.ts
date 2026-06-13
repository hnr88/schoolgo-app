'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  AGENT_COMMISSIONS_ENDPOINT,
  AGENT_COMMISSIONS_QUERY_KEY,
} from '@/modules/agent-commissions/constants/agent-commissions.constants';
import { commissionsListResponseSchema } from '@/modules/agent-commissions/schemas/agent-commissions.schema';
import type {
  CommissionFilters,
  CommissionsListResponse,
} from '@/modules/agent-commissions/types/agent-commissions.types';

const EMPTY_LIST: CommissionsListResponse = { data: [], meta: {} };

function toParams(filters: CommissionFilters): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.status !== 'all') params.status = filters.status;
  if (filters.milestone !== 'all') params.milestone = filters.milestone;
  return params;
}

async function fetchAgentCommissions(
  filters: CommissionFilters,
): Promise<CommissionsListResponse> {
  const { data } = await privateApi.get(AGENT_COMMISSIONS_ENDPOINT, {
    params: toParams(filters),
  });
  const parsed = commissionsListResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useAgentCommissions] unexpected response shape', parsed.error.issues);
    return EMPTY_LIST;
  }
  return parsed.data;
}

export function useAgentCommissions(filters: CommissionFilters) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...AGENT_COMMISSIONS_QUERY_KEY, 'list', filters.status, filters.milestone],
    queryFn: () => fetchAgentCommissions(filters),
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
