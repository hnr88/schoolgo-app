'use client';

import type { ComponentProps } from 'react';

import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { getEventDates } from '@/modules/calendar/lib/calendar-dates';
import type { CalendarMonthProps } from '@/modules/calendar/types/calendar.types';

function EventDayButton(props: ComponentProps<typeof CalendarDayButton>) {
  const hasEvents = Boolean(props.modifiers.hasEvents);

  return (
    <div className='relative h-full w-full'>
      <CalendarDayButton {...props} />
      {hasEvents && (
        <span className='pointer-events-none absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary' />
      )}
    </div>
  );
}

export function CalendarMonth({ events, selectedDate, onSelectDate }: CalendarMonthProps) {
  const eventDates = getEventDates(events);

  return (
    <div className='rounded-lg border border-border bg-card p-2 shadow-1'>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={onSelectDate}
        showOutsideDays
        modifiers={{ hasEvents: eventDates }}
        components={{ DayButton: EventDayButton }}
        className='w-full'
      />
    </div>
  );
}
