'use client';

import { useTranslations } from 'next-intl';
import { Gauge } from 'lucide-react';
import { EmptyState, ErrorState } from '@/modules/core';
import {
  AgentAnalyticsSkeleton,
  AnalyticsTotals,
  SchoolAnalyticsTable,
  useAgentAnalytics,
} from '@/modules/agent-analytics';

/**
 * Read-only success-metrics tab. Success metrics are not agent-editable scalars —
 * they are conversion analytics aggregated server-side from the agent's real
 * applications (`GET /api/agents/me/analytics`). The builder surfaces them as a
 * read-only display (totals + per-school table) rather than an editable form.
 */
export function SuccessMetricsTab() {
  const t = useTranslations('AgentProfileBuilder');
  const query = useAgentAnalytics();
  const analytics = query.data;
  const isEmpty = analytics !== undefined && analytics.totals.applications === 0;

  if (query.isError) {
    return (
      <ErrorState
        framed
        message={t('successMetricsError')}
        onRetry={() => query.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  if (query.isLoading || analytics === undefined) return <AgentAnalyticsSkeleton />;

  if (isEmpty) {
    return (
      <EmptyState
        framed
        icon={Gauge}
        title={t('successMetricsEmptyTitle')}
        description={t('successMetricsEmptyDescription')}
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm text-muted-foreground'>{t('successMetricsIntro')}</p>
      <AnalyticsTotals totals={analytics.totals} />
      {analytics.bySchool.length > 0 ? <SchoolAnalyticsTable bySchool={analytics.bySchool} /> : null}
    </div>
  );
}
