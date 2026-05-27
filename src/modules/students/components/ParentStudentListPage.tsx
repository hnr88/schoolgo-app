'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentStudentListToolbar } from '@/modules/students/components/ParentStudentListToolbar';
import { ParentStudentTable } from '@/modules/students/components/ParentStudentTable';
import { ParentStudentPagination } from '@/modules/students/components/ParentStudentPagination';
import { useParentStudentList } from '@/modules/students/hooks/useParentStudentList';

export function ParentStudentListPage() {
  const t = useTranslations('ParentStudents');
  const {
    search,
    pageSize,
    showAll,
    showArchived,
    sortField,
    sortDirection,
    students,
    pagination,
    showPagination,
    isLoading,
    isError,
    isEmpty,
    refetch,
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleToggleArchived,
  } = useParentStudentList();

  if (isError) {
    return <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={Users}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        action={
          <Link href='/parent/students/new'>
            <Button className='gap-1.5'>
              <Plus className='h-4 w-4' />
              {t('addStudent')}
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-6 py-4'>
        <ParentStudentListToolbar
          search={search}
          onSearchChange={handleSearchChange}
          showArchived={showArchived}
          onToggleArchived={handleToggleArchived}
        />
      </div>

      <ParentStudentTable
        students={students}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        pageSize={showAll ? students.length : pageSize}
      />

      <ParentStudentPagination
        pagination={pagination}
        pageSize={pageSize}
        showAll={showAll}
        showPagination={showPagination}
        setPage={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
