import type { AgentPayment, AgentPaymentMethod } from '@/modules/agent-payments';
import type {
  EarningsAggregation,
  MethodEarnings,
  MonthlyEarnings,
} from '@/modules/agent-earnings/types/agent-earnings.types';

const WINDOW_MONTHS = 12;

// Month bucketing uses `paidAt` (settlement date). The AgentPayment shape's only
// other date fields are `createdAt`/`updatedAt`; payments without `paidAt` fall
// back to `createdAt` (immutable record date) — never `updatedAt`, which shifts
// on any edit. All bucketing is UTC for determinism.
function effectiveMonthIndex(payment: AgentPayment): number | null {
  for (const value of [payment.paidAt, payment.createdAt]) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.getUTCFullYear() * 12 + date.getUTCMonth();
    }
  }
  return null;
}

function monthKey(index: number): string {
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
}

// The chart window is anchored to the data's own date range (not the clock):
// continuous months ending at the latest effective month, clipped to at most
// the last 12 months and never before the earliest effective month.
function aggregateByMonth(payments: AgentPayment[]): MonthlyEarnings[] {
  const indices = payments
    .map(effectiveMonthIndex)
    .filter((index): index is number => index !== null);
  if (indices.length === 0) return [];

  const last = Math.max(...indices);
  const first = Math.max(Math.min(...indices), last - (WINDOW_MONTHS - 1));

  const buckets = new Map<number, number>();
  for (let index = first; index <= last; index += 1) buckets.set(index, 0);

  for (const payment of payments) {
    if (payment.status !== 'completed') continue;
    const index = effectiveMonthIndex(payment);
    if (index === null || !buckets.has(index)) continue;
    buckets.set(index, (buckets.get(index) ?? 0) + payment.amountAud);
  }

  return [...buckets.entries()].map(([index, completedAud]) => ({
    month: monthKey(index),
    completedAud,
  }));
}

// Only methods present in the data appear, ordered by completed amount
// (descending), then count, then method name for determinism.
function aggregateByMethod(payments: AgentPayment[]): MethodEarnings[] {
  const rows = new Map<AgentPaymentMethod, MethodEarnings>();

  for (const payment of payments) {
    const row = rows.get(payment.method) ?? {
      method: payment.method,
      completedAud: 0,
      count: 0,
    };
    row.count += 1;
    if (payment.status === 'completed') row.completedAud += payment.amountAud;
    rows.set(payment.method, row);
  }

  return [...rows.values()].sort(
    (a, b) =>
      b.completedAud - a.completedAud ||
      b.count - a.count ||
      a.method.localeCompare(b.method),
  );
}

export function aggregateEarnings(payments: AgentPayment[]): EarningsAggregation {
  const totals = {
    completedAud: 0,
    pendingAud: 0,
    refundedAud: 0,
    failedCount: 0,
  };

  for (const payment of payments) {
    if (payment.status === 'completed') totals.completedAud += payment.amountAud;
    else if (payment.status === 'pending') totals.pendingAud += payment.amountAud;
    else if (payment.status === 'refunded') totals.refundedAud += payment.amountAud;
    else if (payment.status === 'failed') totals.failedCount += 1;
  }

  return {
    totals,
    byMonth: aggregateByMonth(payments),
    byMethod: aggregateByMethod(payments),
  };
}
