'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useGrowthEngagements } from '@/modules/school-growth-services/queries/use-growth-engagements.query';
import { EngagementCard } from '@/modules/school-growth-services/components/EngagementCard';

export function EngagementsList() {
  const t = useTranslations('SchoolGrowthServices');
  const engagementsQuery = useGrowthEngagements();

  if (engagementsQuery.isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className='h-32 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (engagementsQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('engagementsLoadError')}
        onRetry={() => engagementsQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const engagements = engagementsQuery.data ?? [];

  if (engagements.length === 0) {
    return (
      <EmptyState
        framed
        icon={ClipboardList}
        title={t('engagementsEmptyTitle')}
        description={t('engagementsEmptyDescription')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {engagements.map((engagement) => (
        <EngagementCard key={engagement.documentId} engagement={engagement} />
      ))}
    </div>
  );
}
