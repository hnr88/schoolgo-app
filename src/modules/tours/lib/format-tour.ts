export function formatTourDateTime(dateStr: string | null, locale = 'en'): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatTourLocation(parts: Array<string | null>): string | null {
  const cleaned = parts.filter((part): part is string => Boolean(part && part.trim()));
  return cleaned.length > 0 ? cleaned.join(', ') : null;
}
