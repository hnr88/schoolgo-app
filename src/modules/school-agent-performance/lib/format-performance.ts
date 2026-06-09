export function formatRate(rate: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(rate);
}

export function formatAvgDays(days: number | null, locale: string): string {
  if (days === null) return '—';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(days);
}
