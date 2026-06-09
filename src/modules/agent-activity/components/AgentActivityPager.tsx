'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface AgentActivityPagerProps {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}

export function AgentActivityPager({
  page,
  pageCount,
  onPrev,
  onNext,
}: AgentActivityPagerProps) {
  const t = useTranslations('AgentActivity');

  return (
    <div className='flex items-center justify-between border-t border-divider px-5 py-3'>
      <span className='text-sm text-foggy tabular-nums'>
        {t('pageStatus', { page, pageCount })}
      </span>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' disabled={page <= 1} onClick={onPrev}>
          <ChevronLeft className='h-4 w-4' aria-hidden='true' />
          {t('previous')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          disabled={page >= pageCount}
          onClick={onNext}
        >
          {t('next')}
          <ChevronRight className='h-4 w-4' aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
