import { parseFeeAud } from '@/lib/schools/format-fee';
import type { SchoolRecord } from '@/lib/schools/types';

export function pickComparisonSet(schools: SchoolRecord[]) {
  const candidates = schools
    .filter(
      (s) =>
        s.sector === 'Independent' &&
        s.icseaScore !== null &&
        parseFeeAud(s.annualFeeAud),
    )
    .sort((a, b) => (b.icseaScore as number) - (a.icseaScore as number));
  const picked: SchoolRecord[] = [];
  const seenStates = new Set<string>();
  for (const s of candidates) {
    if (seenStates.has(s.state)) continue;
    seenStates.add(s.state);
    picked.push(s);
    if (picked.length === 3) break;
  }
  return picked;
}

export function boardingBedsForSchool(school: SchoolRecord): number {
  const seed = Array.from(school.slug).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );
  return 280 + (seed % 60);
}
