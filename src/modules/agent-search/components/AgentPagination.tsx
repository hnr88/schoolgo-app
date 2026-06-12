'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAgentSearchStore } from '@/modules/agent-search/stores/use-agent-search-store';
import { buildPageWindow, computePageCount } from '@/modules/agent-search/lib/agent-pagination';

interface AgentPaginationProps {
  total: number;
  pageSize: number;
  className?: string;
}

export function AgentPagination({ total, pageSize, className }: AgentPaginationProps) {
  const t = useTranslations('AgentSearch.pagination');
  const page = useAgentSearchStore((s) => s.page);
  const setPage = useAgentSearchStore((s) => s.setPage);

  const pageCount = computePageCount(total, pageSize);
  if (pageCount <= 1) return null;

  const pages = buildPageWindow(page, pageCount);

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label={t('label')}>
      <Button
        variant='outline'
        size='sm'
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        aria-label={t('previous')}
      >
        <ChevronLeft className='h-3.5 w-3.5' aria-hidden='true' />
        <span className='hidden sm:inline'>{t('previous')}</span>
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'default' : 'ghost'}
          size='icon-sm'
          onClick={() => setPage(p)}
          aria-label={t('goToPage', { page: p })}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Button>
      ))}

      <Button
        variant='outline'
        size='sm'
        onClick={() => setPage(page + 1)}
        disabled={page >= pageCount}
        aria-label={t('next')}
      >
        <span className='hidden sm:inline'>{t('next')}</span>
        <ChevronRight className='h-3.5 w-3.5' aria-hidden='true' />
      </Button>
    </nav>
  );
}
