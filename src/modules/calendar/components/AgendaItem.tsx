'use client';

import { ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { EventTypeBadge } from '@/modules/calendar/components/EventTypeBadge';
import { formatEventDate } from '@/modules/calendar/lib/calendar-dates';
import type { AgendaItemProps } from '@/modules/calendar/types/calendar.types';

export function AgendaItem({ event }: AgendaItemProps) {
  const locale = useLocale();

  return (
    <Link
      href={event.href}
      className='flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-1 transition-colors hover:bg-muted/50'
    >
      <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <div className='flex items-center gap-2'>
          <EventTypeBadge type={event.type} />
          <time className='text-xs text-muted-foreground'>{formatEventDate(event.date, locale)}</time>
        </div>
        <p className='truncate text-sm font-medium text-ink-900'>{event.title}</p>
        {event.school && <p className='truncate text-xs text-foggy'>{event.school}</p>}
      </div>
      <ChevronRight className='h-4 w-4 shrink-0 text-muted-foreground' />
    </Link>
  );
}
