'use client';

import { useTranslations } from 'next-intl';
import { StatTile } from '@/modules/core';
import { useParentStatCounts } from '@/modules/dashboard/parent/hooks/useParentStatCounts';
import { PARENT_STAT_TILES } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

export function ParentStatTiles() {
  const t = useTranslations('ParentDashboard');
  const states = useParentStatCounts();

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {PARENT_STAT_TILES.map((config) => {
        const state = states[config.key];
        return (
          <StatTile
            key={config.key}
            icon={config.icon}
            iconClassName={config.iconClassName}
            label={t(config.labelKey)}
            value={state.count}
            href={config.href as string}
            isLoading={state.isLoading}
          />
        );
      })}
    </div>
  );
}
