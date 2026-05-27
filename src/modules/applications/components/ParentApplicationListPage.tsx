'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentApplicationToolbar } from '@/modules/applications/components/ParentApplicationToolbar';
import { ParentApplicationTable } from '@/modules/applications/components/ParentApplicationTable';
import { ParentApplicationPagination } from '@/modules/applications/components/ParentApplicationPagination';
import { useParentApplicationList } from '@/modules/applications/hooks/useParentApplicationList';
import { PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE } from '@/modules/applications/constants/parent-applications.constants';
import type { ParentApplicationListPageProps } from '@/modules/applications/types/parent-component.types';

export function ParentApplicationListPage({ studentDocumentId }: ParentApplicationListPageProps) {
  const t = useTranslations('ParentApplications');
  const {
    status,
    sortField,
    sortDirection,
    applications,
    pagination,
    showPagination,
    isLoading,
    isError,
    isEmpty,
    refetch,
    setPage,
    handleSort,
    handleStatusChange,
  } = useParentApplicationList(studentDocumentId);

  if (isError) {
    return <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={FileText}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        action={
          <Link href='/parent/search'>
            <Button className='gap-1.5'>
              <Search className='h-4 w-4' />
              {t('searchSchools')}
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-6 py-4'>
        <ParentApplicationToolbar status={status} onStatusChange={handleStatusChange} />
      </div>

      <ParentApplicationTable
        applications={applications}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        pageSize={pagination?.pageSize ?? PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE}
      />

      <ParentApplicationPagination
        pagination={pagination}
        showPagination={showPagination}
        setPage={setPage}
      />
    </div>
  );
}
