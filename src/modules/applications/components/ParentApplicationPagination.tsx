'use client';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageNumbers } from '@/modules/core';
import type { ParentApplicationPaginationProps } from '@/modules/applications/types/parent-component.types';

export function ParentApplicationPagination({
  pagination,
  showPagination,
  setPage,
}: ParentApplicationPaginationProps) {
  const t = useTranslations('ParentApplications');

  if (!pagination) return null;

  return (
    <div className='flex items-center justify-between px-2'>
      <span className='text-sm text-foggy'>{t('paginationOf', { total: pagination.total })}</span>

      {showPagination ? (
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
              <span
                key={`dots-${i}`}
                className='flex h-8 w-8 items-center justify-center text-xs text-foggy'
              >
                ...
              </span>
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
            ),
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
      ) : (
        <div />
      )}
    </div>
  );
}
