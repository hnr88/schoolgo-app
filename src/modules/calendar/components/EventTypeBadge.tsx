'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { EVENT_STYLE } from '@/modules/calendar/constants/calendar.constants';
import type { EventTypeBadgeProps } from '@/modules/calendar/types/calendar.types';

export function EventTypeBadge({ type }: EventTypeBadgeProps) {
  const t = useTranslations('Calendar');
  const style = EVENT_STYLE[type];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium',
        style.badge,
      )}
    >
      <Icon className='h-3.5 w-3.5' />
      {t(style.labelKey)}
    </span>
  );
}
