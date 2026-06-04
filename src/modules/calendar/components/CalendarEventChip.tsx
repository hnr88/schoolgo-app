'use client';

import { cn } from '@/lib/utils';
import { EVENT_STYLE } from '@/modules/calendar/constants/calendar.constants';
import type { CalendarEventChipProps } from '@/modules/calendar/types/calendar.types';

export function CalendarEventChip({ event }: CalendarEventChipProps) {
  const style = EVENT_STYLE[event.type];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium',
        style.badge,
      )}
    >
      <Icon className='h-3 w-3 shrink-0' />
      <span className='truncate'>{event.title}</span>
    </span>
  );
}
