export interface SubScoreEntry {
  label: string;
  value: string;
}

function formatLabel(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
  if (!spaced) return key;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatValue(value: unknown): string | null {
  if (typeof value === 'string') return value.trim() === '' ? null : value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (typeof value === 'boolean') return String(value);
  return null;
}

export function toSubScoreEntries(subScores: unknown): SubScoreEntry[] {
  if (subScores == null || typeof subScores !== 'object' || Array.isArray(subScores)) {
    return [];
  }

  const entries: SubScoreEntry[] = [];
  for (const [key, raw] of Object.entries(subScores as Record<string, unknown>)) {
    const value = formatValue(raw);
    if (value === null) continue;
    entries.push({ label: formatLabel(key), value });
  }
  return entries;
}

export function parseTestDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}
