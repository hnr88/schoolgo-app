'use client';

import { useTranslations } from 'next-intl';
import { Handshake } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { CtaLink } from '@/modules/design-system';
import { useMyPartnerships } from '@/modules/agent-partnerships/queries/use-my-partnerships.query';
import { PartnershipsTable } from '@/modules/agent-partnerships/components/PartnershipsTable';

function PartnershipsSkeleton() {
  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className='h-12 w-full rounded-md' />
      ))}
    </SurfaceCard>
  );
}

export function AgentPartnershipsPage() {
  const t = useTranslations('AgentPartnerships');
  const partnershipsQuery = useMyPartnerships();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Handshake} title={t('title')} description={t('subtitle')} />

      {partnershipsQuery.isLoading ? (
        <PartnershipsSkeleton />
      ) : partnershipsQuery.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => partnershipsQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : (partnershipsQuery.data ?? []).length === 0 ? (
        <EmptyState
          framed
          icon={Handshake}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={<CtaLink href='/dashboard/search'>{t('emptyCta')}</CtaLink>}
        />
      ) : (
        <PartnershipsTable partnerships={partnershipsQuery.data ?? []} />
      )}
    </div>
  );
}
