'use client';

import { useState } from 'react';
import { History, Inbox } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { AgentActivityList } from '@/modules/agent-activity/components/AgentActivityList';
import { AgentActivityPager } from '@/modules/agent-activity/components/AgentActivityPager';
import { AGENT_ACTIVITY_PAGE_SIZE } from '@/modules/agent-activity/constants/agent-activity.constants';
import { useAgentActivity } from '@/modules/agent-activity/queries/use-agent-activity.query';
import { EmptyState, ErrorState } from '@/modules/core';
import { DashboardSectionHeader } from '@/modules/dashboard/components/DashboardSectionHeader';
import { PageHeader } from '@/modules/dashboard/components/PageHeader';
import { mapActivityRows } from '@/modules/dashboard/lib/agent-dashboard.lib';

export function AgentActivityPage() {
  const t = useTranslations('AgentActivity');
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useAgentActivity(page);

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
        <DashboardSectionHeader title={t('feedTitle')} icon={History} />

        {isLoading && (
          <div className='flex flex-col gap-3 p-5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-12 w-full rounded-md' />
            ))}
          </div>
        )}

        {isError && (
          <ErrorState
            message={t('errorMessage')}
            onRetry={() => refetch()}
            retryLabel={t('retry')}
          />
        )}

        {data && data.events.length === 0 && (
          <EmptyState
            icon={Inbox}
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        )}

        {data && data.events.length > 0 && (
          <>
            <AgentActivityList rows={mapActivityRows(data.events, locale)} />
            <AgentActivityPager
              page={data.pagination.page}
              pageCount={Math.max(
                1,
                Math.ceil(data.pagination.total / AGENT_ACTIVITY_PAGE_SIZE),
              )}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => p + 1)}
            />
          </>
        )}
      </section>
    </div>
  );
}
