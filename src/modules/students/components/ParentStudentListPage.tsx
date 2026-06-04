'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Plus, Users } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { ParentStudentListToolbar } from '@/modules/students/components/ParentStudentListToolbar';
import { ParentStudentTable } from '@/modules/students/components/ParentStudentTable';
import { ParentStudentPagination } from '@/modules/students/components/ParentStudentPagination';
import { ParentStudentStatsRow } from '@/modules/students/components/ParentStudentStatsRow';
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
    stats,
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
    return <ErrorState message={t('errorMessage')} onRetry={() => refetch()} retryLabel={t('retry')} framed />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={Users}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
        framed
        action={
          <Link href='/parent/students/new' className={cn(buttonVariants(), 'gap-1.5')}>
            <Plus className='h-4 w-4' />
            {t('addStudent')}
          </Link>
        }
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <ParentStudentStatsRow stats={stats} isLoading={isLoading} />

      <SurfaceCard padding='none' className='overflow-hidden'>
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
      </SurfaceCard>
    </div>
  );
}
