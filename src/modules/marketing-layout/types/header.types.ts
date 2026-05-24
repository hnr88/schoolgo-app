import type { Portal } from '@/lib/portal-url';

export type AudienceKey = 'parents' | 'agents' | 'schools';

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
  audienceKey?: AudienceKey;
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
  fullWidth?: boolean;
}

export interface MarketingHeaderLogoProps {
  href: string;
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export interface MarketingDesktopNavProps {
  navLinks: NavLink[];
  ariaLabel: string;
}

export interface MarketingDesktopActionsProps {
  isSearchPage: boolean;
  labels: {
    signIn: string;
    findSchools: string;
  };
}

export interface MarketingMobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  sheetRef: React.RefObject<HTMLDivElement | null>;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  navLinks: NavLink[];
  subMenus: SubMenu[];
  portalUrl: string;
  isSearchPage: boolean;
  labels: {
    signIn: string;
    findSchools: string;
    openMenu: string;
    closeMenu: string;
  };
}

export interface MarketingMobileBackdropProps {
  mobileOpen: boolean;
  onClick: () => void;
}

export interface MarketingMobileSheetProps {
  sheetRef: React.RefObject<HTMLDivElement | null>;
  mobileOpen: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  children: React.ReactNode;
}

export interface MarketingMobileSheetHeaderProps {
  portalUrl: string;
  onLogoClick: () => void;
  onClose: () => void;
  closeLabel: string;
}

export interface MarketingMobileNavLinksProps {
  navLinks: NavLink[];
  onLinkClick: () => void;
}

export interface MarketingMobileSubMenusProps {
  subMenus: SubMenu[];
  onLinkClick: () => void;
}

export interface MarketingMobileFooterProps {
  isSearchPage: boolean;
  onLinkClick: () => void;
  labels: {
    signIn: string;
    findSchools: string;
  };
}
