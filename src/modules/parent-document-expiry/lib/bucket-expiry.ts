import type {
  BucketedExpiryItem,
  DocumentExpiryItem,
  ExpiryBuckets,
} from '@/modules/parent-document-expiry/types/document-expiry.types';

export const EXPIRING_SOON_DAYS = 90;

const MS_PER_DAY = 86_400_000;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function daysUntilExpiry(expiresAt: string, now: Date): number | null {
  const parsed = new Date(expiresAt);
  if (Number.isNaN(parsed.getTime())) return null;
  return Math.round((startOfDay(parsed) - startOfDay(now)) / MS_PER_DAY);
}

export function bucketExpiry(items: readonly DocumentExpiryItem[], now: Date): ExpiryBuckets {
  const expired: BucketedExpiryItem[] = [];
  const expiringSoon: BucketedExpiryItem[] = [];
  const later: BucketedExpiryItem[] = [];
  let untrackedCount = 0;

  for (const item of items) {
    const { expiresAt } = item;
    const days = expiresAt === null ? null : daysUntilExpiry(expiresAt, now);

    if (expiresAt === null || days === null) {
      untrackedCount += 1;
      continue;
    }

    const bucketed: BucketedExpiryItem = { ...item, expiresAt, daysUntilExpiry: days };

    if (days < 0) {
      expired.push(bucketed);
    } else if (days <= EXPIRING_SOON_DAYS) {
      expiringSoon.push(bucketed);
    } else {
      later.push(bucketed);
    }
  }

  const byUrgency = (a: BucketedExpiryItem, b: BucketedExpiryItem) =>
    a.daysUntilExpiry - b.daysUntilExpiry;

  expired.sort(byUrgency);
  expiringSoon.sort(byUrgency);
  later.sort(byUrgency);

  return { expired, expiringSoon, later, untrackedCount };
}
