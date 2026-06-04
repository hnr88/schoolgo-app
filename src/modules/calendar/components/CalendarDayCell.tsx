'use client';

import { isSameMonth, isToday } from 'date-fns';
import { useFormatter, useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { CalendarEventChip } from '@/modules/calendar/components/CalendarEventChip';
import { MAX_CELL_EVENTS } from '@/modules/calendar/constants/calendar.constants';
import type { CalendarDayCellProps } from '@/modules/calendar/types/calendar.types';

const FULL_DATE_OPTIONS = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
} as const;

export function CalendarDayCell({ day, month, isSelected, events, onSelectDay }: CalendarDayCellProps) {
  const t = useTranslations('Calendar');
  const format = useFormatter();
  const inMonth = isSameMonth(day, month);
  const today = isToday(day);
  const visible = events.slice(0, MAX_CELL_EVENTS);
  const overflow = events.length - visible.length;

  return (
    <button
      type='button'
      onClick={() => onSelectDay(day)}
      aria-label={format.dateTime(day, FULL_DATE_OPTIONS)}
      aria-pressed={isSelected}
      className={cn(
        'flex min-h-28 flex-col gap-1 bg-background p-2 text-left ease-out-quart transition-colors',
        'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        'lg:min-h-32',
        !inMonth && 'bg-gray-50',
        isSelected && 'relative z-10 ring-2 ring-inset ring-primary',
      )}
    >
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
          today && 'bg-primary text-background',
          !today && inMonth && 'text-ink-900',
          !today && !inMonth && 'text-foggy',
        )}
      >
        {format.dateTime(day, { day: 'numeric' })}
      </span>
      <span className='flex flex-col gap-1 overflow-hidden'>
        {visible.map((event) => (
          <CalendarEventChip key={event.id} event={event} />
        ))}
        {overflow > 0 && (
          <span className='px-1 text-xs font-medium text-foggy'>
            {t('moreEvents', { count: overflow })}
          </span>
        )}
      </span>
    </button>
  );
}
