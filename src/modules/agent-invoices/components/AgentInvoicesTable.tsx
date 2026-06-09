'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/modules/core';
import { AGENT_INVOICE_STATUS_STYLES } from '@/modules/agent-invoices/constants/agent-invoices.constants';
import {
  formatAud,
  formatInvoiceDate,
  isInvoiceOverdue,
  schoolName,
  studentName,
} from '@/modules/agent-invoices/lib/format-invoice';
import type { AgentInvoice } from '@/modules/agent-invoices/types/agent-invoice.types';

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function AgentInvoicesTable({ invoices }: { invoices: AgentInvoice[] }) {
  const t = useTranslations('AgentInvoices');

  return (
    <div
      tabIndex={0}
      role='region'
      aria-label={t('tableRegion')}
      className='table-scroll-region overflow-x-auto rounded-lg border border-border bg-card shadow-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
    >
      <Table>
        <TableHeader>
          <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
            <TableHead className={HEAD_CLASS}>{t('colInvoice')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('colKind')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('colSchool')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('colStudent')}</TableHead>
            <TableHead className={cn(HEAD_CLASS, 'text-right')}>{t('colAmount')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('colStatus')}</TableHead>
            <TableHead className={HEAD_CLASS}>{t('colDue')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const overdue = isInvoiceOverdue(invoice);
            return (
              <TableRow
                key={invoice.documentId}
                className='border-b border-divider transition-colors hover:bg-muted/60'
              >
                <TableCell className='py-3.5 font-semibold text-ink-900'>
                  {invoice.invoiceNumber ?? t('unnumbered')}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>{t(`kind.${invoice.kind}`)}</TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {schoolName(invoice) ?? t('noReference')}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>
                  {studentName(invoice) ?? t('noReference')}
                </TableCell>
                <TableCell className='py-3.5 text-right font-semibold text-ink-900 tabular-nums'>
                  {formatAud(invoice.amountAud, invoice.currency)}
                </TableCell>
                <TableCell className='py-3.5'>
                  <StatusBadge
                    status={invoice.status}
                    label={t(`status.${invoice.status}`)}
                    styles={AGENT_INVOICE_STATUS_STYLES}
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    'py-3.5',
                    overdue ? 'font-semibold text-vivid-coral-strong' : 'text-foggy',
                  )}
                >
                  {formatInvoiceDate(invoice.dueDate)}
                  {overdue && <span className='ml-2 text-xs'>{t('overdueFlag')}</span>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
