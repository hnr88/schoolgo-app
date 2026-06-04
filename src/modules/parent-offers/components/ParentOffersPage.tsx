'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Gift, Loader2, Search } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { OfferCard } from '@/modules/parent-offers/components/OfferCard';
import { ParentOffersSkeleton } from '@/modules/parent-offers/components/ParentOffersSkeleton';
import { useParentOffers } from '@/modules/parent-offers/hooks/useParentOffers';

export function ParentOffersPage() {
  const t = useTranslations('ParentOffers');
  const { offers, total, isLoading, isError, isEmpty, hasMore, isLoadingMore, loadMore, refetch } =
    useParentOffers();

  if (isLoading) {
    return <ParentOffersSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        framed
        message={t('errorMessage')}
        onRetry={() => refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        framed
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
    <div className='flex flex-col gap-6'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {offers.map((offer) => (
          <OfferCard key={offer.documentId} offer={offer} />
        ))}
      </div>

      {hasMore && (
        <div className='flex flex-col items-center gap-2'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore && <Loader2 className='h-4 w-4 animate-spin' />}
            {t('loadMore')}
          </Button>
          <p className='text-xs text-foggy'>{t('shownCount', { shown: offers.length, total })}</p>
        </div>
      )}
    </div>
  );
}
