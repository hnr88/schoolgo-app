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

export type HeaderVariant = 'default' | 'dark';

export interface MarketingHeaderClientProps {
  subMenus: SubMenu[];
  activePortal: Portal;
  portalUrls: Record<Portal, string>;
  navLinks: NavLink[];
  variant: HeaderVariant;
  fullWidth?: boolean;
  labels: {
    findSchools: string;
    signIn: string;
    getStarted: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
  };
}

export interface MarketingSubHeaderProps {
  menus: SubMenu[];
  inverted?: boolean;
  fullWidth?: boolean;
}

export interface MarketingHeaderProps {
  activePortal: Portal;
  variant?: HeaderVariant;
  fullWidth?: boolean;
}
