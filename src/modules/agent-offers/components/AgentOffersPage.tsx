'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, ClipboardCheck, Gift } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { PageHeader } from '@/modules/dashboard';
import { useAgentOffers } from '@/modules/applications/queries/use-agent-offers.query';
import { usePostOfferApplications } from '@/modules/applications/queries/use-post-offer-applications.query';
import { OfferCard } from '@/modules/agent-offers/components/OfferCard';
import { PreEnrolmentCard } from '@/modules/agent-offers/components/PreEnrolmentCard';

function CardSkeletonGrid() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      {[0, 1].map((i) => (
        <Skeleton key={i} className='h-48 w-full rounded-xl' />
      ))}
    </div>
  );
}

function SectionError({ message }: { message: string }) {
  return (
    <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center'>
      <AlertCircle className='mb-3 h-8 w-8 text-destructive' />
      <p className='text-sm font-medium text-ink-900'>{message}</p>
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
        <h2 className='text-base font-semibold text-ink-900'>{t('offersToReview')}</h2>
        {offers.isLoading ? (
          <CardSkeletonGrid />
        ) : offers.isError ? (
          <SectionError message={t('offersError')} />
        ) : offerList.length === 0 ? (
          <EmptyState icon={Gift} title={t('offersEmptyTitle')} description={t('offersEmptySubtitle')} />
        ) : (
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {offerList.map((application) => (
              <OfferCard key={application.documentId} application={application} />
            ))}
          </div>
        )}
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-base font-semibold text-ink-900'>{t('preEnrolmentTitle')}</h2>
        {postOffer.isLoading ? (
          <CardSkeletonGrid />
        ) : postOffer.isError ? (
          <SectionError message={t('preEnrolmentError')} />
        ) : postOfferList.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title={t('preEnrolmentEmptyTitle')}
            description={t('preEnrolmentEmptySubtitle')}
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
