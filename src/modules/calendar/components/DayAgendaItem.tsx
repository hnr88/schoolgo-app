'use client';

import { ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link } from '@/i18n/navigation';
import { EventTypeBadge } from '@/modules/calendar/components/EventTypeBadge';
import { formatEventTime } from '@/modules/calendar/lib/calendar-dates';
import { useDeleteReminder } from '@/modules/calendar/queries/use-delete-reminder.mutation';
import type { DayAgendaItemProps } from '@/modules/calendar/types/calendar.types';

const CARD_CLASS = 'flex items-center gap-3 rounded-lg border border-gray-100 bg-background p-4';
const ICON_BUTTON_CLASS =
  'flex h-8 w-8 items-center justify-center rounded-md text-foggy transition-colors hover:bg-muted hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function DayAgendaItem({ event, onEditReminder }: DayAgendaItemProps) {
  const t = useTranslations('Calendar');
  const format = useFormatter();
  const deleteReminder = useDeleteReminder();

  const content = (
    <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
      <div className='flex items-center gap-2'>
        <EventTypeBadge type={event.type} />
        <time className='text-xs text-muted-foreground'>
          {formatEventTime(event.date, format.dateTime)}
        </time>
      </div>
      <p className='truncate text-sm font-medium text-ink-900'>{event.title}</p>
      {event.school && <p className='truncate text-xs text-foggy'>{event.school}</p>}
      {event.note && <p className='text-xs text-foggy'>{event.note}</p>}
    </div>
  );

  if (event.reminderId) {
    const reminderId = event.reminderId;

    return (
      <div className={CARD_CLASS}>
        {content}
        <div className='flex shrink-0 items-center gap-1'>
          <button
            type='button'
            onClick={() =>
              onEditReminder({
                documentId: reminderId,
                title: event.title,
                remindAt: event.date,
                note: event.note ?? null,
              })
            }
            aria-label={t('editReminderAria')}
            className={ICON_BUTTON_CLASS}
          >
            <Pencil className='h-4 w-4' />
          </button>
          <AlertDialog>
            <AlertDialogTrigger
              aria-label={t('deleteReminderAria')}
              className={`${ICON_BUTTON_CLASS} hover:text-rausch-700`}
            >
              <Trash2 className='h-4 w-4' />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('deleteReminderTitle')}</AlertDialogTitle>
                <AlertDialogDescription>{t('deleteReminderDescription')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteReminder.mutate(reminderId)}>
                  {t('deleteConfirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  }

  if (!event.href) {
    return <div className={CARD_CLASS}>{content}</div>;
  }

  return (
    <Link
      href={event.href}
      className={`${CARD_CLASS} ease-out-quart transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
    >
      {content}
      <ChevronRight className='h-4 w-4 shrink-0 text-muted-foreground' />
    </Link>
  );
}
