'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Accommodation } from '@/modules/school-search/types/filter.types';

const LABEL_KEY_BY_ACCOMMODATION: Record<Accommodation, string> = {
  boarding: 'accommodation.boarding',
  homestay: 'accommodation.homestay',
  both: 'accommodation.both',
  none: 'accommodation.none',
};

interface AccommodationBadgeProps {
  value: Accommodation;
  className?: string;
}

export function AccommodationBadge({ value, className }: AccommodationBadgeProps) {
  const t = useTranslations('SchoolSearch.spec');
  if (value === 'none') return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill bg-emerald-100 px-2 py-0.5 text-caption font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200',
        className,
      )}
    >
      {t(LABEL_KEY_BY_ACCOMMODATION[value] as never)}
    </span>
  );
}
