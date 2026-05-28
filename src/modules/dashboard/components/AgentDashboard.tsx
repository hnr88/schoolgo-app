'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { ActionBanner } from '@/modules/dashboard/components/ActionBanner';
import { ActivityFeed } from '@/modules/dashboard/components/ActivityFeed';
import { DeadlinesList } from '@/modules/dashboard/components/DeadlinesList';
import { PipelineCards } from '@/modules/dashboard/components/PipelineCards';
import { QuickActions } from '@/modules/dashboard/components/QuickActions';
import { useAgentDashboard } from '@/modules/dashboard/queries/use-agent-dashboard.query';
import {
  mapActionRows,
  mapActivityRows,
  mapDeadlineRows,
  mapStatCards,
} from '@/modules/dashboard/lib/agent-dashboard.lib';

function DashboardSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-24 w-full rounded-xl' />
        ))}
      </div>
      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <Skeleton className='h-80 w-full rounded-xl' />
        <Skeleton className='h-80 w-full rounded-xl' />
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
      <div className='rounded-xl border border-border bg-card shadow-1'>
        <ErrorState
          message={t('loadError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      </div>
    );
  }

  const cards = mapStatCards(data.stats);
  const activity = mapActivityRows(data.activity, locale);
  const deadlines = mapDeadlineRows(data.deadlines.items, locale);
  const actions = mapActionRows(data.actionItems.items);

  return (
    <div className='flex flex-col gap-8'>
      <ActionBanner items={actions} />
      <PipelineCards cards={cards} />

      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <ActivityFeed events={activity} />
        <DeadlinesList deadlines={deadlines} />
      </div>

      <section className='flex flex-col gap-4'>
        <h2 className='text-base font-bold text-ink-900'>{t('quickActionsTitle')}</h2>
        <QuickActions />
      </section>
    </div>
  );
}
