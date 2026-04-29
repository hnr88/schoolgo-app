import type { Portal } from '@/lib/portal-url';

export type AudienceKey = 'parents' | 'agents' | 'schools';

export interface NavLink {
  label: string;
  href: string;
}

export interface SubMenuItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  description?: string;
}

export interface SubMenu {
  label: string;
  items: SubMenuItem[];
}

export interface MarketingHeaderClientProps {
  subMenus: SubMenu[];
  activePortal: Portal;
  portalUrls: Record<Portal, string>;
  navLinks: NavLink[];
  labels: {
    findSchools: string;
    signIn: string;
    getStarted: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    audiences: Record<AudienceKey, string>;
  };
}

export interface MarketingSubHeaderProps {
  menus: SubMenu[];
}

export interface MarketingHeaderProps {
  activePortal: Portal;
}
