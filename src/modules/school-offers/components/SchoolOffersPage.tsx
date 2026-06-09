'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Gift } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, surfaceCardVariants } from '@/modules/core';
import { SchoolOffersTable } from '@/modules/school-offers/components/SchoolOffersTable';
import { sortOffersByDeadline } from '@/modules/school-offers/lib/offer-deadline';
import { useSchoolOffers } from '@/modules/school-offers/queries/use-school-offers.query';

export function SchoolOffersPage() {
  const t = useTranslations('SchoolOffers');
  const offersQuery = useSchoolOffers();
  const [now] = useState(() => Date.now());

  if (offersQuery.isLoading) {
    return (
      <div className={cn(surfaceCardVariants({ padding: 'none' }), 'overflow-hidden')}>
        <div className='flex flex-col gap-3 p-6'>
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className='h-12 w-full rounded-lg' />
          ))}
        </div>
      </div>
    );
  }

  if (offersQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('loadError')}
        onRetry={() => offersQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const offers = sortOffersByDeadline(offersQuery.data ?? []);

  if (offers.length === 0) {
    return (
      <EmptyState framed icon={Gift} title={t('emptyTitle')} description={t('emptyDescription')} />
    );
  }

  return (
    <div className={cn(surfaceCardVariants({ padding: 'none' }), 'overflow-hidden')}>
      <SchoolOffersTable offers={offers} now={now} />
    </div>
  );
}
