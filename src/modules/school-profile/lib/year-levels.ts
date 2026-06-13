export function yearLevelsToInput(value: string[] | null | undefined): string {
  if (!value || value.length === 0) return '';
  return value.join(', ');
}

export function inputToYearLevels(raw: string): string[] | null {
  const parts = raw
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return parts.length === 0 ? null : parts;
}
