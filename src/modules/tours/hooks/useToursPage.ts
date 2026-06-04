'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { useTours } from '@/modules/tours/queries/use-tours.query';
import { useMyTourBookings } from '@/modules/tours/queries/use-my-tour-bookings.query';
import { useBookTour } from '@/modules/tours/queries/use-book-tour.mutation';
import { useCancelTourBooking } from '@/modules/tours/queries/use-cancel-tour-booking.mutation';
import { ACTIVE_BOOKING_STATUS } from '@/modules/tours/constants/tours.constants';
import type { MyBooking, TourListItem } from '@/modules/tours/types/tours.types';

function resolveErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.error?.message;
    if (typeof message === 'string' && message.length > 0) return message;
  }
  return fallback;
}

export function useToursPage() {
  const t = useTranslations('Tours');
  const toursQuery = useTours();
  const bookingsQuery = useMyTourBookings();
  const bookMutation = useBookTour();
  const cancelMutation = useCancelTourBooking();

  const [bookingTourId, setBookingTourId] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<MyBooking | null>(null);

  const bookings = useMemo(() => bookingsQuery.data?.data ?? [], [bookingsQuery.data]);

  const bookedTourIds = useMemo(
    () =>
      new Set(
        bookings
          .filter((booking) => booking.status === ACTIVE_BOOKING_STATUS && booking.tour)
          .map((booking) => booking.tour!.documentId),
      ),
    [bookings],
  );

  async function handleBook(tour: TourListItem) {
    setBookingTourId(tour.documentId);
    try {
      await bookMutation.mutateAsync(tour.documentId);
      toast.success(t('bookSuccess'));
    } catch (error) {
      toast.error(resolveErrorMessage(error, t('bookError')));
    } finally {
      setBookingTourId(null);
    }
  }

  async function handleCancelConfirm() {
    if (!cancelTarget) return;
    try {
      await cancelMutation.mutateAsync(cancelTarget.documentId);
      toast.success(t('cancelSuccess'));
    } catch (error) {
      toast.error(resolveErrorMessage(error, t('cancelError')));
    }
    setCancelTarget(null);
  }

  const canBook = toursQuery.isSuccess && bookingsQuery.isSuccess;

  return {
    toursQuery,
    bookingsQuery,
    bookings,
    bookedTourIds,
    bookingTourId,
    cancelTarget,
    setCancelTarget,
    handleBook,
    handleCancelConfirm,
    isCancelling: cancelMutation.isPending,
    canBook,
    isBookingsError: bookingsQuery.isError,
    refetchBookings: bookingsQuery.refetch,
  };
}
