'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarClock, CalendarDays, Gift } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { useParentDerivedApplications } from '@/modules/dashboard/parent/hooks/useParentDerivedApplications';

export function ParentUpcomingCard() {
  const t = useTranslations('ParentDashboard');
  const format = useFormatter();
  const { upcoming, isLoading, isError, refetch } = useParentDerivedApplications();

  return (
    <ParentDashboardCard
      title={t('upcomingTitle')}
      icon={CalendarClock}
      viewAllHref='/parent/calendar'
      viewAllLabel={t('upcomingViewCalendar')}
    >
      {isLoading ? (
        <ParentSummaryRowsSkeleton rows={2} />
      ) : isError ? (
        <ErrorState message={t('upcomingError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : upcoming.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={t('upcomingEmptyTitle')}
          description={t('upcomingEmptySubtitle')}
          action={
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <Link href='/parent/tours' className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}>
                <CalendarDays className='h-4 w-4' aria-hidden='true' />
                {t('upcomingViewTours')}
              </Link>
              <Link href='/parent/offers' className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}>
                <Gift className='h-4 w-4' aria-hidden='true' />
                {t('upcomingViewOffers')}
              </Link>
            </div>
          }
        />
      ) : (
        <ul className='flex flex-col gap-0.5'>
          {upcoming.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className='group flex items-center gap-3 rounded-xl px-2 py-2.5 no-underline transition-colors duration-200 ease-out-quart hover:bg-muted'
                >
                  <Icon
                    className='h-4 w-4 shrink-0 text-foggy transition-colors duration-200 ease-out-quart group-hover:text-ink-900'
                    strokeWidth={1.75}
                    aria-hidden='true'
                  />
                  <span className='flex min-w-0 flex-1 flex-col'>
                    <span className='truncate text-sm font-semibold text-ink-900 group-hover:text-primary-strong'>
                      {t('upcomingOfferDeadline')}
                    </span>
                    <span className='truncate text-xs text-foggy'>
                      {item.title} · {item.subtitle}
                    </span>
                  </span>
                  <span className='shrink-0 text-xs font-medium text-foggy tabular-nums'>
                    {format.dateTime(new Date(item.iso), { day: 'numeric', month: 'short' })}
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
