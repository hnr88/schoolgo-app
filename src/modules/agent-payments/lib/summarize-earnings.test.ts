import { describe, expect, it } from 'vitest';
import { summarizeEarnings } from '@/modules/agent-payments/lib/summarize-earnings';
import type { AgentPayment } from '@/modules/agent-payments/types/agent-payment.types';

function payment(overrides: Partial<AgentPayment>): AgentPayment {
  return {
    documentId: 'p',
    amountAud: 1000,
    method: 'bank_transfer',
    status: 'completed',
    paidAt: '2026-06-10T00:00:00.000Z',
    createdAt: '2026-06-10T00:00:00.000Z',
    ...overrides,
  };
}

const reference = new Date('2026-06-15T00:00:00.000Z');

describe('summarizeEarnings', () => {
  it('sums amounts by status', () => {
    const summary = summarizeEarnings(
      [
        payment({ amountAud: 1000, status: 'completed' }),
        payment({ amountAud: 500, status: 'completed' }),
        payment({ amountAud: 250, status: 'pending' }),
        payment({ amountAud: 100, status: 'refunded' }),
        payment({ amountAud: 999, status: 'failed' }),
      ],
      reference,
    );
    expect(summary.totalCompleted).toBe(1500);
    expect(summary.totalPending).toBe(250);
    expect(summary.totalRefunded).toBe(100);
    expect(summary.count).toBe(5);
  });

  it('counts only completed payments paid in the reference month toward this month', () => {
    const summary = summarizeEarnings(
      [
        payment({ amountAud: 800, status: 'completed', paidAt: '2026-06-02T00:00:00.000Z' }),
        payment({ amountAud: 400, status: 'completed', paidAt: '2026-05-30T00:00:00.000Z' }),
        payment({ amountAud: 200, status: 'pending', paidAt: '2026-06-05T00:00:00.000Z' }),
      ],
      reference,
    );
    expect(summary.thisMonthCompleted).toBe(800);
  });

  it('falls back to createdAt when paidAt is missing', () => {
    const summary = summarizeEarnings(
      [payment({ amountAud: 300, status: 'completed', paidAt: null, createdAt: '2026-06-09T00:00:00.000Z' })],
      reference,
    );
    expect(summary.thisMonthCompleted).toBe(300);
  });

  it('returns a zeroed summary for an empty ledger', () => {
    expect(summarizeEarnings([], reference)).toEqual({
      totalCompleted: 0,
      totalPending: 0,
      totalRefunded: 0,
      thisMonthCompleted: 0,
      count: 0,
    });
  });
});
