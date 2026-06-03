'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, CheckCircle2, Loader2, MapPin, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatTourDateTime, formatTourLocation } from '@/modules/tours/lib/format-tour';
import type { TourCardProps } from '@/modules/tours/types/tours.types';

export function TourCard({ tour, isBooked, onBook, isBooking }: TourCardProps) {
  const t = useTranslations('Tours');
  const locale = useLocale();

  const dateTime = formatTourDateTime(tour.startsAt, locale);
  const location = formatTourLocation([tour.location, tour.school?.suburb ?? null, tour.school?.state ?? null]);

  return (
    <article className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-1 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-0.5'>
          <h3 className='text-base font-semibold text-ink-900'>{tour.title}</h3>
          {tour.school?.name && <p className='text-sm text-foggy'>{tour.school.name}</p>}
        </div>
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
          <span className='flex items-center gap-1.5'>
            <Users className='h-4 w-4 shrink-0' />
            {tour.isFull
              ? t('full')
              : t('spotsRemaining', { count: tour.remainingSpots })}
          </span>
        </div>
      </div>

      <div className='shrink-0'>
        {isBooked ? (
          <span className='flex items-center gap-1.5 text-sm font-medium text-vivid-mint'>
            <CheckCircle2 className='h-4 w-4' />
            {t('booked')}
          </span>
        ) : (
          <Button
            onClick={() => onBook(tour)}
            disabled={tour.isFull || isBooking}
            className='w-full sm:w-auto'
          >
            {isBooking && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {tour.isFull ? t('full') : t('book')}
          </Button>
        )}
      </div>
    </article>
  );
}
