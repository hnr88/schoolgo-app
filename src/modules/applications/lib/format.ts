import { DAYS_THRESHOLDS } from '@/modules/applications/constants/application.constants';
import type { Application } from '@/modules/applications/types/application.types';

export function formatFileSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const MS_PER_DAY = 86400000;

function calculateDaysSince(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return 0;
  const diffMs = Date.now() - date.getTime();
  return Math.max(0, Math.floor(diffMs / MS_PER_DAY));
}

export function withApplicationComputedFields(application: Application): Application {
  return {
    ...application,
    daysInStatus: application.daysInStatus ?? calculateDaysSince(application.statusChangedAt ?? application.createdAt),
  };
}

export function formatDaysClass(days: number): string {
  if (days >= DAYS_THRESHOLDS.DANGER) return 'text-rausch-600';
  if (days >= DAYS_THRESHOLDS.WARNING) return 'text-arches-700';
  return 'text-foggy';
}

export function formatSubmittedDate(
  dateStr: string | undefined,
  t: (key: string, params?: Record<string, number>) => string,
  locale = 'en',
): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / MS_PER_DAY);
  if (diffDays < 1) return t('today');
  if (diffDays < 7) return t('daysAgo', { count: diffDays });
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}
