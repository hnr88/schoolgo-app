import type { AgentPaymentMethod } from '@/modules/agent-payments';

export interface EarningsTotals {
  completedAud: number;
  pendingAud: number;
  refundedAud: number;
  failedCount: number;
}

export interface MonthlyEarnings {
  /** Calendar month in 'YYYY-MM' (UTC). */
  month: string;
  completedAud: number;
}

export interface MethodEarnings {
  method: AgentPaymentMethod;
  completedAud: number;
  count: number;
}

export interface EarningsAggregation {
  totals: EarningsTotals;
  byMonth: MonthlyEarnings[];
  byMethod: MethodEarnings[];
}
