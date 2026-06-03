'use client';

import { CheckCircle2, Receipt, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { IconComponent } from '@/modules/design-system';
import { formatAud, sumAud } from '@/modules/school-invoices/lib/format-finance';
import type {
  SchoolInvoice,
  SchoolPayout,
} from '@/modules/school-invoices/types/school-invoices.types';

interface SummaryProps {
  invoices: SchoolInvoice[];
  payouts: SchoolPayout[];
}

interface SummaryCard {
  key: string;
  label: string;
  value: number;
  icon: IconComponent;
  bg: string;
  iconColor: string;
}

export function SchoolFinanceSummary({ invoices, payouts }: SummaryProps) {
  const t = useTranslations('SchoolInvoices');

  const totalInvoiced = sumAud(invoices.map((invoice) => invoice.amountAud));
  const totalPaid = sumAud(
    invoices.filter((invoice) => invoice.status === 'paid').map((invoice) => invoice.amountAud),
  );
  const totalPayouts = sumAud(payouts.map((payout) => payout.netAmountAud ?? payout.amountAud));

  const cards: SummaryCard[] = [
    {
      key: 'invoiced',
      label: t('summaryTotalInvoiced'),
      value: totalInvoiced,
      icon: Receipt,
      bg: 'bg-vivid-amber-soft',
      iconColor: 'text-vivid-amber',
    },
    {
      key: 'paid',
      label: t('summaryTotalPaid'),
      value: totalPaid,
      icon: CheckCircle2,
      bg: 'bg-vivid-mint-soft',
      iconColor: 'text-vivid-mint',
    },
    {
      key: 'payouts',
      label: t('summaryTotalPayouts'),
      value: totalPayouts,
      icon: Wallet,
      bg: 'bg-vivid-iris-soft',
      iconColor: 'text-vivid-iris',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className='flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-1'
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                card.bg,
                card.iconColor,
              )}
            >
              <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
            </span>
            <span className='font-display text-2xl font-bold text-ink-900 tabular-nums'>
              {formatAud(card.value)}
            </span>
            <span className='text-sm font-medium text-foggy'>{card.label}</span>
          </div>
        );
      })}
    </div>
  );
}
