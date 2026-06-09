const MS_PER_DAY = 86_400_000;

export function daysSince(iso: string, now: Date = new Date()): number {
  const elapsed = now.getTime() - new Date(iso).getTime();
  return Math.max(0, Math.floor(elapsed / MS_PER_DAY));
}

export function daysUntil(iso: string, now: Date = new Date()): number {
  const remaining = new Date(iso).getTime() - now.getTime();
  return Math.max(0, Math.ceil(remaining / MS_PER_DAY));
}
