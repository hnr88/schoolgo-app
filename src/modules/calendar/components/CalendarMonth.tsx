'use client';

import type { ComponentProps } from 'react';

import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { EVENT_STYLE, MAX_DAY_DOTS } from '@/modules/calendar/constants/calendar.constants';
import { groupEventTypesByDay, toDayKey } from '@/modules/calendar/lib/calendar-dates';
import type { CalendarEventType, CalendarMonthProps } from '@/modules/calendar/types/calendar.types';
import { SurfaceCard } from '@/modules/core';

function DayDots({ types }: { types: CalendarEventType[] }) {
  if (types.length === 0) return null;

  return (
    <span className='pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-0.5'>
      {types.slice(0, MAX_DAY_DOTS).map((type) => (
        <span key={type} className={cn('h-1 w-1 rounded-full', EVENT_STYLE[type].dot)} />
      ))}
    </span>
  );
}

export function CalendarMonth({ events, selectedDate, onSelectDate }: CalendarMonthProps) {
  const typesByDay = groupEventTypesByDay(events);

  function EventDayButton(props: ComponentProps<typeof CalendarDayButton>) {
    const types = typesByDay.get(toDayKey(props.day.date)) ?? [];

    return (
      <div className='relative h-full w-full'>
        <CalendarDayButton {...props} />
        <DayDots types={types} />
      </div>
    );
  }

  return (
    <SurfaceCard padding='sm'>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={onSelectDate}
        showOutsideDays
        components={{ DayButton: EventDayButton }}
        className='w-full'
      />
    </SurfaceCard>
  );
}
