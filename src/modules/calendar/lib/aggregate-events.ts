import type { CalendarEvent } from '@/modules/calendar/types/calendar.types';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';
import type { MyBooking, TourListItem } from '@/modules/tours/types/tours.types';

function isValidDate(value: string | null | undefined): value is string {
  if (!value) return false;
  return !Number.isNaN(new Date(value).getTime());
}

export function mapBookingEvents(bookings: MyBooking[]): CalendarEvent[] {
  return bookings
    .filter((booking) => booking.status === 'booked' && isValidDate(booking.tour?.startsAt))
    .map((booking) => ({
      id: `tour-booking-${booking.documentId}`,
      date: booking.tour!.startsAt,
      type: 'tour_booking' as const,
      title: booking.tour!.title,
      href: '/parent/tours',
      school: booking.tour!.school?.name ?? undefined,
    }));
}

export function mapOpenDayEvents(tours: TourListItem[]): CalendarEvent[] {
  return tours
    .filter((tour) => isValidDate(tour.startsAt))
    .map((tour) => ({
      id: `open-day-${tour.documentId}`,
      date: tour.startsAt,
      type: 'open_day' as const,
      title: tour.title,
      href: '/parent/tours',
      school: tour.school?.name ?? undefined,
    }));
}

export function mapApplicationEvents(applications: ParentApplication[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const application of applications) {
    const title = `${application.student.firstName} ${application.student.lastName}`;
    const href = `/parent/applications/${application.documentId}`;

    if (isValidDate(application.submittedAt)) {
      events.push({
        id: `application-submitted-${application.documentId}`,
        date: application.submittedAt,
        type: 'application_submitted',
        title,
        href,
        school: application.school.name,
      });
    }

    if (isValidDate(application.statusChangedAt)) {
      events.push({
        id: `application-status-${application.documentId}`,
        date: application.statusChangedAt,
        type: 'application_status',
        title,
        href,
        school: application.school.name,
      });
    }

    if (application.status === 'offer_made' && isValidDate(application.offerDeadline)) {
      events.push({
        id: `offer-deadline-${application.documentId}`,
        date: application.offerDeadline,
        type: 'deadline',
        title,
        href,
        school: application.school.name,
      });
    }
  }

  return events;
}

export function aggregateCalendarEvents(input: {
  bookings: MyBooking[];
  tours: TourListItem[];
  applications: ParentApplication[];
}): CalendarEvent[] {
  return [
    ...mapBookingEvents(input.bookings),
    ...mapOpenDayEvents(input.tours),
    ...mapApplicationEvents(input.applications),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
