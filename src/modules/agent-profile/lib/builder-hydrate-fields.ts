/**
 * Field pickers for hydrating the read-side `public-preview` projection (loose
 * `Record<string, unknown>` items) into the builder's typed editor item shapes.
 * The projection returns `null` for empties and populated media objects; the
 * editors want `''` / `0` / `null` media (the media `id` is not round-tripped,
 * so media fields reset and the agent re-uploads to change them).
 */

export function asRecord(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
}

export function pickStr(rec: Record<string, unknown>, key: string): string {
  const value = rec[key];
  return typeof value === 'string' ? value : '';
}

export function pickNum(rec: Record<string, unknown>, key: string): number {
  const value = rec[key];
  return typeof value === 'number' ? value : 0;
}

export function pickNumOrNull(rec: Record<string, unknown>, key: string): number | null {
  const value = rec[key];
  return typeof value === 'number' ? value : null;
}

export function pickBool(rec: Record<string, unknown>, key: string): boolean {
  return rec[key] === true;
}

/** Read-side enums come back as strings; coerce to the editor's `T | ''` union. */
export function pickEnum<T extends string>(rec: Record<string, unknown>, key: string): T | '' {
  const value = rec[key];
  return typeof value === 'string' ? (value as T) : '';
}

/** Like `pickEnum` but falling back to a fixed default for non-nullable enums. */
export function pickEnumOr<T extends string>(
  rec: Record<string, unknown>,
  key: string,
  fallback: T,
): T {
  const value = rec[key];
  return typeof value === 'string' && value ? (value as T) : fallback;
}

/** Comma-joins a string[] (read) into the editor's single comma-separated input. */
export function pickList(rec: Record<string, unknown>, key: string): string {
  const value = rec[key];
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string').join(', ');
  return typeof value === 'string' ? value : '';
}

/** Number-typed read field that the editor keeps as a string number input. */
export function pickNumStr(rec: Record<string, unknown>, key: string): string {
  const value = rec[key];
  return typeof value === 'number' ? String(value) : '';
}

/** Maps a read-side projection array into typed editor items, re-stamping order. */
export function hydrateArray<T>(raw: unknown, map: (rec: Record<string, unknown>, index: number) => T): T[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, index) => map(asRecord(item), index));
}
