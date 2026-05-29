'use client';

import { useTranslations } from 'next-intl';
import { formatAud, sumAud } from '@/modules/school-invoices/lib/format-finance';
import type {
  SchoolInvoice,
  SchoolPayout,
} from '@/modules/school-invoices/types/school-invoices.types';

interface SummaryProps {
  invoices: SchoolInvoice[];
  payouts: SchoolPayout[];
}

export function SchoolFinanceSummary({ invoices, payouts }: SummaryProps) {
  const t = useTranslations('SchoolInvoices');

  const totalInvoiced = sumAud(invoices.map((invoice) => invoice.amountAud));
  const totalPaid = sumAud(
    invoices.filter((invoice) => invoice.status === 'paid').map((invoice) => invoice.amountAud),
  );
  const totalPayouts = sumAud(payouts.map((payout) => payout.netAmountAud ?? payout.amountAud));

  const cards = [
    { key: 'invoiced', label: t('summaryTotalInvoiced'), value: totalInvoiced },
    { key: 'paid', label: t('summaryTotalPaid'), value: totalPaid },
    { key: 'payouts', label: t('summaryTotalPayouts'), value: totalPayouts },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {cards.map((card) => (
        <div key={card.key} className='flex flex-col gap-1 rounded-xl border border-border bg-card p-4'>
          <span className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {card.label}
          </span>
          <span className='font-display text-2xl font-bold text-ink-900'>{formatAud(card.value)}</span>
        </div>
      ))}
    </div>
  );
}
