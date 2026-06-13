'use client';

import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useShortlists } from '@/modules/parent-shortlist/queries/use-shortlists.query';
import { CreateShortlistDialog } from '@/modules/parent-shortlist/components/CreateShortlistDialog';
import { ShortlistCard } from '@/modules/parent-shortlist/components/ShortlistCard';
import { ShortlistSkeleton } from '@/modules/parent-shortlist/components/ShortlistSkeleton';

export function ParentShortlistPage() {
  const t = useTranslations('ParentShortlist');
  const shortlistsQuery = useShortlists();
  const shortlists = shortlistsQuery.data ?? [];

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={ListChecks}
        title={t('title')}
        description={t('subtitle')}
        actions={<CreateShortlistDialog />}
      />

      {shortlistsQuery.isError ? (
        <ErrorState
          framed
          message={t('loadError')}
          onRetry={() => shortlistsQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : shortlistsQuery.isLoading ? (
        <ShortlistSkeleton />
      ) : shortlists.length === 0 ? (
        <EmptyState
          framed
          icon={ListChecks}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={<CreateShortlistDialog />}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          {shortlists.map((shortlist) => (
            <ShortlistCard key={shortlist.documentId} shortlist={shortlist} />
          ))}
        </div>
      )}
    </div>
  );
}
