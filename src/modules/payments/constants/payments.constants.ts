import { Wallet, ReceiptText, CalendarClock, CreditCard } from 'lucide-react';
import type {
  BalancePoint,
  EarningPoint,
  PaymentStatTileConfig,
  PaymentStatus,
  PaymentStatusStyle,
  PaymentTransaction,
  SpendCategory,
} from '@/modules/payments/types/payments.types';

export const PAYMENT_STAT_TILES: PaymentStatTileConfig[] = [
  { key: 'balanceDue', icon: Wallet, labelKey: 'stats.balanceDue.label', subKey: 'stats.balanceDue.sub', value: 199, format: 'aud' },
  { key: 'totalPaid', icon: ReceiptText, labelKey: 'stats.totalPaid.label', subKey: 'stats.totalPaid.sub', value: 1047, format: 'aud' },
  { key: 'upcoming', icon: CalendarClock, labelKey: 'stats.upcoming.label', subKey: 'stats.upcoming.sub', value: 399, format: 'aud' },
  { key: 'methods', icon: CreditCard, labelKey: 'stats.methods.label', subKey: 'stats.methods.sub', value: 2, format: 'count' },
];

export const EARNING_OVERVIEW: EarningPoint[] = [
  { monthIndex: 0, paid: 199, scheduled: 0 },
  { monthIndex: 1, paid: 449, scheduled: 0 },
  { monthIndex: 2, paid: 0, scheduled: 199 },
  { monthIndex: 3, paid: 399, scheduled: 0 },
  { monthIndex: 4, paid: 0, scheduled: 199 },
  { monthIndex: 5, paid: 0, scheduled: 399 },
];

export const SPEND_BREAKDOWN: SpendCategory[] = [
  { key: 'practice', labelKey: 'breakdown.categories.practice', value: 398, color: 'var(--primary)' },
  { key: 'placement', labelKey: 'breakdown.categories.placement', value: 449, color: 'var(--ink-900)' },
  { key: 'progress', labelKey: 'breakdown.categories.progress', value: 399, color: 'var(--foggy)' },
  { key: 'other', labelKey: 'breakdown.categories.other', value: 120, color: 'var(--quill)' },
];

export const BALANCE_TREND: BalancePoint[] = [
  { monthIndex: 0, value: 199 },
  { monthIndex: 1, value: 648 },
  { monthIndex: 2, value: 648 },
  { monthIndex: 3, value: 1047 },
  { monthIndex: 4, value: 1047 },
  { monthIndex: 5, value: 1246 },
];

export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  { id: 'inv-1047', invoiceNumber: 'INV-1047', descriptionKey: 'transactions.items.progress', amount: 399, status: 'upcoming', date: '2026-07-01' },
  { id: 'inv-1042', invoiceNumber: 'INV-1042', descriptionKey: 'transactions.items.practice', amount: 199, status: 'pending', date: '2026-06-01' },
  { id: 'inv-1031', invoiceNumber: 'INV-1031', descriptionKey: 'transactions.items.placement', amount: 449, status: 'paid', date: '2026-05-12' },
  { id: 'inv-1018', invoiceNumber: 'INV-1018', descriptionKey: 'transactions.items.practice', amount: 199, status: 'paid', date: '2026-04-02' },
];

export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, PaymentStatusStyle> = {
  paid: { bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint', dot: 'bg-vivid-mint' },
  pending: { bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber', dot: 'bg-vivid-amber' },
  upcoming: { bg: 'bg-muted', text: 'text-foggy', dot: 'bg-quill' },
};

export const PAYMENT_STATUS_LABEL_KEY: Record<PaymentStatus, string> = {
  paid: 'transactions.status.paid',
  pending: 'transactions.status.pending',
  upcoming: 'transactions.status.upcoming',
};

export const EARNING_SERIES_COLORS = {
  paid: 'var(--primary)',
  scheduled: 'var(--quill)',
} as const;

export const TREND_STROKE = 'var(--primary)';
