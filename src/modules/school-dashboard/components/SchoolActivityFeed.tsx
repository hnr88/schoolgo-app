'use client';

import { Activity, Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { EmptyState } from '@/modules/core';
import { SchoolSectionHeader } from '@/modules/school-dashboard/components/SchoolSectionHeader';
import type { SchoolActivityRowView } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolActivityFeed({ events }: { events: SchoolActivityRowView[] }) {
  const t = useTranslations('SchoolDashboard');
  const hasRows = events.length > 0;

  return (
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
      <SchoolSectionHeader
        title={t('activityTitle')}
        icon={Activity}
        viewAllHref={hasRows ? '/dashboard/applications' : undefined}
        viewAllLabel={t('viewAll')}
      />
      <div className='flex flex-col divide-y divide-divider'>
        {!hasRows ? (
          <EmptyState icon={Inbox} title={t('activityEmpty')} />
        ) : (
          events.map((event) => (
            <Link
              key={event.id}
              href={event.href}
              className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
            >
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-vivid-iris-soft text-vivid-iris'>
                <Activity className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary-strong'>
                {event.text}
              </span>
              {event.timestamp && (
                <span className='shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foggy tabular-nums'>
                  {event.timestamp}
                </span>
              )}
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
