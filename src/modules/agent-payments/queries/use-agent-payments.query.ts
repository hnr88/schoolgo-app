'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentPaymentsResponseSchema } from '@/modules/agent-payments/schemas/agent-payment.schema';
import type { AgentPayment } from '@/modules/agent-payments/types/agent-payment.types';

async function fetchAgentPayments(): Promise<AgentPayment[]> {
  const { data } = await privateApi.get('/api/payments/mine');
  return agentPaymentsResponseSchema.parse(data).data;
}

export function useAgentPayments() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'payments', 'mine'],
    queryFn: fetchAgentPayments,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
