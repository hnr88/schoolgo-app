import { getTranslations } from 'next-intl/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/modules/core';
import {
  PAYMENT_STATUS_LABEL_KEY,
  PAYMENT_STATUS_STYLES,
  PAYMENT_TRANSACTIONS,
} from '@/modules/payments/constants/payments.constants';
import { formatAud, formatPaymentDate } from '@/modules/payments/lib/format-payments';

const HEAD = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export async function PaymentsTransactionsCard() {
  const t = await getTranslations('ParentPayments');

  return (
    <section className='flex h-full flex-col gap-5 rounded-xl bg-card p-6 shadow-1'>
      <h2 className='text-base font-semibold text-ink-900'>{t('transactions.title')}</h2>
      <div
        tabIndex={0}
        role='region'
        aria-label={t('transactions.tableRegion')}
        className='table-scroll-region -mx-2 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
      >
        <Table>
          <TableHeader>
            <TableRow className='border-b border-divider hover:bg-transparent'>
              <TableHead className={HEAD}>{t('transactions.columnInvoice')}</TableHead>
              <TableHead className={HEAD}>{t('transactions.columnDescription')}</TableHead>
              <TableHead className={`text-right ${HEAD}`}>{t('transactions.columnAmount')}</TableHead>
              <TableHead className={HEAD}>{t('transactions.columnStatus')}</TableHead>
              <TableHead className={`text-right ${HEAD}`}>{t('transactions.columnDate')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYMENT_TRANSACTIONS.map((tx) => (
              <TableRow key={tx.id} className='border-b border-divider last:border-0 hover:bg-muted/50'>
                <TableCell className='py-3.5 font-semibold text-ink-900 tabular-nums'>
                  {tx.invoiceNumber}
                </TableCell>
                <TableCell className='py-3.5 text-foggy'>{t(tx.descriptionKey)}</TableCell>
                <TableCell className='py-3.5 text-right font-semibold text-ink-900 tabular-nums'>
                  {formatAud(tx.amount)}
                </TableCell>
                <TableCell className='py-3.5'>
                  <StatusBadge
                    status={tx.status}
                    label={t(PAYMENT_STATUS_LABEL_KEY[tx.status])}
                    styles={PAYMENT_STATUS_STYLES}
                  />
                </TableCell>
                <TableCell className='py-3.5 text-right text-foggy tabular-nums'>
                  {formatPaymentDate(tx.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
