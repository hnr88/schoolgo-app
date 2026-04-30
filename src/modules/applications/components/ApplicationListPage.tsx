'use client';

import { ApplicationListToolbar } from '@/modules/applications/components/ApplicationListToolbar';
import { ApplicationTable } from '@/modules/applications/components/ApplicationTable';
import { ApplicationPaginationFooter } from '@/modules/applications/components/ApplicationPaginationFooter';
import { useApplicationList } from '@/modules/applications/hooks/useApplicationList';

export function ApplicationListPage() {
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
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleStatusChange,
  } = useApplicationList();

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-6 py-4'>
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
