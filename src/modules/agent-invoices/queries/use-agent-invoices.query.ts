'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { agentInvoicesResponseSchema } from '@/modules/agent-invoices/schemas/agent-invoice.schema';
import { sortByIssuedAtDesc } from '@/modules/agent-invoices/lib/format-invoice';
import type { AgentInvoice } from '@/modules/agent-invoices/types/agent-invoice.types';

async function fetchAgentInvoices(): Promise<AgentInvoice[]> {
  const { data } = await privateApi.get('/api/invoices/mine');
  return sortByIssuedAtDesc(agentInvoicesResponseSchema.parse(data).data);
}

export function useAgentInvoices() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'invoices', 'mine'],
    queryFn: fetchAgentInvoices,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
