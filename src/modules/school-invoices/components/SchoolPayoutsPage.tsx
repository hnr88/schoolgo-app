'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SurfaceCard } from '@/modules/core';
import { useSchoolPayouts } from '@/modules/school-invoices/queries/use-school-payouts.query';
import { SchoolPayoutsSummary } from '@/modules/school-invoices/components/SchoolPayoutsSummary';
import { SchoolPayoutsTable } from '@/modules/school-invoices/components/SchoolPayoutsTable';

export function SchoolPayoutsPage() {
  const t = useTranslations('SchoolInvoices');
  const payoutsQuery = useSchoolPayouts();

  if (payoutsQuery.isLoading) {
    return (
      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-24 w-full rounded-lg' />
          ))}
        </div>
        <SurfaceCard padding='sm' className='flex flex-col gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='h-12 w-full rounded-md' />
          ))}
        </SurfaceCard>
      </div>
    );
  }

  if (payoutsQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('payoutsLoadError')}
        onRetry={() => payoutsQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const payouts = payoutsQuery.data ?? [];

  return (
    <div className='flex flex-col gap-8'>
      <SchoolPayoutsSummary payouts={payouts} />
      <SchoolPayoutsTable payouts={payouts} />
    </div>
  );
}
