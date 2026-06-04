const ID_PATTERN = /^[a-z0-9]{1,32}$/i;

/**
 * Parses the `?ids=` query value into a de-duplicated, validated id list,
 * capped at `max`. Returns an empty array when the param is absent or invalid.
 */
export function parseCompareIds(
  raw: string | null | undefined,
  max: number,
): string[] {
  if (!raw) return [];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const part of raw.split(',')) {
    const id = part.trim();
    if (!id || seen.has(id) || !ID_PATTERN.test(id)) continue;
    seen.add(id);
    result.push(id);
    if (result.length >= max) break;
  }

  return result;
}
