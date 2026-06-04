'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getOfferDeadlineCountdown } from '@/modules/applications/lib/parent-format';

export function OfferDeadlineChip({ deadline }: { deadline: string | null }) {
  const t = useTranslations('ParentApplications');
  const countdown = getOfferDeadlineCountdown(deadline);

  if (!countdown) return null;

  const { days, isOverdue, isUrgent } = countdown;
  const isAlert = isOverdue || isUrgent;
  const Icon = isOverdue ? AlertTriangle : CalendarClock;
  const label = isOverdue
    ? t('offerDeadlineOverdue', { days })
    : t('offerDeadlineCountdown', { days });

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold',
        isOverdue && 'bg-vivid-coral-soft text-vivid-coral-strong',
        !isOverdue && isUrgent && 'bg-vivid-amber-soft text-arches-700',
        !isAlert && 'bg-muted text-foggy',
      )}
      role={isAlert ? 'status' : undefined}
    >
      <Icon className='h-3.5 w-3.5' aria-hidden='true' />
      {label}
    </span>
  );
}
