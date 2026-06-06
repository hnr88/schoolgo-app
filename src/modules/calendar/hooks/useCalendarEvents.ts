'use client';

import { useMemo } from 'react';

import { aggregateCalendarEvents } from '@/modules/calendar/lib/aggregate-events';
import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import { useActiveChildStore } from '@/modules/students';
import { useMyTourBookings } from '@/modules/tours/queries/use-my-tour-bookings.query';
import { useTours } from '@/modules/tours/queries/use-tours.query';

export function useCalendarEvents() {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const bookingsQuery = useMyTourBookings();
  const toursQuery = useTours();
  const applicationsQuery = useParentApplications({
    pageSize: 100,
    student: activeChildId ?? undefined,
  });

  const events = useMemo(
    () =>
      aggregateCalendarEvents({
        bookings: bookingsQuery.data?.data ?? [],
        tours: toursQuery.data?.data ?? [],
        applications: applicationsQuery.data?.data ?? [],
      }),
    [bookingsQuery.data, toursQuery.data, applicationsQuery.data],
  );

  async function refetchAll() {
    await Promise.all([
      bookingsQuery.refetch(),
      toursQuery.refetch(),
      applicationsQuery.refetch(),
    ]);
  }

  return {
    events,
    isLoading: bookingsQuery.isLoading || toursQuery.isLoading || applicationsQuery.isLoading,
    isError: bookingsQuery.isError || toursQuery.isError || applicationsQuery.isError,
    refetchAll,
  };
}
