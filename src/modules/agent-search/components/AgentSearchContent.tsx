'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { AgentFilterSidebar } from '@/modules/agent-search/components/AgentFilterSidebar';
import { AgentResultsPanel } from '@/modules/agent-search/components/AgentResultsPanel';
import { AgentSearchBar } from '@/modules/agent-search/components/AgentSearchBar';
import { AgentPagination } from '@/modules/agent-search/components/AgentPagination';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import type { AgentSearchContentProps } from '@/modules/agent-search/types/component.types';

export function AgentSearchContent({ activePortal, className }: AgentSearchContentProps) {
  const t = useTranslations('AgentSearch.header');
  const { data, isLoading } = useAgentSearchWithFilters();

  const total = data?.data?.total ?? 0;
  const pageSize = data?.data?.pageSize ?? 0;

  return (
    <div className={cn('flex w-full', className)}>
      <AgentFilterSidebar />

      <section className='flex min-w-0 flex-1 flex-col gap-4 px-4 py-6 sm:px-6'>
        <header className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-lg font-semibold text-ink-900'>{t('title')}</h2>
            <p className='text-body-sm text-foggy'>
              {isLoading ? t('countLoading') : t('count', { count: total })}
            </p>
          </div>
          <AgentSearchBar className='max-w-xl' />
        </header>

        <AgentResultsPanel activePortal={activePortal} />

        <AgentPagination total={total} pageSize={pageSize} className='pt-2' />
      </section>
    </div>
  );
}
