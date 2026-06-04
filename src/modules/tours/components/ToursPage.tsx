'use client';

import { useTranslations } from 'next-intl';

import { ErrorState } from '@/modules/core';
import { CancelBookingDialog } from '@/modules/tours/components/CancelBookingDialog';
import { MyBookingsSection } from '@/modules/tours/components/MyBookingsSection';
import { ToursSkeleton } from '@/modules/tours/components/ToursSkeleton';
import { UpcomingToursSection } from '@/modules/tours/components/UpcomingToursSection';
import { useToursPage } from '@/modules/tours/hooks/useToursPage';

export function ToursPage() {
  const t = useTranslations('Tours');
  const {
    toursQuery,
    bookings,
    bookedTourIds,
    bookingTourId,
    cancelTarget,
    setCancelTarget,
    handleBook,
    handleCancelConfirm,
    isCancelling,
    canBook,
    isBookingsError,
    refetchBookings,
  } = useToursPage();

  if (toursQuery.isLoading) {
    return <ToursSkeleton />;
  }

  if (toursQuery.isError) {
    return (
      <ErrorState
        framed
        message={t('errorMessage')}
        onRetry={() => toursQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const tours = toursQuery.data?.data ?? [];

  return (
    <div className='flex flex-col gap-8'>
      {isBookingsError ? (
        <ErrorState
          framed
          message={t('bookingsErrorMessage')}
          onRetry={() => refetchBookings()}
          retryLabel={t('retry')}
        />
      ) : (
        <MyBookingsSection bookings={bookings} onCancel={setCancelTarget} />
      )}
      <UpcomingToursSection
        tours={tours}
        bookedTourIds={bookedTourIds}
        bookingTourId={bookingTourId}
        onBook={handleBook}
        canBook={canBook}
      />

      <CancelBookingDialog
        booking={cancelTarget}
        onOpenChange={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
        isPending={isCancelling}
      />
    </div>
  );
}
