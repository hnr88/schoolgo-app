import type { CalendarEvent } from '@/modules/calendar/types/calendar.types';
import type { Reminder } from '@/modules/calendar/types/reminder.types';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

function isValidDate(value: string | null | undefined): value is string {
  if (!value) return false;
  return !Number.isNaN(new Date(value).getTime());
}

export function mapApplicationEvents(applications: ParentApplication[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const application of applications) {
    const title = `${application.student.firstName} ${application.student.lastName}`;
    const href = `/parent/applications/${application.documentId}`;
    const school = application.school.name;

    if (isValidDate(application.submittedAt)) {
      events.push({
        id: `application-submitted-${application.documentId}`,
        date: application.submittedAt,
        type: 'application_submitted',
        title,
        href,
        school,
      });
    }

    if (isValidDate(application.statusChangedAt)) {
      events.push({
        id: `application-status-${application.documentId}`,
        date: application.statusChangedAt,
        type: 'application_status',
        title,
        href,
        school,
      });
    }

    if (isValidDate(application.offerDeadline)) {
      events.push({
        id: `offer-deadline-${application.documentId}`,
        date: application.offerDeadline,
        type: 'offer_deadline',
        title,
        href,
        school,
      });
    }
  }

  return events;
}

export function mapReminderEvents(reminders: Reminder[]): CalendarEvent[] {
  return reminders
    .filter((reminder) => isValidDate(reminder.remindAt))
    .map((reminder) => ({
      id: `reminder-${reminder.documentId}`,
      date: reminder.remindAt,
      type: 'reminder' as const,
      title: reminder.title,
      note: reminder.note,
      reminderId: reminder.documentId,
    }));
}

export function aggregateCalendarEvents(input: {
  applications: ParentApplication[];
  reminders: Reminder[];
}): CalendarEvent[] {
  return [
    ...mapApplicationEvents(input.applications),
    ...mapReminderEvents(input.reminders),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
