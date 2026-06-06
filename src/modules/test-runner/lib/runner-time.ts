export function remainingSeconds(startedAt: string | null, durationMinutes: number, now: number): number {
  if (!startedAt || durationMinutes <= 0) return 0;
  const start = new Date(startedAt).getTime();
  if (Number.isNaN(start)) return 0;
  const deadline = start + durationMinutes * 60 * 1000;
  return Math.max(0, Math.round((deadline - now) / 1000));
}

export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
