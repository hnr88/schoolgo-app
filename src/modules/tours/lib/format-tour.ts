import type { useFormatter } from 'next-intl';

type DateTimeFormatter = ReturnType<typeof useFormatter>['dateTime'];

export const TOUR_DATE_TIME_OPTIONS = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as const;

export function parseTourDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatTourDateTime(
  dateStr: string | null,
  formatDateTime: DateTimeFormatter,
): string | null {
  const date = parseTourDate(dateStr);
  if (!date) return null;
  return formatDateTime(date, TOUR_DATE_TIME_OPTIONS);
}

export function formatTourLocation(parts: Array<string | null>): string | null {
  const cleaned = parts.filter((part): part is string => Boolean(part && part.trim()));
  return cleaned.length > 0 ? cleaned.join(', ') : null;
}
