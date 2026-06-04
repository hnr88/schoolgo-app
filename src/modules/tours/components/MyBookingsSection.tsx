'use client';

import { useTranslations } from 'next-intl';

import { SectionHeading } from '@/modules/core';
import { MyBookingCard } from '@/modules/tours/components/MyBookingCard';
import type { MyBooking } from '@/modules/tours/types/tours.types';

export function MyBookingsSection({
  bookings,
  onCancel,
}: {
  bookings: MyBooking[];
  onCancel: (booking: MyBooking) => void;
}) {
  const t = useTranslations('Tours');

  if (bookings.length === 0) return null;

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading level={2} title={t('myBookingsTitle')} />
      <div className='flex flex-col gap-4'>
        {bookings.map((booking) => (
          <MyBookingCard key={booking.documentId} booking={booking} onCancel={onCancel} />
        ))}
      </div>
    </section>
  );
}
