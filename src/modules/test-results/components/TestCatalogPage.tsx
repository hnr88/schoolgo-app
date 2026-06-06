'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { TestCatalogCard } from '@/modules/test-results/components/TestCatalogCard';
import { useTestCatalog } from '@/modules/test-results/queries/use-test-catalog.query';

export function TestCatalogPage() {
  const t = useTranslations('ParentTestCatalog');
  const { data, isLoading, isError, refetch } = useTestCatalog();

  if (isLoading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        <Skeleton className='h-52 w-full rounded-xl' />
        <Skeleton className='h-52 w-full rounded-xl' />
        <Skeleton className='h-52 w-full rounded-xl' />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={t('errorMessage')}
        onRetry={() => refetch()}
        retryLabel={t('retry')}
        framed
      />
    );
  }

  const tests = data?.data ?? [];

  if (tests.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        framed
      />
    );
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {tests.map((test) => (
        <TestCatalogCard key={test.documentId} test={test} />
      ))}
    </div>
  );
}
