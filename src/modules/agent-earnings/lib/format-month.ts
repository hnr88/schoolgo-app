export function formatMonthLabel(month: string, locale: string): string {
  const [year, monthPart] = month.split('-').map(Number);
  if (!year || !monthPart) return month;
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, monthPart - 1, 1)));
}
