'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Gift, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { OfferCard } from '@/modules/parent-offers/components/OfferCard';
import { ParentOffersSkeleton } from '@/modules/parent-offers/components/ParentOffersSkeleton';
import { useParentOffers } from '@/modules/parent-offers/hooks/useParentOffers';

export function ParentOffersPage() {
  const t = useTranslations('ParentOffers');
  const { offers, isLoading, isError, isEmpty, refetch } = useParentOffers();

  if (isLoading) {
    return <ParentOffersSkeleton />;
  }

  if (isError) {
    return <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={Gift}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        action={
          <Link href='/parent/search' className={buttonVariants({ className: 'gap-1.5' })}>
            <Search className='h-4 w-4' />
            {t('searchSchools')}
          </Link>
        }
      />
    );
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      {offers.map((offer) => (
        <OfferCard key={offer.documentId} offer={offer} />
      ))}
    </div>
  );
}
