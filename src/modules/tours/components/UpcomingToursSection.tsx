'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';

import { EmptyState, SectionHeading } from '@/modules/core';
import { TourCard } from '@/modules/tours/components/TourCard';
import type { TourListItem } from '@/modules/tours/types/tours.types';

export function UpcomingToursSection({
  tours,
  bookedTourIds,
  bookingTourId,
  onBook,
  canBook,
}: {
  tours: TourListItem[];
  bookedTourIds: Set<string>;
  bookingTourId: string | null;
  onBook: (tour: TourListItem) => void;
  canBook: boolean;
}) {
  const t = useTranslations('Tours');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading level={2} title={t('upcomingTitle')} />
      {tours.length === 0 ? (
        <EmptyState framed icon={CalendarDays} title={t('emptyTitle')} description={t('emptySubtitle')} />
      ) : (
        <div className='flex flex-col gap-4'>
          {tours.map((tour) => (
            <TourCard
              key={tour.documentId}
              tour={tour}
              isBooked={bookedTourIds.has(tour.documentId)}
              isBooking={bookingTourId === tour.documentId}
              onBook={onBook}
              canBook={canBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}
