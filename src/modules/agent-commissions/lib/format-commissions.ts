export function formatAud(amount: number, currency = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRatePct(rate: number | null, locale: string): string {
  if (rate === null) return '—';
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(rate)}%`;
}

export function formatCommissionDate(value: string | null | undefined, locale: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatStudentName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
): string {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return name.length > 0 ? name : '';
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '·';
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return (first + last).toUpperCase() || '·';
}
