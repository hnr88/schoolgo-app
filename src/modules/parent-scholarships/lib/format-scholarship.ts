const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** Render the scholarship award as an AUD amount, a percentage, or null when neither is set. */
export function formatAward(amountAud: number | null, amountPct: number | null): string | null {
  if (amountAud != null && amountAud > 0) return audFormatter.format(amountAud);
  if (amountPct != null && amountPct > 0) return `${amountPct}%`;
  return null;
}

export function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  const parsed = new Date(deadline);
  if (Number.isNaN(parsed.getTime())) return null;
  return dateFormatter.format(parsed);
}

/** The matcher joins per-axis reasons with "; " — split them back into a list for display. */
export function splitReasons(reason: string): string[] {
  return reason
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}
