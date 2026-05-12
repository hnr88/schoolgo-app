'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Sector } from '@/modules/school-search/types/filter.types';

const STYLE_BY_SECTOR: Record<Sector, string> = {
  gov: 'bg-blue-100 text-blue-800 ring-blue-200',
  non_gov: 'bg-purple-100 text-purple-800 ring-purple-200',
  catholic: 'bg-purple-100 text-purple-800 ring-purple-200',
};

const LABEL_KEY_BY_SECTOR: Record<Sector, string> = {
  gov: 'sector.government',
  non_gov: 'sector.nonGovernment',
  catholic: 'sector.catholic',
};

interface SectorBadgeProps {
  sector: Sector;
  className?: string;
}

export function SectorBadge({ sector, className }: SectorBadgeProps) {
  const t = useTranslations('SchoolSearch.spec');
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
