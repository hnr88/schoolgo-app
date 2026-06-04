'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  School,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import { formatTourDateTime, formatTourLocation } from '@/modules/tours/lib/format-tour';
import type { TourCardProps } from '@/modules/tours/types/tours.types';

export function TourCard({ tour, isBooked, onBook, isBooking, canBook }: TourCardProps) {
  const t = useTranslations('Tours');
  const format = useFormatter();
  const [showDetails, setShowDetails] = useState(false);

  const dateTime = formatTourDateTime(tour.startsAt, format.dateTime);
  const location = formatTourLocation([tour.location, tour.school?.suburb ?? null, tour.school?.state ?? null]);
  const description = tour.description?.trim() ?? '';
  const hasDescription = description.length > 0;
  const detailsId = `tour-details-${tour.documentId}`;

  return (
    <SurfaceCard elevation='interactive' padding='lg' className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-start gap-4'>
          <Avatar className='h-11 w-11 shrink-0 rounded-lg after:rounded-lg'>
            {tour.school?.logoUrl ? (
              <AvatarImage src={tour.school.logoUrl} alt={tour.school.name} className='rounded-lg object-contain' />
            ) : null}
            <AvatarFallback className='rounded-lg bg-vivid-iris-soft text-vivid-iris-strong'>
              <School className='h-5 w-5' />
            </AvatarFallback>
          </Avatar>
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
                {tour.isFull ? t('full') : t('spotsRemaining', { count: tour.remainingSpots })}
              </span>
            </div>
            {hasDescription && (
              <button
                type='button'
                onClick={() => setShowDetails((prev) => !prev)}
                aria-expanded={showDetails}
                aria-controls={detailsId}
                className='inline-flex w-fit items-center gap-1 rounded-md py-1 text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                {showDetails ? t('hideDetails') : t('showDetails')}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-200 ease-out-quart', showDetails && 'rotate-180')}
                />
              </button>
            )}
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
              disabled={tour.isFull || isBooking || !canBook}
              className='w-full sm:w-auto'
            >
              {isBooking && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {tour.isFull ? t('full') : t('book')}
            </Button>
          )}
        </div>
      </div>

      {hasDescription && showDetails && (
        <div id={detailsId} className='flex flex-col gap-1.5 border-t border-border pt-4'>
          <p className='text-xs font-medium tracking-wide text-foggy uppercase'>{t('descriptionTitle')}</p>
          <p className='text-sm whitespace-pre-line text-foreground'>{description}</p>
        </div>
      )}
    </SurfaceCard>
  );
}
