import type {
  ForecastItem,
  SchoolOption,
} from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

const EM_DASH = '—';

export function formatProjectedDate(iso: string | null, locale: string): string {
  if (!iso) return EM_DASH;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return EM_DASH;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(ms);
}

export function formatStudentName(item: ForecastItem, fallback: string): string {
  const first = item.student?.firstName ?? '';
  const last = item.student?.lastName ?? '';
  const full = `${first} ${last}`.trim();
  return full.length > 0 ? full : fallback;
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '·';
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return (first + last).toUpperCase() || '·';
}

export function formatDays(days: number | null, locale: string): string {
  if (days === null) return EM_DASH;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(days);
}

export function formatSampleCount(count: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(count);
}

/** Distinct schools across the forecast, sorted by name, for the stage-stats picker. */
export function deriveSchoolOptions(items: ForecastItem[]): SchoolOption[] {
  const map = new Map<string, SchoolOption>();
  for (const item of items) {
    if (item.school && !map.has(item.school.documentId)) {
      map.set(item.school.documentId, {
        documentId: item.school.documentId,
        name: item.school.name,
      });
    }
  }
  return [...map.values()].sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? ''),
  );
}

export function filterAtRisk(items: ForecastItem[]): ForecastItem[] {
  return items.filter((item) => item.risk === 'overdue' || item.risk === 'watch');
}
