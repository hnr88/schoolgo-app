export function parseFeeAud(raw: string): number | null {
  if (!raw) return null;
  const digits = raw.replace(/[^0-9.]/g, '');
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

export function formatFeeAud(amount: number | null, compact = false): string | null {
  if (amount === null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: compact ? 'compact' : 'standard',
  }).format(amount);
}
