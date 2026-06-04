import { StatTile } from '@/modules/core';
import type { ParentStatTileConfig } from '@/modules/dashboard/parent/types/parent-dashboard.types';

interface ParentStatTileProps {
  config: ParentStatTileConfig;
  label: string;
  count: number;
  subMetric?: string;
  isLoading: boolean;
}

export function ParentStatTile({ config, label, count, subMetric, isLoading }: ParentStatTileProps) {
  return (
    <StatTile
      href={config.href as string}
      icon={config.icon}
      iconClassName={config.iconClassName}
      label={label}
      value={count}
      subMetric={subMetric}
      isLoading={isLoading}
    />
  );
}
