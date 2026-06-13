'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileText, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
    search,
    childFilter,
    childOptions,
    showChildFilter,
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
    handleSearchChange,
    handleChildFilterChange,
  } = useParentApplicationList(studentDocumentId);

  if (isError) {
    return (
      <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} framed />
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={FileText}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        framed
        action={
          <Link href='/parent/search' className={cn(buttonVariants({ variant: 'default' }), 'gap-1.5')}>
            <Search className='h-4 w-4' />
            {t('searchSchools')}
          </Link>
        }
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <ParentApplicationToolbar
        status={status}
        onStatusChange={handleStatusChange}
        search={search}
        onSearchChange={handleSearchChange}
        childFilter={childFilter}
        onChildFilterChange={handleChildFilterChange}
        childOptions={childOptions}
        showChildFilter={showChildFilter}
      />

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
