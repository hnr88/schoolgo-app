'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutGrid, List, Kanban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { ApplicationTable } from '@/modules/applications/components/ApplicationTable';
import { KanbanBoard } from '@/modules/pipeline/components/KanbanBoard';
import { PIPELINE_COLUMNS } from '@/modules/pipeline/constants/pipeline.constants';
import { usePipeline } from '@/modules/pipeline/queries/use-pipeline.query';
import type { ApplicationSortField, SortDirection } from '@/modules/applications/types/component.types';

export function PipelineKanbanPage() {
  const t = useTranslations('Pipeline');
  const { data, isLoading } = usePipeline();
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [sortField, setSortField] = useState<ApplicationSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const isEmpty = !isLoading && (data?.total ?? 0) === 0;

  function handleSort(field: ApplicationSortField) {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortField(null);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-foggy'>
          {t('totalApplications', { count: data?.total ?? 0 })}
        </span>
        <div className='flex items-center gap-1 rounded-lg bg-muted p-1'>
          <button
            type='button'
            onClick={() => setView('kanban')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              view === 'kanban' ? 'bg-card text-ink-900 shadow-sm' : 'text-foggy hover:text-ink-900',
            )}
          >
            <LayoutGrid className='h-4 w-4' />
          </button>
          <button
            type='button'
            onClick={() => setView('table')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              view === 'table' ? 'bg-card text-ink-900 shadow-sm' : 'text-foggy hover:text-ink-900',
            )}
          >
            <List className='h-4 w-4' />
          </button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState
          icon={Kanban}
          title={t('emptyTitle')}
          description={t('emptySubtitle')}
        />
      ) : view === 'kanban' ? (
        <KanbanBoard
          columns={PIPELINE_COLUMNS}
          applicationsByColumn={data?.byColumn ?? {}}
          isLoading={isLoading}
        />
      ) : (
        <div className='overflow-hidden rounded-xl border border-border bg-card'>
          <ApplicationTable
            applications={data?.applications ?? []}
            isLoading={isLoading}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            pageSize={data?.applications?.length ?? 20}
          />
        </div>
      )}
    </div>
  );
}
