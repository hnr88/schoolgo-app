import type { OfferDeadlineUrgency } from '@/modules/agent-offers/types/agent-offers.types';

const MS_PER_DAY = 86_400_000;

export function daysUntilDeadline(deadline: string | null, now: number = Date.now()): number | null {
  if (!deadline) return null;
  const target = new Date(deadline).getTime();
  if (Number.isNaN(target)) return null;
  return Math.ceil((target - now) / MS_PER_DAY);
}

export function offerDeadlineUrgency(deadline: string | null, now: number = Date.now()): OfferDeadlineUrgency {
  const days = daysUntilDeadline(deadline, now);
  if (days == null) return 'normal';
  if (days < 0) return 'expired';
  if (days <= 3) return 'urgent';
  if (days <= 7) return 'soon';
  return 'normal';
}

export const OFFER_URGENCY_BADGE: Record<OfferDeadlineUrgency, string> = {
  urgent: 'bg-vivid-coral-soft text-vivid-coral',
  soon: 'bg-vivid-amber-soft text-vivid-amber',
  normal: 'bg-muted text-foggy',
  expired: 'bg-vivid-coral-soft text-vivid-coral',
};
