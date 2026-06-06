import { describe, expect, it } from 'vitest';
import { summarizePayouts } from '@/modules/school-invoices/lib/summarize-payouts';
import type { SchoolPayout } from '@/modules/school-invoices/types/school-invoices.types';

function payout(overrides: Partial<SchoolPayout>): SchoolPayout {
  return {
    documentId: 'po',
    amountAud: 1000,
    platformFeeAud: 0,
    netAmountAud: 1000,
    status: 'paid',
    scheduledFor: null,
    paidAt: '2026-06-01T00:00:00.000Z',
    reference: null,
    invoice: null,
    application: null,
    ...overrides,
  };
}

describe('summarizePayouts', () => {
  it('sums net for paid and gross for upcoming, ignoring failed', () => {
    const summary = summarizePayouts([
      payout({ status: 'paid', netAmountAud: 900, amountAud: 1000 }),
      payout({ status: 'paid', netAmountAud: 450, amountAud: 500 }),
      payout({ status: 'scheduled', amountAud: 700 }),
      payout({ status: 'pending', amountAud: 300 }),
      payout({ status: 'failed', amountAud: 999 }),
    ]);
    expect(summary).toEqual({ paidNet: 1350, upcoming: 1000, count: 5 });
  });

  it('falls back to gross amount when net is null on a paid payout', () => {
    const summary = summarizePayouts([payout({ status: 'paid', netAmountAud: null, amountAud: 800 })]);
    expect(summary.paidNet).toBe(800);
  });

  it('returns zeros for an empty ledger', () => {
    expect(summarizePayouts([])).toEqual({ paidNet: 0, upcoming: 0, count: 0 });
  });
});
