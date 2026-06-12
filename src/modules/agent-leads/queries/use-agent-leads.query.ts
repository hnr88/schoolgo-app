'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  AGENT_LEADS_ENDPOINT,
  AGENT_LEADS_QUERY_KEY,
} from '@/modules/agent-leads/constants/agent-leads.constants';
import { agentLeadsResponseSchema } from '@/modules/agent-leads/schemas/agent-leads.schema';
import type { AgentLeadsResponse } from '@/modules/agent-leads/types/agent-leads.types';

const EMPTY_LEADS: AgentLeadsResponse = { data: [], meta: { total: 0 } };

async function fetchAgentLeads(): Promise<AgentLeadsResponse> {
  const { data } = await privateApi.get(AGENT_LEADS_ENDPOINT);
  const parsed = agentLeadsResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useAgentLeads] unexpected response shape', parsed.error.issues);
    return EMPTY_LEADS;
  }
  return parsed.data;
}

export function useAgentLeads() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: AGENT_LEADS_QUERY_KEY,
    queryFn: fetchAgentLeads,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
