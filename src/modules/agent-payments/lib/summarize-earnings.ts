import type {
  AgentEarningsSummary,
  AgentPayment,
} from '@/modules/agent-payments/types/agent-payment.types';

function inReferenceMonth(value: string | null | undefined, reference: Date): boolean {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth()
  );
}

// Aggregate an agent's payment ledger. `reference` is injected (not read from the
// clock) so the month rollup is deterministic and unit-testable.
export function summarizeEarnings(
  payments: AgentPayment[],
  reference: Date,
): AgentEarningsSummary {
  const summary: AgentEarningsSummary = {
    totalCompleted: 0,
    totalPending: 0,
    totalRefunded: 0,
    thisMonthCompleted: 0,
    count: payments.length,
  };

  for (const payment of payments) {
    if (payment.status === 'completed') {
      summary.totalCompleted += payment.amountAud;
      if (inReferenceMonth(payment.paidAt ?? payment.createdAt, reference)) {
        summary.thisMonthCompleted += payment.amountAud;
      }
    } else if (payment.status === 'pending') {
      summary.totalPending += payment.amountAud;
    } else if (payment.status === 'refunded') {
      summary.totalRefunded += payment.amountAud;
    }
  }

  return summary;
}
