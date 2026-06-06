import type {
  PayoutSummary,
  SchoolPayout,
} from '@/modules/school-invoices/types/school-invoices.types';

// Aggregate a school's payout ledger: net already paid vs. gross still upcoming
// (pending or scheduled). Failed payouts are excluded from both totals.
export function summarizePayouts(payouts: SchoolPayout[]): PayoutSummary {
  let paidNet = 0;
  let upcoming = 0;

  for (const payout of payouts) {
    if (payout.status === 'paid') {
      paidNet += payout.netAmountAud ?? payout.amountAud;
    } else if (payout.status === 'pending' || payout.status === 'scheduled') {
      upcoming += payout.amountAud;
    }
  }

  return { paidNet, upcoming, count: payouts.length };
}
