'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { ActionBanner } from '@/modules/dashboard/components/ActionBanner';
import { ActivityFeed } from '@/modules/dashboard/components/ActivityFeed';
import { DeadlinesList } from '@/modules/dashboard/components/DeadlinesList';
import { PipelineStatTiles } from '@/modules/dashboard/components/PipelineStatTiles';
import { QuickActions } from '@/modules/dashboard/components/QuickActions';
import { useAgentDashboard } from '@/modules/dashboard/queries/use-agent-dashboard.query';
import { AgentOnboardingChecklist } from '@/modules/agent-profile';
import { PageHeader } from '@/modules/dashboard/components/PageHeader';
import {
  mapActionRows,
  mapActivityRows,
  mapDeadlineRows,
  mapStatTiles,
} from '@/modules/dashboard/lib/agent-dashboard.lib';

function DashboardSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32 w-full rounded-lg' />
        ))}
      </div>
      <div className='grid gap-6 lg:grid-cols-5'>
        <Skeleton className='h-80 w-full rounded-lg lg:col-span-3' />
        <Skeleton className='h-80 w-full rounded-lg lg:col-span-2' />
      </div>
    </div>
  );
}

export function AgentDashboard() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = useAgentDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !data) {
    return (
      <div className='rounded-lg bg-card shadow-2'>
        <ErrorState
          message={t('loadError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      </div>
    );
  }

  const tiles = data.stats ? mapStatTiles(data.stats) : [];
  const activity = data.activity ? mapActivityRows(data.activity, locale) : [];
  const deadlines = data.deadlines ? mapDeadlineRows(data.deadlines.items, locale) : [];
  const actions = data.actionItems ? mapActionRows(data.actionItems.items) : [];

  const sectionError = (
    <ErrorState
      message={t('sectionError')}
      onRetry={() => refetch()}
      retryLabel={t('retry')}
      framed
    />
  );

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title={t('nav.dashboard')} description={t('pageSubtitle')} />
      <AgentOnboardingChecklist />
      {!data.sectionErrors.actionItems && <ActionBanner items={actions} />}
      {data.sectionErrors.stats ? sectionError : <PipelineStatTiles tiles={tiles} />}

      <div className='grid gap-6 lg:grid-cols-5'>
        <div className='lg:col-span-3'>
          {data.sectionErrors.activity ? sectionError : <ActivityFeed events={activity} />}
        </div>
        <div className='lg:col-span-2'>
          {data.sectionErrors.deadlines ? sectionError : <DeadlinesList deadlines={deadlines} />}
        </div>
      </div>

      <section className='flex flex-col gap-4'>
        <h2 className='font-display text-section-h2 font-semibold tracking-tight text-ink-900'>
          {t('quickActionsTitle')}
        </h2>
        <QuickActions />
      </section>
    </div>
  );
}
