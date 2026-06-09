'use client';

import { useTranslations } from 'next-intl';
import { Award } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useAgentPerformance } from '@/modules/school-agent-performance/queries/use-agent-performance.query';
import { AgentPerformanceSkeleton } from '@/modules/school-agent-performance/components/AgentPerformanceSkeleton';
import { PerformanceTotals } from '@/modules/school-agent-performance/components/PerformanceTotals';
import { AgentPerformanceTable } from '@/modules/school-agent-performance/components/AgentPerformanceTable';

export function SchoolAgentPerformancePage() {
  const t = useTranslations('SchoolAgentPerformance');
  const query = useAgentPerformance();
  const performance = query.data;
  const isEmpty = performance !== undefined && performance.totals.applications === 0;

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Award} title={t('title')} description={t('subtitle')} />

      {query.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : query.isLoading || performance === undefined ? (
        <AgentPerformanceSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={Award}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <>
          <PerformanceTotals totals={performance.totals} />
          {performance.byAgent.length > 0 ? (
            <AgentPerformanceTable byAgent={performance.byAgent} />
          ) : null}
        </>
      )}
    </div>
  );
}
