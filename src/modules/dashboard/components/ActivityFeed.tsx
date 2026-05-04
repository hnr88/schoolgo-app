import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ActivityEvent } from '@/modules/dashboard/types/dashboard.types';
import { EVENT_COLOR, EVENT_ICON } from '../constants/ui.constants';

export async function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  const t = await getTranslations('Dashboard.activity');

  return (
    <div className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-1'>
      <div className='border-b border-divider px-5 py-4'>
        <h2 className='text-base font-bold text-ink-900'>{t('title')}</h2>
      </div>
      <div className='flex flex-col divide-y divide-divider'>
        {events.length === 0 ? (
          <p className='px-5 py-8 text-center text-sm text-foggy'>{t('empty')}</p>
        ) : (
          events.map((event) => {
            const Icon = EVENT_ICON[event.type];
            return (
              <Link
                key={event.id}
                href={event.href}
                className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted'
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                    EVENT_COLOR[event.type],
                  )}
                >
                  <Icon className='h-4 w-4' strokeWidth={1.75} />
                </span>
                <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary'>
                  {event.text}
                </span>
                <span className='shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foggy'>
                  {event.timestamp}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
