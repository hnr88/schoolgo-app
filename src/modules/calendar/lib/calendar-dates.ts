import { isSameDay } from 'date-fns';

import type { CalendarEvent } from '@/modules/calendar/types/calendar.types';

export function getEventDates(events: CalendarEvent[]): Date[] {
  return events.map((event) => new Date(event.date));
}

export function filterEventsByDay(events: CalendarEvent[], day: Date | undefined): CalendarEvent[] {
  if (!day) return events;
  return events.filter((event) => isSameDay(new Date(event.date), day));
}

export function formatEventDate(date: string, locale = 'en'): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
