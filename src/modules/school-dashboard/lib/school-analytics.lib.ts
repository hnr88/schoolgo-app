import { INTAKE_YEAR_SPAN } from '@/modules/school-dashboard/constants/school-analytics.constants';

export function buildIntakeYearOptions(currentYear: number): number[] {
  return Array.from({ length: INTAKE_YEAR_SPAN }, (_, index) => currentYear + 1 - index);
}

export function formatRate(rate: number): string {
  const clamped = Math.min(Math.max(rate, 0), 1);
  return `${Math.round(clamped * 100)}%`;
}

export function ratePercent(rate: number): number {
  return Math.min(Math.max(Math.round(rate * 100), 0), 100);
}

export function barWidth(count: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(Math.max(Math.round((count / max) * 100), 0), 100);
}
