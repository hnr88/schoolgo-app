'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AgendaList } from '@/modules/calendar/components/AgendaList';
import { CalendarMonth } from '@/modules/calendar/components/CalendarMonth';
import { CalendarSkeleton } from '@/modules/calendar/components/CalendarSkeleton';
import { useCalendarEvents } from '@/modules/calendar/hooks/useCalendarEvents';
import { ErrorState } from '@/modules/core';

export function CalendarPage() {
  const t = useTranslations('Calendar');
  const { events, isLoading, isError } = useCalendarEvents();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (isError) {
    return <ErrorState message={t('errorMessage')} />;
  }

  return (
    <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-[auto_1fr]'>
      <CalendarMonth
        events={events}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <AgendaList
        events={events}
        selectedDate={selectedDate}
        onClearFilter={() => setSelectedDate(undefined)}
      />
    </div>
  );
}
