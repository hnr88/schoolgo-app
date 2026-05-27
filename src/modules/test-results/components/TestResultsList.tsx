'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { TestResultCard } from '@/modules/test-results/components/TestResultCard';
import { useTestResults } from '@/modules/test-results/queries/use-test-results.query';
import type { TestResultsListProps } from '@/modules/test-results/types/component.types';

export function TestResultsList({ studentDocumentId }: TestResultsListProps) {
  const t = useTranslations('ParentTestResults');
  const { data, isLoading, isError, refetch } = useTestResults({ studentDocumentId });

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-40 w-full rounded-xl' />
        <Skeleton className='h-40 w-full rounded-xl' />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />
    );
  }

  const results = data?.data ?? [];

  if (results.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {results.map((result) => (
        <TestResultCard key={result.documentId} result={result} />
      ))}
    </div>
  );
}
