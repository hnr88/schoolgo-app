import type { SchoolRecord } from '@/lib/schools';

/**
 * Deterministically pick a diverse set of featured schools from the loaded list.
 * Spreads selections across different states and sectors for visual variety.
 */
export function getFeaturedSchoolsForAgents(
  schools: SchoolRecord[],
  count: number,
): SchoolRecord[] {
  if (schools.length === 0) return [];

  // Pick one school per state, preferring Independent > Catholic > Government
  const seenStates = new Set<string>();
  const featured: SchoolRecord[] = [];

  const sectorScore = (sector: string) => {
    if (sector === 'Independent') return 3;
    if (sector === 'Catholic') return 2;
    return 1;
  };

  // Sort by state then sector score descending
  const sorted = [...schools].sort((a, b) => {
    if (a.state !== b.state) return a.state.localeCompare(b.state);
    return sectorScore(b.sector) - sectorScore(a.sector);
  });

  for (const school of sorted) {
    if (featured.length >= count) break;
    if (!seenStates.has(school.state)) {
      seenStates.add(school.state);
      featured.push(school);
    }
  }

  // If we still need more, fill from the start of the original list
  let i = 0;
  while (featured.length < count && i < schools.length) {
    const s = schools[i];
    if (!featured.includes(s)) {
      featured.push(s);
    }
    i++;
  }

  return featured.slice(0, count);
}

/**
 * Generate a consistent hue index for a given string (e.g. school name).
 */
export function hueFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

/**
 * Extract initials from a school name (up to 2 characters).
 */
export function initialsFromName(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'S';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
