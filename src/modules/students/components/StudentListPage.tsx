'use client';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StudentListToolbar } from '@/modules/students/components/StudentListToolbar';
import { StudentTable } from '@/modules/students/components/StudentTable';
import { useStudentList } from '@/modules/students/hooks/useStudentList';
import { PAGE_SIZE_OPTIONS, getPageNumbers } from '@/modules/students/lib/pagination';

export function StudentListPage() {
  const t = useTranslations('Students');
  const {
    search,
    status,
    pageSize,
    showAll,
    sortField,
    sortDirection,
    students,
    pagination,
    showPagination,
    isLoading,
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleStatusChange,
  } = useStudentList();

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='border-b border-border px-6 py-4'>
        <StudentListToolbar
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
        />
      </div>

      <StudentTable
        students={students}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        pageSize={showAll ? students.length : pageSize}
      />

      <div className='flex items-center justify-between border-t border-border px-6 py-4'>
        {pagination ? (
          <div className='flex items-center gap-1.5 text-sm text-foggy'>
            <span>{t('paginationShowing')}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className='inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium text-ink-900 outline-none hover:bg-muted'>
                {showAll ? t('allRows') : pageSize}
                <ChevronDown className='h-3.5 w-3.5 text-foggy' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' sideOffset={4} className='min-w-20'>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => handlePageSizeChange(size)}
                    className={!showAll && pageSize === size ? 'font-semibold text-primary' : ''}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => handlePageSizeChange('all')}
                  className={showAll ? 'font-semibold text-primary' : ''}
                >
                  {t('allRows')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span>{t('paginationOf', { total: pagination.total })}</span>
          </div>
        ) : (
          <div />
        )}

        {showPagination && pagination && (
          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              disabled={pagination.page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            {getPageNumbers(pagination.page, pagination.pageCount).map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className='flex h-8 w-8 items-center justify-center text-xs text-foggy'>...</span>
              ) : (
                <Button
                  key={p}
                  variant={p === pagination.page ? 'default' : 'ghost'}
                  size='icon'
                  className='h-8 w-8 text-xs'
                  onClick={() => setPage(p as number)}
                >
                  {p}
                </Button>
              )
            )}
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              disabled={pagination.page >= pagination.pageCount}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}

        {!showPagination && <div />}
      </div>
    </div>
  );
}
