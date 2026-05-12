const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
  notation: 'compact',
});

const fullCurrencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

export function formatAudCompact(value: number): string {
  return currencyFormatter.format(value);
}

export function formatAud(value: number): string {
  return fullCurrencyFormatter.format(value);
}
