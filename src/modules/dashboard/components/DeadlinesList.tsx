'use client';

import { CalendarClock, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState, FOCUS_RING_INSET } from '@/modules/core';
import { DashboardSectionHeader } from '@/modules/dashboard/components/DashboardSectionHeader';
import type { DeadlineRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function DeadlinesList({ deadlines }: { deadlines: DeadlineRowView[] }) {
  const t = useTranslations('Dashboard.deadlines');
  const hasRows = deadlines.length > 0;

  return (
    <section className='flex flex-col overflow-hidden rounded-lg bg-card shadow-2'>
      <DashboardSectionHeader title={t('title')} icon={CalendarClock} />
      {!hasRows ? (
        <EmptyState icon={CheckCircle} title={t('empty')} />
      ) : (
        <div className='flex flex-col gap-1 p-3'>
          {deadlines.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              className={cn(
                'group flex items-center gap-4 rounded-xl px-3 py-4 no-underline transition-colors duration-200 ease-out-quart hover:bg-gray-50',
                FOCUS_RING_INSET,
              )}
            >
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md',
                  d.toneClass,
                )}
              >
                <span className='text-lg font-bold leading-tight tabular-nums'>{d.day}</span>
                <span className='text-xs font-medium uppercase'>{d.month}</span>
              </span>
              <div className='min-w-0 flex-1'>
                <span className='block truncate text-sm font-semibold text-ink-900 group-hover:text-primary-strong'>
                  {d.label}
                </span>
                {d.description && (
                  <span className='mt-0.5 block truncate text-xs text-foggy'>{d.description}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
