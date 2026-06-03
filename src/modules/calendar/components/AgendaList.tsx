'use client';

import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { AgendaItem } from '@/modules/calendar/components/AgendaItem';
import { filterEventsByDay } from '@/modules/calendar/lib/calendar-dates';
import type { AgendaListProps } from '@/modules/calendar/types/calendar.types';
import { EmptyState } from '@/modules/core';

export function AgendaList({ events, selectedDate, onClearFilter }: AgendaListProps) {
  const t = useTranslations('Calendar');
  const visible = filterEventsByDay(events, selectedDate);

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-semibold text-ink-900'>
          {selectedDate ? t('agendaForDay') : t('agendaUpcoming')}
        </h2>
        {selectedDate && (
          <button
            type='button'
            onClick={onClearFilter}
            className='text-xs font-medium text-primary hover:underline'
          >
            {t('showAll')}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <EmptyState
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
