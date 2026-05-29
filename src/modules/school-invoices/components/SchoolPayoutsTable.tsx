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
    return <EmptyState icon={Banknote} title={t('payoutsEmpty')} />;
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('columnReference')}</TableHead>
            <TableHead>{t('columnInvoice')}</TableHead>
            <TableHead className='text-right'>{t('columnAmount')}</TableHead>
            <TableHead className='text-right'>{t('columnNet')}</TableHead>
            <TableHead>{t('columnStatus')}</TableHead>
            <TableHead>{t('columnScheduled')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.documentId}>
              <TableCell className='font-medium text-ink-900'>
                {payout.reference ?? t('noReference')}
              </TableCell>
              <TableCell className='text-foggy'>
                {payout.invoice?.invoiceNumber ?? t('unnumbered')}
              </TableCell>
              <TableCell className='text-right text-foggy'>
                {formatAud(payout.amountAud)}
              </TableCell>
              <TableCell className='text-right font-medium text-ink-900'>
                {formatAud(payout.netAmountAud ?? payout.amountAud)}
              </TableCell>
              <TableCell>
                <StatusBadge
                  status={payout.status}
                  label={t(PAYOUT_STATUS_LABEL_KEY[payout.status])}
                  styles={PAYOUT_STATUS_STYLES}
                />
              </TableCell>
              <TableCell className='text-foggy'>{formatFinanceDate(payout.scheduledFor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
