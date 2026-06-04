'use client';

import { useTranslations } from 'next-intl';
import { Receipt } from 'lucide-react';
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
  INVOICE_KIND_LABEL_KEY,
  INVOICE_STATUS_LABEL_KEY,
  INVOICE_STATUS_STYLES,
} from '@/modules/school-invoices/constants/school-invoices.constants';
import type { SchoolInvoice } from '@/modules/school-invoices/types/school-invoices.types';

function studentName(invoice: SchoolInvoice): string | null {
  const student = invoice.application?.student;
  if (!student) return null;
  return [student.firstName, student.lastName].filter(Boolean).join(' ') || null;
}

export function SchoolInvoicesTable({ invoices }: { invoices: SchoolInvoice[] }) {
  const t = useTranslations('SchoolInvoices');

  if (invoices.length === 0) {
    return <EmptyState framed icon={Receipt} title={t('empty')} />;
  }

  return (
    <div
      tabIndex={0}
      role='region'
      aria-label={t('tableRegionInvoices')}
      className='table-scroll-region overflow-x-auto rounded-lg border border-border bg-card shadow-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
    >
      <Table>
        <TableHeader>
          <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnInvoice')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnKind')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStudent')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnAgent')}</TableHead>
            <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnAmount')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStatus')}</TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnIssued')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const student = studentName(invoice);
            return (
              <TableRow key={invoice.documentId} className='border-b border-divider transition-colors hover:bg-muted/60'>
                <TableCell className='py-3.5 font-semibold text-ink-900'>
                  {invoice.invoiceNumber ?? t('unnumbered')}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {t(INVOICE_KIND_LABEL_KEY[invoice.kind])}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>{student ?? t('noReference')}</TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {invoice.agent?.companyName ?? t('agentNone')}
                </TableCell>
                <TableCell className='py-3.5 text-right font-semibold text-ink-900 tabular-nums'>
                  {formatAud(invoice.amountAud, invoice.currency)}
                </TableCell>
                <TableCell className='py-3.5'>
                  <StatusBadge
                    status={invoice.status}
                    label={t(INVOICE_STATUS_LABEL_KEY[invoice.status])}
                    styles={INVOICE_STATUS_STYLES}
                  />
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>{formatFinanceDate(invoice.issuedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
