'use client';

import { useTranslations } from 'next-intl';
import { ParentStatTile } from '@/modules/dashboard/parent/components/ParentStatTile';
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
          <ParentStatTile
            key={config.key}
            config={config}
            label={t(config.labelKey)}
            count={state.count}
            isLoading={state.isLoading}
          />
        );
      })}
    </div>
  );
}
