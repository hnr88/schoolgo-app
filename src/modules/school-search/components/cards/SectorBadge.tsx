'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Sector } from '@/modules/school-search/types/filter.types';

const STYLE_BY_SECTOR: Record<Sector, string> = {
  government: 'bg-sky-100 text-sky-800 ring-sky-200',
  'non-government': 'bg-violet-100 text-violet-800 ring-violet-200',
  catholic: 'bg-purple-100 text-purple-800 ring-purple-200',
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
        'inline-flex items-center rounded-pill px-2 py-0.5 text-caption font-semibold ring-1 ring-inset',
        STYLE_BY_SECTOR[sector],
        className,
      )}
    >
      {t(LABEL_KEY_BY_SECTOR[sector] as never)}
    </span>
  );
}
