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
import { cn } from '@/lib/utils';
import { EmptyState, StatusBadge } from '@/modules/core';
import {
  formatAud,
  formatInvoiceDate,
  isInvoiceOverdue,
  studentName,
} from '@/modules/parent-invoices/lib/format-invoice';
import {
  PARENT_INVOICE_KIND_LABEL_KEY,
  PARENT_INVOICE_STATUS_LABEL_KEY,
  PARENT_INVOICE_STATUS_STYLES,
} from '@/modules/parent-invoices/constants/parent-invoices.constants';
import type { ParentInvoice } from '@/modules/parent-invoices/types/parent-invoice.types';

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function ParentInvoicesTable({ invoices }: { invoices: ParentInvoice[] }) {
  const t = useTranslations('ParentPayments');

  if (invoices.length === 0) {
    return (
      <EmptyState
        framed
        icon={Receipt}
        title={t('invoices.empty')}
        description={t('invoices.emptyDescription')}
      />
    );
  }

  return (
    <div
      tabIndex={0}
      role='region'
      aria-label={t('invoices.tableRegion')}
      className='table-scroll-region overflow-x-auto rounded-lg border border-border bg-card shadow-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
    >
      <Table>
        <TableHeader>
          <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnInvoice')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnKind')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnSchool')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnStudent')}</TableHead>
            <TableHead className={cn(HEAD_CLASS, 'text-right')}>{t('invoices.columnAmount')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnStatus')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('invoices.columnDue')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const overdue = isInvoiceOverdue(invoice);
            return (
              <TableRow key={invoice.documentId} className='border-b border-divider transition-colors hover:bg-muted/60'>
                <TableCell className='py-3.5 font-semibold text-ink-900'>
                  {invoice.invoiceNumber ?? t('invoices.unnumbered')}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {t(PARENT_INVOICE_KIND_LABEL_KEY[invoice.kind])}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {invoice.application?.school?.name ?? t('invoices.noReference')}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {studentName(invoice) ?? t('invoices.noReference')}
                </TableCell>
                <TableCell className='py-3.5 text-right font-semibold text-ink-900 tabular-nums'>
                  {formatAud(invoice.amountAud, invoice.currency)}
                </TableCell>
                <TableCell className='py-3.5'>
                  <StatusBadge
                    status={invoice.status}
                    label={t(PARENT_INVOICE_STATUS_LABEL_KEY[invoice.status])}
                    styles={PARENT_INVOICE_STATUS_STYLES}
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    'py-3.5',
                    overdue ? 'font-semibold text-vivid-coral-strong' : 'text-foggy',
                  )}
                >
                  {formatInvoiceDate(invoice.dueDate)}
                  {overdue && <span className='ml-2 text-xs'>{t('invoices.overdueFlag')}</span>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
