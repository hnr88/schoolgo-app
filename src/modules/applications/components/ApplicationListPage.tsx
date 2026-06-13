'use client';

import { useTranslations } from 'next-intl';
import { ErrorState } from '@/modules/core';
import { ApplicationListToolbar } from '@/modules/applications/components/ApplicationListToolbar';
import { ApplicationTable } from '@/modules/applications/components/ApplicationTable';
import { ApplicationPaginationFooter } from '@/modules/applications/components/ApplicationPaginationFooter';
import { useApplicationList } from '@/modules/applications/hooks/useApplicationList';

export function ApplicationListPage() {
  const t = useTranslations('Applications');
  const {
    search,
    status,
    pageSize,
    showAll,
    sortField,
    sortDirection,
    applications,
    pagination,
    showPagination,
    isLoading,
    isError,
    refetch,
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleStatusChange,
  } = useApplicationList();

  if (isError) {
    return <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} framed />;
  }

  return (
    <div className='overflow-hidden rounded-lg border border-divider bg-card shadow-2'>
      <div className='border-b border-divider px-6 py-4'>
        <ApplicationListToolbar
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
        />
      </div>

      <ApplicationTable
        applications={applications}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        pageSize={showAll ? applications.length : pageSize}
      />

      <ApplicationPaginationFooter
        pagination={pagination}
        pageSize={pageSize}
        showAll={showAll}
        showPagination={showPagination}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
