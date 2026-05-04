const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
  notation: 'compact',
});

export function formatAudCompact(value: number): string {
  return currencyFormatter.format(value);
}
