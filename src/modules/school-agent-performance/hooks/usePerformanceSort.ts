'use client';

import { useMemo, useState } from 'react';
import type {
  AgentPerformanceRow,
  PerformanceSortDirection,
  PerformanceSortKey,
} from '@/modules/school-agent-performance/types/agent-performance.types';

export function usePerformanceSort(byAgent: AgentPerformanceRow[]) {
  const [sortKey, setSortKey] = useState<PerformanceSortKey>('submitted');
  const [direction, setDirection] = useState<PerformanceSortDirection>('desc');

  const handleSort = (key: PerformanceSortKey) => {
    if (key === sortKey) {
      setDirection((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setDirection('desc');
    }
  };

  const rows = useMemo(() => {
    const sign = direction === 'desc' ? -1 : 1;
    return [...byAgent].sort((a, b) => sign * (a[sortKey] - b[sortKey]));
  }, [byAgent, sortKey, direction]);

  return { rows, sortKey, direction, handleSort };
}
