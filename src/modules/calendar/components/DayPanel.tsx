'use client';

import { CalendarDays, Plus } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { DayAgendaItem } from '@/modules/calendar/components/DayAgendaItem';
import { filterEventsByDay } from '@/modules/calendar/lib/calendar-dates';
import type { DayPanelProps } from '@/modules/calendar/types/calendar.types';
import { EmptyState, SurfaceCard } from '@/modules/core';

const HEADER_DATE_OPTIONS = { weekday: 'long', day: 'numeric', month: 'long' } as const;

export function DayPanel({ selectedDate, events, onAddReminder, onEditReminder }: DayPanelProps) {
  const t = useTranslations('Calendar');
  const format = useFormatter();
  const dayEvents = filterEventsByDay(events, selectedDate);

  return (
    <SurfaceCard className='flex flex-col gap-4 border border-gray-100 lg:sticky lg:top-6'>
      <div className='flex items-start justify-between gap-3'>
        <h2 className='font-display text-base font-bold text-ink-900'>
          {format.dateTime(selectedDate, HEADER_DATE_OPTIONS)}
        </h2>
        <Button type='button' variant='outline' size='sm' onClick={onAddReminder}>
          <Plus className='h-4 w-4' />
          {t('addReminderForDay')}
        </Button>
      </div>

      {dayEvents.length === 0 ? (
        <EmptyState
          framed
          icon={CalendarDays}
          title={t('dayPanelEmptyTitle')}
          description={t('dayPanelEmptyDescription')}
        />
      ) : (
        <ul className='flex flex-col gap-3'>
          {dayEvents.map((event) => (
            <li key={event.id}>
              <DayAgendaItem event={event} onEditReminder={onEditReminder} />
            </li>
          ))}
        </ul>
      )}
    </SurfaceCard>
  );
}
