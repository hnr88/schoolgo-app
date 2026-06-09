import { describe, expect, it } from 'vitest';
import { aggregateEarnings } from '@/modules/agent-earnings/lib/aggregate-earnings';
import type { AgentPayment } from '@/modules/agent-payments';

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

describe('aggregateEarnings', () => {
  it('returns a zeroed aggregation for an empty ledger', () => {
    expect(aggregateEarnings([])).toEqual({
      totals: { completedAud: 0, pendingAud: 0, refundedAud: 0, failedCount: 0 },
      byMonth: [],
      byMethod: [],
    });
  });

  it('totals amounts per status and counts failures', () => {
    const { totals } = aggregateEarnings([
      payment({ amountAud: 1000, status: 'completed' }),
      payment({ amountAud: 500, status: 'completed' }),
      payment({ amountAud: 250, status: 'pending' }),
      payment({ amountAud: 100, status: 'refunded' }),
      payment({ amountAud: 999, status: 'failed' }),
      payment({ amountAud: 999, status: 'failed' }),
    ]);
    expect(totals).toEqual({
      completedAud: 1500,
      pendingAud: 250,
      refundedAud: 100,
      failedCount: 2,
    });
  });

  it('buckets completed payments by paidAt month with zero-filled gaps', () => {
    const { byMonth } = aggregateEarnings([
      payment({ amountAud: 300, paidAt: '2026-03-05T00:00:00.000Z' }),
      payment({ amountAud: 200, paidAt: '2026-05-20T00:00:00.000Z' }),
      payment({ amountAud: 100, paidAt: '2026-05-02T00:00:00.000Z' }),
      payment({ amountAud: 999, status: 'pending', paidAt: '2026-04-01T00:00:00.000Z' }),
    ]);
    expect(byMonth).toEqual([
      { month: '2026-03', completedAud: 300 },
      { month: '2026-04', completedAud: 0 },
      { month: '2026-05', completedAud: 300 },
    ]);
  });

  it('falls back to createdAt when paidAt is missing', () => {
    const { byMonth } = aggregateEarnings([
      payment({ amountAud: 400, paidAt: null, createdAt: '2026-02-11T00:00:00.000Z' }),
      payment({ amountAud: 150, paidAt: '2026-03-01T00:00:00.000Z' }),
    ]);
    expect(byMonth).toEqual([
      { month: '2026-02', completedAud: 400 },
      { month: '2026-03', completedAud: 150 },
    ]);
  });

  it('clips the window to the last 12 months of the data range', () => {
    const { byMonth, totals } = aggregateEarnings([
      payment({ amountAud: 700, paidAt: '2024-01-15T00:00:00.000Z' }),
      payment({ amountAud: 500, paidAt: '2026-06-15T00:00:00.000Z' }),
    ]);
    expect(byMonth).toHaveLength(12);
    expect(byMonth[0]).toEqual({ month: '2025-07', completedAud: 0 });
    expect(byMonth[11]).toEqual({ month: '2026-06', completedAud: 500 });
    expect(totals.completedAud).toBe(1200);
  });

  it('groups by method, counting all statuses but summing only completed', () => {
    const { byMethod } = aggregateEarnings([
      payment({ amountAud: 300, method: 'bank_transfer' }),
      payment({ amountAud: 50, method: 'bank_transfer', status: 'failed' }),
      payment({ amountAud: 800, method: 'card' }),
      payment({ amountAud: 200, method: 'card', status: 'pending' }),
      payment({ amountAud: 10, method: 'other', status: 'pending' }),
    ]);
    expect(byMethod).toEqual([
      { method: 'card', completedAud: 800, count: 2 },
      { method: 'bank_transfer', completedAud: 300, count: 2 },
      { method: 'other', completedAud: 0, count: 1 },
    ]);
  });
});
