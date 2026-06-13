'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Sector } from '@/modules/school-search/types/filter.types';

const STYLE_BY_SECTOR: Record<Sector, string> = {
  government: 'bg-sky-100 text-sky-800',
  'non-government': 'bg-violet-100 text-violet-800',
  catholic: 'bg-purple-100 text-purple-800',
};

const LABEL_KEY_BY_SECTOR: Record<Sector, string> = {
  government: 'government',
  'non-government': 'nonGovernment',
  catholic: 'catholic',
};

interface SectorBadgeProps {
  sector: Sector;
  className?: string;
}

export function SectorBadge({ sector, className }: SectorBadgeProps) {
  const t = useTranslations('SchoolSearch.spec.tile.sector');
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-pill px-2.5 text-xs font-semibold',
        STYLE_BY_SECTOR[sector],
        className,
      )}
    >
      {t(LABEL_KEY_BY_SECTOR[sector] as never)}
    </span>
  );
}
