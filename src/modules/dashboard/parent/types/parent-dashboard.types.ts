import type { ComponentProps } from 'react';
import type { IconComponent } from '@/modules/design-system';
import type { Link } from '@/i18n/navigation';

type LinkHref = ComponentProps<typeof Link>['href'];

export interface ParentQuickAction {
  href: LinkHref;
  icon: IconComponent;
  labelKey: string;
  bg: string;
  color: string;
}

export type ParentStatTileKey =
  | 'applicationsInProgress'
  | 'children'
  | 'savedSchools'
  | 'offers';

export interface ParentStatTileConfig {
  key: ParentStatTileKey;
  href: LinkHref;
  icon: IconComponent;
  labelKey: string;
  iconBg: string;
  iconColor: string;
}

export type ParentStatCounts = Record<ParentStatTileKey, number>;

export interface ParentDashboardCardProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: LinkHref;
  viewAllLabel?: string;
  children: React.ReactNode;
}
