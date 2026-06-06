import { format as formatDate, isSameDay } from 'date-fns';
import type { useFormatter } from 'next-intl';

import type { CalendarEvent } from '@/modules/calendar/types/calendar.types';

type DateTimeFormatter = ReturnType<typeof useFormatter>['dateTime'];

export const EVENT_TIME_OPTIONS = {
  hour: 'numeric',
  minute: '2-digit',
} as const;

const DAY_KEY_FORMAT = 'yyyy-MM-dd';

export function toDayKey(date: Date): string {
  return formatDate(date, DAY_KEY_FORMAT);
}

export function groupEventsByDay(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const byDay = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const parsed = new Date(event.date);
    if (Number.isNaN(parsed.getTime())) continue;

    const key = toDayKey(parsed);
    const list = byDay.get(key) ?? [];
    list.push(event);
    byDay.set(key, list);
  }

  return byDay;
}

export function filterEventsByDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  return events.filter((event) => isSameDay(new Date(event.date), day));
}

export function formatEventTime(date: string, formatDateTime: DateTimeFormatter): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return formatDateTime(parsed, EVENT_TIME_OPTIONS);
}
