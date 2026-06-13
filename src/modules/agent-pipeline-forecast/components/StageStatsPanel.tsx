'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useStageStats } from '@/modules/agent-pipeline-forecast/queries/use-stage-stats.query';
import { SchoolStatsSelect } from '@/modules/agent-pipeline-forecast/components/SchoolStatsSelect';
import { StageStatsTable } from '@/modules/agent-pipeline-forecast/components/StageStatsTable';
import type { SchoolOption } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface StageStatsPanelProps {
  schools: SchoolOption[];
}

export function StageStatsPanel({ schools }: StageStatsPanelProps) {
  const t = useTranslations('AgentForecast');
  const [selected, setSelected] = useState<string | undefined>(
    schools[0]?.documentId,
  );
  const query = useStageStats(selected);
  const stages = query.data?.stages ?? [];

  return (
    <section className='flex flex-col gap-4 rounded-lg border border-divider bg-card p-6 shadow-2'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-base font-semibold text-ink-900'>{t('stageStatsTitle')}</h2>
          <p className='text-sm text-foggy'>{t('stageStatsCaption')}</p>
        </div>
        <SchoolStatsSelect options={schools} value={selected} onChange={setSelected} />
      </div>

      {query.isError ? (
        <ErrorState
          message={t('stageStatsError')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : query.isLoading ? (
        <Skeleton className='h-40 w-full rounded-lg' />
      ) : stages.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title={t('stageStatsEmptyTitle')}
          description={t('stageStatsEmptyDescription')}
        />
      ) : (
        <StageStatsTable stages={stages} />
      )}
    </section>
  );
}
