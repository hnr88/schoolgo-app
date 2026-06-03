'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolInvoices } from '@/modules/school-invoices/queries/use-school-invoices.query';
import { useSchoolPayouts } from '@/modules/school-invoices/queries/use-school-payouts.query';
import { SchoolFinanceSummary } from '@/modules/school-invoices/components/SchoolFinanceSummary';
import { SchoolInvoicesTable } from '@/modules/school-invoices/components/SchoolInvoicesTable';
import { SchoolPayoutsTable } from '@/modules/school-invoices/components/SchoolPayoutsTable';

function TableSkeleton() {
  return (
    <div className='flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-1'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-12 w-full rounded-md' />
      ))}
    </div>
  );
}

export function SchoolInvoicesPage() {
  const t = useTranslations('SchoolInvoices');
  const invoicesQuery = useSchoolInvoices();
  const payoutsQuery = useSchoolPayouts();

  const isLoading = invoicesQuery.isLoading || payoutsQuery.isLoading;

  if (isLoading) {
    return (
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-28 w-full rounded-lg' />
          ))}
        </div>
        <TableSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  if (invoicesQuery.isError) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => invoicesQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const invoices = invoicesQuery.data ?? [];
  const payouts = payoutsQuery.data ?? [];

  return (
    <div className='flex flex-col gap-10'>
      <SchoolFinanceSummary invoices={invoices} payouts={payouts} />

      <section className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-display text-xl font-bold text-ink-900'>{t('title')}</h2>
          <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
        </div>
        <SchoolInvoicesTable invoices={invoices} />
      </section>

      <section className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-display text-xl font-bold text-ink-900'>{t('payoutsTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('payoutsSubtitle')}</p>
        </div>
        {payoutsQuery.isError ? (
          <ErrorState
            message={t('payoutsLoadError')}
            onRetry={() => payoutsQuery.refetch()}
            retryLabel={t('retry')}
          />
        ) : (
          <SchoolPayoutsTable payouts={payouts} />
        )}
      </section>
    </div>
  );
}
