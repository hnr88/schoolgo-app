'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatTourDateTime, formatTourLocation } from '@/modules/tours/lib/format-tour';
import type { MyBookingCardProps } from '@/modules/tours/types/tours.types';

export function MyBookingCard({ booking, onCancel }: MyBookingCardProps) {
  const t = useTranslations('Tours');
  const locale = useLocale();

  const { tour, status } = booking;
  const dateTime = formatTourDateTime(tour?.startsAt ?? null, locale);
  const location = formatTourLocation([
    tour?.location ?? null,
    tour?.school?.suburb ?? null,
    tour?.school?.state ?? null,
  ]);
  const isCancelled = status === 'cancelled';

  return (
    <article className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-1 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='text-base font-semibold text-ink-900'>
            {tour?.title ?? t('unknownTour')}
          </h3>
          <Badge variant={isCancelled ? 'outline' : 'secondary'}>
            {isCancelled ? t('statusCancelled') : t('statusBooked')}
          </Badge>
        </div>
        {tour?.school?.name && <p className='text-sm text-foggy'>{tour.school.name}</p>}
        <div className='flex flex-col gap-1.5 text-sm text-foggy'>
          {dateTime && (
            <span className='flex items-center gap-1.5'>
              <CalendarDays className='h-4 w-4 shrink-0' />
              {dateTime}
            </span>
          )}
          {location && (
            <span className='flex items-center gap-1.5'>
              <MapPin className='h-4 w-4 shrink-0' />
              {location}
            </span>
          )}
        </div>
      </div>

      {!isCancelled && (
        <div className='shrink-0'>
          <Button variant='outline' onClick={() => onCancel(booking)} className='w-full sm:w-auto'>
            {t('cancelBooking')}
          </Button>
        </div>
      )}
    </article>
  );
}
