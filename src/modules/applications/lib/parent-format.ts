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

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export interface OfferDeadlineCountdown {
  days: number;
  isOverdue: boolean;
  isUrgent: boolean;
}

export function getOfferDeadlineCountdown(
  deadline: string | null,
  now: Date = new Date(),
): OfferDeadlineCountdown | null {
  if (!deadline) return null;
  const target = new Date(deadline);
  if (Number.isNaN(target.getTime())) return null;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  ).getTime();
  const diffDays = Math.round((startOfTarget - startOfToday) / MS_PER_DAY);
  const isOverdue = diffDays < 0;
  return {
    days: Math.abs(diffDays),
    isOverdue,
    isUrgent: !isOverdue && diffDays < 7,
  };
}
