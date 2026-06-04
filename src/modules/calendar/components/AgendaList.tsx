'use client';

import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { AgendaItem } from '@/modules/calendar/components/AgendaItem';
import { filterEventsByDay } from '@/modules/calendar/lib/calendar-dates';
import type { AgendaListProps } from '@/modules/calendar/types/calendar.types';
import { EmptyState, SectionHeading } from '@/modules/core';

export function AgendaList({ events, selectedDate, onClearFilter }: AgendaListProps) {
  const t = useTranslations('Calendar');
  const visible = filterEventsByDay(events, selectedDate);

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading
        title={selectedDate ? t('agendaForDay') : t('agendaUpcoming')}
        level={3}
        actions={
          selectedDate ? (
            <button
              type='button'
              onClick={onClearFilter}
              className='rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            >
              {t('showAll')}
            </button>
          ) : undefined
        }
      />

      {visible.length === 0 ? (
        <EmptyState
          framed
          icon={CalendarDays}
          title={selectedDate ? t('emptyDayTitle') : t('emptyTitle')}
          description={selectedDate ? undefined : t('emptySubtitle')}
          action={
            selectedDate ? undefined : (
              <Link href='/parent/tours' className={buttonVariants({ size: 'sm' })}>
                {t('browseTours')}
              </Link>
            )
          }
        />
      ) : (
        <ul className='flex flex-col gap-3'>
          {visible.map((event) => (
            <li key={event.id}>
              <AgendaItem event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
