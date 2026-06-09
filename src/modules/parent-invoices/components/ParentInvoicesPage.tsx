'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useParentInvoices } from '@/modules/parent-invoices/queries/use-parent-invoices.query';
import { ParentInvoicesTable } from '@/modules/parent-invoices/components/ParentInvoicesTable';

function TableSkeleton() {
  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className='h-12 w-full rounded-md' />
      ))}
    </SurfaceCard>
  );
}

export function ParentInvoicesPage() {
  const t = useTranslations('ParentPayments');
  const invoicesQuery = useParentInvoices();

  return (
    <div className='flex flex-col gap-4'>
      <SectionHeading title={t('invoices.heading')} description={t('invoices.description')} />
      {invoicesQuery.isLoading ? (
        <TableSkeleton />
      ) : invoicesQuery.isError ? (
        <ErrorState
          framed
          message={t('invoices.loadError')}
          onRetry={() => invoicesQuery.refetch()}
          retryLabel={t('invoices.retry')}
        />
      ) : (
        <ParentInvoicesTable invoices={invoicesQuery.data ?? []} />
      )}
    </div>
  );
}
