'use client';

import { useTranslations } from 'next-intl';
import { FileQuestion } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { SchoolDocumentRequestCard } from '@/modules/school-document-requests/components/SchoolDocumentRequestCard';
import { useSchoolDocumentRequests } from '@/modules/school-document-requests/queries/use-school-document-requests.query';

export function SchoolDocumentRequestsPage() {
  const t = useTranslations('SchoolDocumentRequests');
  const requestsQuery = useSchoolDocumentRequests();

  if (requestsQuery.isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className='h-24 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (requestsQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('loadError')}
        onRetry={() => requestsQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const openRequests = (requestsQuery.data ?? []).filter((row) => row.status !== 'fulfilled');

  if (openRequests.length === 0) {
    return (
      <EmptyState
        framed
        icon={FileQuestion}
        title={t('emptyTitle')}
        description={t('emptyDescription')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {openRequests.map((request) => (
        <SchoolDocumentRequestCard key={request.documentId} request={request} />
      ))}
    </div>
  );
}
