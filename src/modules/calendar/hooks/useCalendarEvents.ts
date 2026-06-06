'use client';

import { useMemo } from 'react';

import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import { aggregateCalendarEvents } from '@/modules/calendar/lib/aggregate-events';
import { useReminders } from '@/modules/calendar/queries/use-reminders.query';

export function useCalendarEvents() {
  // Aggregate across all of the parent's applications, not just the first page.
  const applicationsQuery = useParentApplications({ pageSize: 100 });
  const remindersQuery = useReminders();

  const events = useMemo(
    () =>
      aggregateCalendarEvents({
        applications: applicationsQuery.data?.data ?? [],
        reminders: remindersQuery.data ?? [],
      }),
    [applicationsQuery.data, remindersQuery.data],
  );

  async function refetchAll() {
    await Promise.all([applicationsQuery.refetch(), remindersQuery.refetch()]);
  }

  return {
    events,
    isLoading: applicationsQuery.isLoading,
    isError: applicationsQuery.isError,
    refetchAll,
  };
}
