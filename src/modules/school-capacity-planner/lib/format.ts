import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';

/** Render a 0..1 rate as a whole-number percentage string. */
export function formatRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

/** Stable scope key for grouping waitlist entries by (intake, yearLevel). */
export function waitlistScopeKey(entry: WaitlistEntry): string {
  return `${entry.intakePeriod ?? ''}__${entry.yearLevel ?? ''}`;
}

/** Group entries into ordered scopes, preserving first-seen scope order. */
export function groupWaitlistByScope(
  entries: WaitlistEntry[],
): Array<{ key: string; intakePeriod: string | null; yearLevel: string | null; entries: WaitlistEntry[] }> {
  const groups = new Map<string, WaitlistEntry[]>();
  for (const entry of entries) {
    const key = waitlistScopeKey(entry);
    const bucket = groups.get(key);
    if (bucket) bucket.push(entry);
    else groups.set(key, [entry]);
  }
  return [...groups.entries()].map(([key, scopeEntries]) => ({
    key,
    intakePeriod: scopeEntries[0]?.intakePeriod ?? null,
    yearLevel: scopeEntries[0]?.yearLevel ?? null,
    entries: scopeEntries,
  }));
}
