import { describe, expect, it } from 'vitest';
import {
  bucketExpiry,
  daysUntilExpiry,
  EXPIRING_SOON_DAYS,
} from '@/modules/parent-document-expiry/lib/bucket-expiry';
import type { DocumentExpiryItem } from '@/modules/parent-document-expiry/types/document-expiry.types';

const NOW = new Date(2026, 0, 1, 14, 30);

function item(overrides: Partial<DocumentExpiryItem>): DocumentExpiryItem {
  return {
    key: 'vault-doc',
    source: 'vault',
    title: 'Passport',
    documentType: 'passport',
    expiresAt: null,
    href: '/parent/documents',
    ownerName: null,
    ...overrides,
  };
}

describe('daysUntilExpiry', () => {
  it('counts whole calendar days ignoring time of day', () => {
    expect(daysUntilExpiry('2026-01-01T01:00:00.000Z', new Date(2026, 0, 1, 23, 59))).toBe(0);
    expect(daysUntilExpiry('2026-01-02', NOW)).toBe(1);
    expect(daysUntilExpiry('2025-12-31', NOW)).toBe(-1);
  });

  it('returns null for unparseable dates', () => {
    expect(daysUntilExpiry('not-a-date', NOW)).toBeNull();
  });
});

describe('bucketExpiry', () => {
  it('puts documents expired before today in expired and today in expiring soon', () => {
    const buckets = bucketExpiry(
      [
        item({ key: 'a', expiresAt: '2025-12-31' }),
        item({ key: 'b', expiresAt: '2026-01-01' }),
      ],
      NOW,
    );
    expect(buckets.expired.map((i) => i.key)).toEqual(['a']);
    expect(buckets.expiringSoon.map((i) => i.key)).toEqual(['b']);
    expect(buckets.expiringSoon[0]?.daysUntilExpiry).toBe(0);
  });

  it('splits exactly at the 90-day boundary', () => {
    const buckets = bucketExpiry(
      [
        item({ key: 'at-90', expiresAt: '2026-04-01' }),
        item({ key: 'at-91', expiresAt: '2026-04-02' }),
      ],
      NOW,
    );
    expect(buckets.expiringSoon.map((i) => i.key)).toEqual(['at-90']);
    expect(buckets.expiringSoon[0]?.daysUntilExpiry).toBe(EXPIRING_SOON_DAYS);
    expect(buckets.later.map((i) => i.key)).toEqual(['at-91']);
  });

  it('excludes documents without expiresAt and counts them as untracked', () => {
    const buckets = bucketExpiry(
      [
        item({ key: 'none', expiresAt: null }),
        item({ key: 'bad', expiresAt: 'garbage' }),
        item({ key: 'ok', expiresAt: '2026-02-01' }),
      ],
      NOW,
    );
    expect(buckets.untrackedCount).toBe(2);
    expect(
      [...buckets.expired, ...buckets.expiringSoon, ...buckets.later].map((i) => i.key),
    ).toEqual(['ok']);
  });

  it('sorts every bucket by urgency, soonest first', () => {
    const buckets = bucketExpiry(
      [
        item({ key: 'soon-late', expiresAt: '2026-03-01' }),
        item({ key: 'soon-early', expiresAt: '2026-01-05' }),
        item({ key: 'expired-old', expiresAt: '2025-01-01' }),
        item({ key: 'expired-recent', expiresAt: '2025-12-30' }),
      ],
      NOW,
    );
    expect(buckets.expired.map((i) => i.key)).toEqual(['expired-old', 'expired-recent']);
    expect(buckets.expiringSoon.map((i) => i.key)).toEqual(['soon-early', 'soon-late']);
  });
});
