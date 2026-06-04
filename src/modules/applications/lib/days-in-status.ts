import { DAYS_THRESHOLDS } from '@/modules/applications/constants/application.constants';

export type ParentDaysTone = 'grey' | 'amber' | 'red';

export function parseDaysTone(color: string | null): ParentDaysTone {
  if (color === 'red') return 'red';
  if (color === 'amber') return 'amber';
  return 'grey';
}

export function daysToneFromCount(days: number): ParentDaysTone {
  if (days >= DAYS_THRESHOLDS.DANGER) return 'red';
  if (days >= DAYS_THRESHOLDS.WARNING) return 'amber';
  return 'grey';
}

export function daysToneTextClass(tone: ParentDaysTone): string {
  if (tone === 'red') return 'text-vivid-coral-strong';
  if (tone === 'amber') return 'text-arches-700';
  return 'text-foggy';
}

export function daysToneIconClass(tone: ParentDaysTone): string {
  if (tone === 'red') return 'bg-vivid-coral-soft text-vivid-coral-strong';
  if (tone === 'amber') return 'bg-vivid-amber-soft text-arches-700';
  return 'bg-rausch-50 text-primary-strong';
}
