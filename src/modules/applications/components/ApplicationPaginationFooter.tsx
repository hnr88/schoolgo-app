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
import { getPageNumbers } from '@/modules/core';
import { PAGE_SIZE_OPTIONS } from '@/modules/applications/constants/search.constants';
import type { ApplicationPaginationFooterProps } from '@/modules/applications/types/component.types';

export function ApplicationPaginationFooter({
  pagination,
  pageSize,
  showAll,
  showPagination,
  onPageChange,
  onPageSizeChange,
}: ApplicationPaginationFooterProps) {
  const t = useTranslations('Applications');

  return (
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
                  onClick={() => onPageSizeChange(size)}
                  className={!showAll && pageSize === size ? 'font-semibold text-primary' : ''}
                >
                  {size}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => onPageSizeChange('all')}
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
            onClick={() => onPageChange((p) => p - 1)}
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
                onClick={() => onPageChange(p as number)}
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
            onClick={() => onPageChange((p) => p + 1)}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}

      {!showPagination && <div />}
    </div>
  );
}
