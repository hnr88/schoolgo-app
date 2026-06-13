const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 2,
});

export function formatAud(value: number): string {
  return audFormatter.format(value);
}
