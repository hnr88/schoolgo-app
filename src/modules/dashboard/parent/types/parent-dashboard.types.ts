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

export interface ParentDashboardCardProps {
  title: string;
  icon: IconComponent;
  viewAllHref?: LinkHref;
  viewAllLabel?: string;
  children: React.ReactNode;
}
