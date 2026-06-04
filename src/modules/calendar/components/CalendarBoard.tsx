'use client';

import { isSameDay } from 'date-fns';
import { CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CalendarDayCell } from '@/modules/calendar/components/CalendarDayCell';
import { groupEventsByDay, toDayKey } from '@/modules/calendar/lib/calendar-dates';
import { getMonthMatrix, getWeekdayHeaders } from '@/modules/calendar/lib/calendar-grid';
import type { CalendarBoardProps } from '@/modules/calendar/types/calendar.types';
import { SurfaceCard } from '@/modules/core';

export function CalendarBoard({
  month,
  selectedDate,
  events,
  onSelectDay,
  onToday,
  onPrevMonth,
  onNextMonth,
  onAddReminder,
}: CalendarBoardProps) {
  const t = useTranslations('Calendar');
  const format = useFormatter();
  const days = getMonthMatrix(month);
  const weekdays = getWeekdayHeaders();
  const eventsByDay = groupEventsByDay(events);

  return (
    <SurfaceCard padding='none' className='overflow-hidden border border-gray-100'>
      <div className='flex flex-col gap-3 border-b border-divider px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='font-display text-lg font-bold text-ink-900'>
          {format.dateTime(month, { month: 'long', year: 'numeric' })}
        </h2>
        <div className='flex items-center gap-2'>
          <Button type='button' variant='outline' size='sm' onClick={onToday}>
            {t('today')}
          </Button>
          <div className='flex items-center'>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={onPrevMonth}
              aria-label={t('previousMonth')}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={onNextMonth}
              aria-label={t('nextMonth')}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
          <Button type='button' size='sm' onClick={onAddReminder}>
            <CalendarPlus className='h-4 w-4' />
            {t('addReminder')}
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-7 border-b border-divider'>
        {weekdays.map((weekday) => (
          <span
            key={weekday.toISOString()}
            className='py-2 text-center text-xs font-semibold uppercase tracking-wide text-foggy'
          >
            {format.dateTime(weekday, { weekday: 'short' })}
          </span>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-px bg-divider'>
        {days.map((day) => (
          <CalendarDayCell
            key={day.toISOString()}
            day={day}
            month={month}
            isSelected={isSameDay(day, selectedDate)}
            events={eventsByDay.get(toDayKey(day)) ?? []}
            onSelectDay={onSelectDay}
          />
        ))}
      </div>
    </SurfaceCard>
  );
}
