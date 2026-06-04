'use client';

import { useTranslations } from 'next-intl';
import { Banknote } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState, StatusBadge } from '@/modules/core';
import { formatAud, formatFinanceDate } from '@/modules/school-invoices/lib/format-finance';
import {
  PAYOUT_STATUS_LABEL_KEY,
  PAYOUT_STATUS_STYLES,
} from '@/modules/school-invoices/constants/school-invoices.constants';
import type { SchoolPayout } from '@/modules/school-invoices/types/school-invoices.types';

export function SchoolPayoutsTable({ payouts }: { payouts: SchoolPayout[] }) {
  const t = useTranslations('SchoolInvoices');

  if (payouts.length === 0) {
    return <EmptyState framed icon={Banknote} title={t('payoutsEmpty')} />;
  }

  return (
    <div
      tabIndex={0}
      role='region'
      aria-label={t('tableRegionPayouts')}
      className='table-scroll-region overflow-x-auto rounded-lg border border-border bg-card shadow-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
    >
      <Table>
        <TableHeader>
          <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnReference')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnInvoice')}</TableHead>
            <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnAmount')}</TableHead>
            <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnNet')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStatus')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnScheduled')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.documentId} className='border-b border-divider transition-colors hover:bg-muted/60'>
              <TableCell className='py-3.5 font-semibold text-ink-900'>
                {payout.reference ?? t('noReference')}
              </TableCell>
              <TableCell className='py-3.5 text-foggy'>
                {payout.invoice?.invoiceNumber ?? t('unnumbered')}
              </TableCell>
              <TableCell className='py-3.5 text-right text-foggy tabular-nums'>
                {formatAud(payout.amountAud)}
              </TableCell>
              <TableCell className='py-3.5 text-right font-semibold text-ink-900 tabular-nums'>
                {formatAud(payout.netAmountAud ?? payout.amountAud)}
              </TableCell>
              <TableCell className='py-3.5'>
                <StatusBadge
                  status={payout.status}
                  label={t(PAYOUT_STATUS_LABEL_KEY[payout.status])}
                  styles={PAYOUT_STATUS_STYLES}
                />
              </TableCell>
              <TableCell className='py-3.5 text-foggy'>{formatFinanceDate(payout.scheduledFor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
