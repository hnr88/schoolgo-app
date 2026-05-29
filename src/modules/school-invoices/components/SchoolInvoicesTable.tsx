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
    return <EmptyState icon={Receipt} title={t('empty')} />;
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('columnInvoice')}</TableHead>
            <TableHead>{t('columnKind')}</TableHead>
            <TableHead>{t('columnStudent')}</TableHead>
            <TableHead>{t('columnAgent')}</TableHead>
            <TableHead className='text-right'>{t('columnAmount')}</TableHead>
            <TableHead>{t('columnStatus')}</TableHead>
            <TableHead>{t('columnIssued')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const student = studentName(invoice);
            return (
              <TableRow key={invoice.documentId}>
                <TableCell className='font-medium text-ink-900'>
                  {invoice.invoiceNumber ?? t('unnumbered')}
                </TableCell>
                <TableCell className='text-foggy'>
                  {t(INVOICE_KIND_LABEL_KEY[invoice.kind])}
                </TableCell>
                <TableCell className='text-foggy'>{student ?? t('noReference')}</TableCell>
                <TableCell className='text-foggy'>
                  {invoice.agent?.companyName ?? t('agentNone')}
                </TableCell>
                <TableCell className='text-right font-medium text-ink-900'>
                  {formatAud(invoice.amountAud, invoice.currency)}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={invoice.status}
                    label={t(INVOICE_STATUS_LABEL_KEY[invoice.status])}
                    styles={INVOICE_STATUS_STYLES}
                  />
                </TableCell>
                <TableCell className='text-foggy'>{formatFinanceDate(invoice.issuedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
