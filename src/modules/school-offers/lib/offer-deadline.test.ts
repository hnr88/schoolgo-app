import { describe, expect, it } from 'vitest';
import type { SchoolApplicationListItem } from '@/modules/school-applications';
import {
  daysUntilDeadline,
  formatDeadline,
  offerDeadlineBucket,
  sortOffersByDeadline,
} from '@/modules/school-offers/lib/offer-deadline';

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 5, 9, 12, 0, 0);

function iso(offsetMs: number): string {
  return new Date(NOW + offsetMs).toISOString();
}

function makeOffer(documentId: string, offerDeadline: string | null): SchoolApplicationListItem {
  return {
    documentId,
    status: 'offer_made',
    targetYearLevel: 'Year 9',
    targetIntake: '2027-T1',
    boardingRequired: false,
    submittedAt: iso(-30 * DAY),
    daysInStatus: 5,
    offerDeadline,
    student: { documentId: `s-${documentId}`, name: 'Test Student', nationality: 'VN' },
    agent: null,
  };
}

describe('daysUntilDeadline', () => {
  it('returns null for a missing deadline', () => {
    expect(daysUntilDeadline(null, NOW)).toBeNull();
  });

  it('returns null for an unparseable deadline', () => {
    expect(daysUntilDeadline('not-a-date', NOW)).toBeNull();
  });

  it('returns 0 for a deadline at exactly now', () => {
    expect(daysUntilDeadline(iso(0), NOW)).toBe(0);
  });

  it('rounds a partial day up to the next whole day', () => {
    expect(daysUntilDeadline(iso(3 * DAY + 1), NOW)).toBe(4);
  });

  it('returns negative days for a deadline a full day in the past', () => {
    expect(daysUntilDeadline(iso(-DAY), NOW)).toBe(-1);
  });
});

describe('offerDeadlineBucket', () => {
  it('treats a missing deadline as ok', () => {
    expect(offerDeadlineBucket(null, NOW)).toBe('ok');
  });

  it('marks a deadline a full day in the past as expired', () => {
    expect(offerDeadlineBucket(iso(-DAY), NOW)).toBe('expired');
  });

  it('keeps a deadline passed earlier the same day as urgent (due today)', () => {
    expect(offerDeadlineBucket(iso(-1), NOW)).toBe('urgent');
  });

  it('marks a deadline at exactly now as urgent', () => {
    expect(offerDeadlineBucket(iso(0), NOW)).toBe('urgent');
  });

  it('marks exactly 3 days out as urgent (upper boundary)', () => {
    expect(offerDeadlineBucket(iso(3 * DAY), NOW)).toBe('urgent');
  });

  it('marks just over 3 days out as soon', () => {
    expect(offerDeadlineBucket(iso(3 * DAY + 1), NOW)).toBe('soon');
  });

  it('marks exactly 7 days out as soon (upper boundary)', () => {
    expect(offerDeadlineBucket(iso(7 * DAY), NOW)).toBe('soon');
  });

  it('marks just over 7 days out as ok', () => {
    expect(offerDeadlineBucket(iso(7 * DAY + 1), NOW)).toBe('ok');
  });
});

describe('sortOffersByDeadline', () => {
  it('sorts soonest deadline first with missing deadlines last', () => {
    const sorted = sortOffersByDeadline([
      makeOffer('week', iso(7 * DAY)),
      makeOffer('none', null),
      makeOffer('tomorrow', iso(DAY)),
      makeOffer('expired', iso(-DAY)),
    ]);
    expect(sorted.map((o) => o.documentId)).toEqual(['expired', 'tomorrow', 'week', 'none']);
  });

  it('does not mutate the input array', () => {
    const input = [makeOffer('b', iso(2 * DAY)), makeOffer('a', iso(DAY))];
    sortOffersByDeadline(input);
    expect(input.map((o) => o.documentId)).toEqual(['b', 'a']);
  });
});

describe('formatDeadline', () => {
  it('falls back to a dash for missing or invalid values', () => {
    expect(formatDeadline(null)).toBe('—');
    expect(formatDeadline('not-a-date')).toBe('—');
  });
});
