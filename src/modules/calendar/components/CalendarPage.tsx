'use client';

import { useTranslations } from 'next-intl';

import { CalendarBoard } from '@/modules/calendar/components/CalendarBoard';
import { CalendarSkeleton } from '@/modules/calendar/components/CalendarSkeleton';
import { DayPanel } from '@/modules/calendar/components/DayPanel';
import { ReminderFormDialog } from '@/modules/calendar/components/ReminderFormDialog';
import { useCalendarEvents } from '@/modules/calendar/hooks/useCalendarEvents';
import { useCalendarNavigation } from '@/modules/calendar/hooks/useCalendarNavigation';
import { useReminderDialog } from '@/modules/calendar/hooks/useReminderDialog';
import { ErrorState } from '@/modules/core';

export function CalendarPage() {
  const t = useTranslations('Calendar');
  const { events, isLoading, isError, refetchAll } = useCalendarEvents();
  const { month, selectedDate, goToday, goPrevMonth, goNextMonth, selectDay } =
    useCalendarNavigation();
  const dialog = useReminderDialog();

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        framed
        message={t('errorMessage')}
        onRetry={() => refetchAll()}
        retryLabel={t('retry')}
      />
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-3 2xl:grid-cols-4'>
        <div className='lg:col-span-2 2xl:col-span-3'>
          <CalendarBoard
            month={month}
            selectedDate={selectedDate}
            events={events}
            onSelectDay={selectDay}
            onToday={goToday}
            onPrevMonth={goPrevMonth}
            onNextMonth={goNextMonth}
            onAddReminder={() => dialog.openCreate()}
          />
        </div>
        <DayPanel
          selectedDate={selectedDate}
          events={events}
          onAddReminder={() => dialog.openCreate(selectedDate)}
          onEditReminder={dialog.openEdit}
        />
      </div>
      <ReminderFormDialog
        open={dialog.isOpen}
        onOpenChange={dialog.setOpen}
        reminder={dialog.reminder}
        presetDate={dialog.presetDate}
      />
    </>
  );
}
