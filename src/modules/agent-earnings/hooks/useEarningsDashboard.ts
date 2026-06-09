'use client';

import { useMemo } from 'react';
import { useAgentPayments } from '@/modules/agent-payments';
import { aggregateEarnings } from '@/modules/agent-earnings/lib/aggregate-earnings';

export function useEarningsDashboard() {
  const query = useAgentPayments();
  const payments = useMemo(() => query.data ?? [], [query.data]);

  const aggregation = useMemo(() => aggregateEarnings(payments), [payments]);

  return {
    aggregation,
    isLoading: query.isLoading,
    isError: query.isError,
    isEmpty: !query.isLoading && !query.isError && payments.length === 0,
    refetch: query.refetch,
  };
}
