'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ErrorState, FOCUS_RING } from '@/modules/core';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { useParentDerivedApplications } from '@/modules/dashboard/parent/hooks/useParentDerivedApplications';

export function ParentActionRequiredCard() {
  const t = useTranslations('ParentDashboard');
  const { actionItems, isLoading, isError, refetch } = useParentDerivedApplications();

  return (
    <ParentDashboardCard title={t('actionRequiredTitle')} icon={ShieldAlert}>
      {isLoading ? (
        <ParentSummaryRowsSkeleton rows={2} />
      ) : isError ? (
        <ErrorState
          message={t('actionRequiredError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      ) : actionItems.length === 0 ? (
        <div className='flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-4'>
          <CheckCircle2 className='h-5 w-5 shrink-0 text-foggy' strokeWidth={1.75} aria-hidden='true' />
          <span className='flex flex-col'>
            <span className='text-sm font-semibold text-ink-900'>
              {t('actionRequiredEmptyTitle')}
            </span>
            <span className='text-xs text-foggy'>{t('actionRequiredEmptySubtitle')}</span>
          </span>
        </div>
      ) : (
        <ul className='-mx-2 flex flex-col gap-1'>
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-2 py-3 no-underline transition-colors duration-200 ease-out-quart hover:bg-gray-50',
                    FOCUS_RING,
                  )}
                >
                  <Icon
                    className='h-4 w-4 shrink-0 text-foggy'
                    strokeWidth={1.75}
                    aria-hidden='true'
                  />
                  <span className='flex min-w-0 flex-1 flex-col'>
                    <span className='truncate text-sm font-semibold text-ink-900'>
                      {t(item.labelKey)}
                    </span>
                    <span className='truncate text-xs text-foggy'>
                      {item.studentName} · {item.schoolName}
                    </span>
                  </span>
                  <span className='flex shrink-0 items-center gap-0.5 text-sm font-semibold text-primary-strong transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5'>
                    {t('actionReview')}
                    <ChevronRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </ParentDashboardCard>
  );
}
