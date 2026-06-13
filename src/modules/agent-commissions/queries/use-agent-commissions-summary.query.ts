'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  AGENT_COMMISSIONS_QUERY_KEY,
  AGENT_COMMISSIONS_SUMMARY_ENDPOINT,
} from '@/modules/agent-commissions/constants/agent-commissions.constants';
import { commissionSummaryResponseSchema } from '@/modules/agent-commissions/schemas/agent-commissions.schema';
import type { CommissionSummary } from '@/modules/agent-commissions/types/agent-commissions.types';

const EMPTY_SUMMARY: CommissionSummary = {
  expectedAud: 0,
  accruedAud: 0,
  receivedAud: 0,
  outstandingAud: 0,
  counts: { total: 0, byStatus: {} },
};

async function fetchAgentCommissionsSummary(): Promise<CommissionSummary> {
  const { data } = await privateApi.get(AGENT_COMMISSIONS_SUMMARY_ENDPOINT);
  const parsed = commissionSummaryResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useAgentCommissionsSummary] unexpected response shape', parsed.error.issues);
    return EMPTY_SUMMARY;
  }
  return parsed.data.data;
}

export function useAgentCommissionsSummary() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...AGENT_COMMISSIONS_QUERY_KEY, 'summary'],
    queryFn: fetchAgentCommissionsSummary,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
