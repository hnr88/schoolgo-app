import {
  DIRECT_ROW_KEY,
  LOW_CONVERSION_MIN_SUBMITTED,
  LOW_CONVERSION_OFFER_RATE,
} from '@/modules/school-agent-performance/constants/agent-performance.constants';
import type { AgentPerformanceRow } from '@/modules/school-agent-performance/types/agent-performance.types';

export function rowKey(row: AgentPerformanceRow): string {
  return row.agentDocumentId ?? DIRECT_ROW_KEY;
}

// Top performer: the single row with the highest enrolled count (> 0);
// ties broken by higher offerRate, then by higher submitted volume.
export function findTopPerformerKey(rows: AgentPerformanceRow[]): string | null {
  let top: AgentPerformanceRow | null = null;
  for (const row of rows) {
    if (row.enrolled === 0) continue;
    if (
      top === null ||
      row.enrolled > top.enrolled ||
      (row.enrolled === top.enrolled && row.offerRate > top.offerRate) ||
      (row.enrolled === top.enrolled &&
        row.offerRate === top.offerRate &&
        row.submitted > top.submitted)
    ) {
      top = row;
    }
  }
  return top === null ? null : rowKey(top);
}

// Low conversion: offerRate below threshold with a meaningful sample size.
export function isLowConversion(row: AgentPerformanceRow): boolean {
  return row.submitted >= LOW_CONVERSION_MIN_SUBMITTED && row.offerRate < LOW_CONVERSION_OFFER_RATE;
}
