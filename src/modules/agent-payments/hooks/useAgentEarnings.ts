'use client';

import { useMemo } from 'react';
import { useAgentPayments } from '@/modules/agent-payments/queries/use-agent-payments.query';
import { summarizeEarnings } from '@/modules/agent-payments/lib/summarize-earnings';

export function useAgentEarnings() {
  const query = useAgentPayments();
  const payments = useMemo(() => query.data ?? [], [query.data]);

  const summary = useMemo(() => summarizeEarnings(payments, new Date()), [payments]);

  return {
    payments,
    summary,
    isLoading: query.isLoading,
    isError: query.isError,
    isEmpty: !query.isLoading && !query.isError && payments.length === 0,
    refetch: query.refetch,
  };
}
