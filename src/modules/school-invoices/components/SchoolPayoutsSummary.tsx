'use client';

import { useTranslations } from 'next-intl';
import { Banknote, CalendarClock, Hash } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatAud } from '@/modules/school-invoices/lib/format-finance';
import { summarizePayouts } from '@/modules/school-invoices/lib/summarize-payouts';
import type { SchoolPayout } from '@/modules/school-invoices/types/school-invoices.types';

export function SchoolPayoutsSummary({ payouts }: { payouts: SchoolPayout[] }) {
  const t = useTranslations('SchoolInvoices');
  const summary = summarizePayouts(payouts);

  return (
    <div className='grid gap-3 sm:grid-cols-3'>
      <StatTile
        icon={Banknote}
        label={t('payoutSummaryPaid')}
        value={formatAud(summary.paidNet)}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={CalendarClock}
        label={t('payoutSummaryUpcoming')}
        value={formatAud(summary.upcoming)}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={Hash}
        label={t('payoutSummaryCount')}
        value={summary.count}
        iconClassName='text-vivid-iris'
      />
    </div>
  );
}
