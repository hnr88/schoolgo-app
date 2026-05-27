export function formatOfferFee(amount: number | null, locale = 'en'): string | null {
  if (amount == null) return null;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string | null, locale = 'en'): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}
