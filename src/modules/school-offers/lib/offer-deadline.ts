import type { SchoolApplicationListItem } from '@/modules/school-applications';
import type { OfferDeadlineBucket } from '@/modules/school-offers/types/school-offers.types';

const MS_PER_DAY = 86_400_000;

function deadlineTime(offerDeadline: string | null): number | null {
  if (!offerDeadline) return null;
  const time = new Date(offerDeadline).getTime();
  return Number.isNaN(time) ? null : time;
}

export function daysUntilDeadline(offerDeadline: string | null, now: number): number | null {
  const time = deadlineTime(offerDeadline);
  if (time === null) return null;
  return Math.ceil((time - now) / MS_PER_DAY);
}

export function offerDeadlineBucket(
  offerDeadline: string | null,
  now: number,
): OfferDeadlineBucket {
  const days = daysUntilDeadline(offerDeadline, now);
  if (days === null) return 'ok';
  if (days < 0) return 'expired';
  if (days <= 3) return 'urgent';
  if (days <= 7) return 'soon';
  return 'ok';
}

export function sortOffersByDeadline(
  offers: SchoolApplicationListItem[],
): SchoolApplicationListItem[] {
  return [...offers].sort((a, b) => {
    const aTime = deadlineTime(a.offerDeadline);
    const bTime = deadlineTime(b.offerDeadline);
    if (aTime === null && bTime === null) return 0;
    if (aTime === null) return 1;
    if (bTime === null) return -1;
    return aTime - bTime;
  });
}

export function formatDeadline(offerDeadline: string | null): string {
  const time = deadlineTime(offerDeadline);
  if (time === null) return '—';
  return new Date(time).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
