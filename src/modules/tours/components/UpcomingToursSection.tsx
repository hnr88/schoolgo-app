'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';

import { EmptyState } from '@/modules/core';
import { TourCard } from '@/modules/tours/components/TourCard';
import type { TourListItem } from '@/modules/tours/types/tours.types';

export function UpcomingToursSection({
  tours,
  bookedTourIds,
  bookingTourId,
  onBook,
}: {
  tours: TourListItem[];
  bookedTourIds: Set<string>;
  bookingTourId: string | null;
  onBook: (tour: TourListItem) => void;
}) {
  const t = useTranslations('Tours');

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-ink-900'>{t('upcomingTitle')}</h2>
      {tours.length === 0 ? (
        <EmptyState icon={CalendarDays} title={t('emptyTitle')} description={t('emptySubtitle')} />
      ) : (
        <div className='flex flex-col gap-4'>
          {tours.map((tour) => (
            <TourCard
              key={tour.documentId}
              tour={tour}
              isBooked={bookedTourIds.has(tour.documentId)}
              isBooking={bookingTourId === tour.documentId}
              onBook={onBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}
