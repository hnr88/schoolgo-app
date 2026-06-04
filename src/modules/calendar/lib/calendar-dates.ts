import { format as formatDate, isSameDay } from 'date-fns';
import type { useFormatter } from 'next-intl';

import type { CalendarEvent, CalendarEventType } from '@/modules/calendar/types/calendar.types';

type DateTimeFormatter = ReturnType<typeof useFormatter>['dateTime'];

export const EVENT_DATE_TIME_OPTIONS = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as const;

const DAY_KEY_FORMAT = 'yyyy-MM-dd';

export function toDayKey(date: Date): string {
  return formatDate(date, DAY_KEY_FORMAT);
}

export function groupEventTypesByDay(events: CalendarEvent[]): Map<string, CalendarEventType[]> {
  const byDay = new Map<string, CalendarEventType[]>();

  for (const event of events) {
    const parsed = new Date(event.date);
    if (Number.isNaN(parsed.getTime())) continue;

    const key = toDayKey(parsed);
    const types = byDay.get(key) ?? [];
    if (!types.includes(event.type)) {
      types.push(event.type);
    }
    byDay.set(key, types);
  }

  return byDay;
}

export function filterEventsByDay(events: CalendarEvent[], day: Date | undefined): CalendarEvent[] {
  if (!day) return events;
  return events.filter((event) => isSameDay(new Date(event.date), day));
}

export function formatEventDate(date: string, formatDateTime: DateTimeFormatter): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return formatDateTime(parsed, EVENT_DATE_TIME_OPTIONS);
}
