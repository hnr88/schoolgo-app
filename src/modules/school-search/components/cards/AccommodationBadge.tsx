'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Accommodation } from '@/modules/school-search/types/filter.types';

const LABEL_KEY_BY_ACCOMMODATION: Record<Accommodation, string> = {
  boarding: 'boarding',
  homestay: 'homestay',
  both: 'both',
  none: 'none',
};

interface AccommodationBadgeProps {
  value: Accommodation;
  className?: string;
}

export function AccommodationBadge({ value, className }: AccommodationBadgeProps) {
  const t = useTranslations('SchoolSearch.spec.tile.accommodation');
  if (value === 'none') return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill bg-stone-100 px-1 py-0 text-xs font-medium text-stone-700',
        className,
      )}
    >
      {t(LABEL_KEY_BY_ACCOMMODATION[value] as never)}
    </span>
  );
}
