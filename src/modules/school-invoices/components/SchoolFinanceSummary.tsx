'use client';

import { CheckCircle2, Receipt, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StatTile } from '@/modules/core';
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
  iconClassName: string;
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
      iconClassName: 'bg-vivid-amber-soft text-arches-700',
    },
    {
      key: 'paid',
      label: t('summaryTotalPaid'),
      value: totalPaid,
      icon: CheckCircle2,
      iconClassName: 'bg-vivid-mint-soft text-vivid-mint',
    },
    {
      key: 'payouts',
      label: t('summaryTotalPayouts'),
      value: totalPayouts,
      icon: Wallet,
      iconClassName: 'bg-vivid-iris-soft text-vivid-iris-strong',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {cards.map((card) => (
        <StatTile
          key={card.key}
          icon={card.icon}
          iconClassName={card.iconClassName}
          label={card.label}
          value={formatAud(card.value)}
        />
      ))}
    </div>
  );
}
