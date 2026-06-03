import { PORTAL_NAV } from '@/modules/dashboard/constants/ui.constants';
import type { NavItem } from '@/modules/dashboard/types/dashboard.types';
import type { Portal } from '@/lib/portal-url';

export function getNavItems(portal: Portal): NavItem[] {
  const config = PORTAL_NAV[portal];
  if (config.items) return config.items;
  return (config.groups ?? []).flatMap((group) => group.items);
}
