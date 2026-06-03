'use client';

import { useMemo } from 'react';

import { aggregateCalendarEvents } from '@/modules/calendar/lib/aggregate-events';
import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import { useMyTourBookings } from '@/modules/tours/queries/use-my-tour-bookings.query';
import { useTours } from '@/modules/tours/queries/use-tours.query';

export function useCalendarEvents() {
  const bookingsQuery = useMyTourBookings();
  const toursQuery = useTours();
  // Aggregate across all of the parent's applications, not just the first page.
  const applicationsQuery = useParentApplications({ pageSize: 100 });

  const events = useMemo(
    () =>
      aggregateCalendarEvents({
        bookings: bookingsQuery.data?.data ?? [],
        tours: toursQuery.data?.data ?? [],
        applications: applicationsQuery.data?.data ?? [],
      }),
    [bookingsQuery.data, toursQuery.data, applicationsQuery.data],
  );

  return {
    events,
    isLoading: bookingsQuery.isLoading || toursQuery.isLoading || applicationsQuery.isLoading,
    isError: bookingsQuery.isError || toursQuery.isError || applicationsQuery.isError,
  };
}
