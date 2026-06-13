'use client';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageNumbers } from '@/modules/core';
import type { FitPagination } from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitTriagePaginationProps {
  pagination: FitPagination;
  onPageChange: (page: number) => void;
}

export function FitTriagePagination({ pagination, onPageChange }: FitTriagePaginationProps) {
  const t = useTranslations('SchoolApplicantFit');
  const { page, pageCount, total } = pagination;

  return (
    <div className='flex items-center justify-between border-t border-divider px-6 py-4'>
      <span className='text-sm text-foggy'>{t('paginationTotal', { total })}</span>
      {pageCount > 1 ? (
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            aria-label={t('paginationPrevious')}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          {getPageNumbers(page, pageCount).map((p, i) =>
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
                variant={p === page ? 'default' : 'ghost'}
                size='icon'
                className='h-8 w-8 text-xs'
                aria-current={p === page ? 'page' : undefined}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            ),
          )}
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            aria-label={t('paginationNext')}
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
