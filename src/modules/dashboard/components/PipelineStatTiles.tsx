'use client';

import { useTranslations } from 'next-intl';
import { StatTile } from '@/modules/core';
import type { StatTileDelta } from '@/modules/core';
import type { StatTileView } from '@/modules/dashboard/types/agent-dashboard.types';

function toDelta(delta: number): StatTileDelta | undefined {
  if (delta === 0) return undefined;
  return {
    direction: delta > 0 ? 'up' : 'down',
    label: `${delta > 0 ? '+' : ''}${delta}`,
  };
}

export function PipelineStatTiles({ tiles }: { tiles: StatTileView[] }) {
  const t = useTranslations('Dashboard.cards');

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {tiles.map((tile) => (
        <StatTile
          key={tile.labelKey}
          icon={tile.icon}
          iconClassName={tile.iconClassName}
          label={t(tile.labelKey)}
          value={tile.count}
          delta={toDelta(tile.delta)}
          href={tile.href}
        />
      ))}
    </div>
  );
}
