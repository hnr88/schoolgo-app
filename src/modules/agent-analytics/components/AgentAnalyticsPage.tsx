'use client';

import { useTranslations } from 'next-intl';
import { ChartLine } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useAgentAnalytics } from '@/modules/agent-analytics/queries/use-agent-analytics.query';
import { AgentAnalyticsSkeleton } from '@/modules/agent-analytics/components/AgentAnalyticsSkeleton';
import { AnalyticsTotals } from '@/modules/agent-analytics/components/AnalyticsTotals';
import { TopSchoolsChart } from '@/modules/agent-analytics/components/TopSchoolsChart';
import { SchoolAnalyticsTable } from '@/modules/agent-analytics/components/SchoolAnalyticsTable';

export function AgentAnalyticsPage() {
  const t = useTranslations('AgentAnalytics');
  const query = useAgentAnalytics();
  const analytics = query.data;
  const isEmpty = analytics !== undefined && analytics.totals.applications === 0;

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={ChartLine} title={t('title')} description={t('subtitle')} />

      {query.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : query.isLoading || analytics === undefined ? (
        <AgentAnalyticsSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={ChartLine}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <>
          <AnalyticsTotals totals={analytics.totals} />
          {analytics.bySchool.length > 0 ? (
            <>
              <TopSchoolsChart bySchool={analytics.bySchool} />
              <SchoolAnalyticsTable bySchool={analytics.bySchool} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
