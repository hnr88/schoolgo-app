'use client';

import { useTranslations } from 'next-intl';
import { ClipboardCheck, Gift } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { PageHeader } from '@/modules/dashboard';
import { useAgentOffers } from '@/modules/applications/queries/use-agent-offers.query';
import { usePostOfferApplications } from '@/modules/applications/queries/use-post-offer-applications.query';
import { OfferCard } from '@/modules/agent-offers/components/OfferCard';
import { PreEnrolmentCard } from '@/modules/agent-offers/components/PreEnrolmentCard';

function CardSkeletonGrid() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      {[0, 1].map((i) => (
        <Skeleton key={i} className='h-48 w-full rounded-lg' />
      ))}
    </div>
  );
}

export function AgentOffersPage() {
  const t = useTranslations('AgentOffers');
  const offers = useAgentOffers();
  const postOffer = usePostOfferApplications();

  const offerList = offers.data?.data ?? [];
  const postOfferList = postOffer.data?.data ?? [];

  return (
    <div className='flex flex-col gap-10'>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <section className='flex flex-col gap-4'>
        <SectionHeading title={t('offersToReview')} level={2} />
        {offers.isLoading ? (
          <CardSkeletonGrid />
        ) : offers.isError ? (
          <ErrorState message={t('offersError')} framed />
        ) : offerList.length === 0 ? (
          <EmptyState icon={Gift} title={t('offersEmptyTitle')} description={t('offersEmptySubtitle')} framed />
        ) : (
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {offerList.map((application) => (
              <OfferCard key={application.documentId} application={application} />
            ))}
          </div>
        )}
      </section>

      <section className='flex flex-col gap-4'>
        <SectionHeading title={t('preEnrolmentTitle')} level={2} />
        {postOffer.isLoading ? (
          <CardSkeletonGrid />
        ) : postOffer.isError ? (
          <ErrorState message={t('preEnrolmentError')} framed />
        ) : postOfferList.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title={t('preEnrolmentEmptyTitle')}
            description={t('preEnrolmentEmptySubtitle')}
            framed
          />
        ) : (
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {postOfferList.map((application) => (
              <PreEnrolmentCard key={application.documentId} application={application} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
