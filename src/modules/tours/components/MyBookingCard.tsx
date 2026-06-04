'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarDays, MapPin, School } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { formatTourDateTime, formatTourLocation } from '@/modules/tours/lib/format-tour';
import type { MyBookingCardProps } from '@/modules/tours/types/tours.types';

export function MyBookingCard({ booking, onCancel }: MyBookingCardProps) {
  const t = useTranslations('Tours');
  const format = useFormatter();

  const { tour, status } = booking;
  const dateTime = formatTourDateTime(tour?.startsAt ?? null, format.dateTime);
  const location = formatTourLocation([
    tour?.location ?? null,
    tour?.school?.suburb ?? null,
    tour?.school?.state ?? null,
  ]);
  const isCancelled = status === 'cancelled';

  return (
    <SurfaceCard
      elevation='interactive'
      padding='lg'
      className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
    >
      <div className='flex items-start gap-4'>
        <Avatar className='h-11 w-11 shrink-0 rounded-lg after:rounded-lg'>
          {tour?.school?.logoUrl ? (
            <AvatarImage src={tour.school.logoUrl} alt={tour.school.name} className='rounded-lg object-contain' />
          ) : null}
          <AvatarFallback className='rounded-lg bg-vivid-iris-soft text-vivid-iris-strong'>
            <School className='h-5 w-5' />
          </AvatarFallback>
        </Avatar>
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
      </div>

      {!isCancelled && (
        <div className='shrink-0'>
          <Button variant='outline' onClick={() => onCancel(booking)} className='w-full sm:w-auto'>
            {t('cancelBooking')}
          </Button>
        </div>
      )}
    </SurfaceCard>
  );
}
