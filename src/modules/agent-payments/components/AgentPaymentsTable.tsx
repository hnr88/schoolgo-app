'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PAYMENT_STATUS_STYLES } from '@/modules/agent-payments/constants/agent-payments.constants';
import { formatAud, formatPaymentDate } from '@/modules/agent-payments/lib/format-payment';
import type { AgentPayment } from '@/modules/agent-payments/types/agent-payment.types';

interface AgentPaymentsTableProps {
  payments: AgentPayment[];
}

export function AgentPaymentsTable({ payments }: AgentPaymentsTableProps) {
  const t = useTranslations('AgentPayments');

  return (
    <div className='overflow-x-auto rounded-xl border border-divider bg-card shadow-1'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colDate')}</TableHead>
            <TableHead>{t('colInvoice')}</TableHead>
            <TableHead>{t('colMethod')}</TableHead>
            <TableHead className='text-right'>{t('colAmount')}</TableHead>
            <TableHead className='text-right'>{t('colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.documentId}>
              <TableCell className='whitespace-nowrap text-foreground'>
                {formatPaymentDate(payment.paidAt ?? payment.createdAt)}
              </TableCell>
              <TableCell>
                <span className='font-medium text-ink-900'>
                  {payment.invoice?.invoiceNumber ?? t('noInvoice')}
                </span>
              </TableCell>
              <TableCell className='text-foreground'>
                {t(`method.${payment.method}`)}
              </TableCell>
              <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                {formatAud(payment.amountAud)}
              </TableCell>
              <TableCell className='text-right'>
                <StatusBadge
                  status={payment.status}
                  label={t(`status.${payment.status}`)}
                  styles={PAYMENT_STATUS_STYLES}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
