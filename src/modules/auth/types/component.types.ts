import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';
import type { UserRole } from '@/modules/auth/types/auth.types';
import type { IconComponent } from '@/modules/design-system';

export interface AuthCloseButtonProps {
  className?: string;
}

export interface AuthInitProviderProps {
  children: ReactNode;
}

export interface AuthPageShellProps {
  portal: Portal;
  children: ReactNode;
}

export interface AuthPortalHintProps {
  activePortal: Portal;
}

export interface AuthPortalTabsProps {
  activePortal: Portal;
}

export interface AuthRedirectCheckProps {
  portal?: Portal;
  children?: ReactNode;
}

export interface LoginFormProps {
  userType: Portal;
}

export interface ProtectedLayoutProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export interface RegisterFormProps {
  userType: Portal;
}

export interface SignInCardProps {
  portal: Portal;
}

export interface SignInPageContentProps {
  portal: Portal;
}

export interface SignUpCardProps {
  portal: Portal;
}

export interface SignUpPageContentProps {
  portal: Portal;
}

export interface ForgotPasswordCardProps {
  portal: Portal;
}

export interface ForgotPasswordPageContentProps {
  portal: Portal;
}

export interface ResetPasswordCardProps {
  portal: Portal;
  code: string;
}

export interface ResetPasswordPageContentProps {
  portal: Portal;
  code: string;
}

export interface UserTypeSelectorProps {
  value: Portal;
  onChange: (type: Portal) => void;
}

export type PortalNavItem = {
  labelKey: string;
  hash: string;
};

export type PortalThemeStat = {
  valueKey: string;
  labelKey: string;
};

export type PortalTheme = {
  gradient: string;
  blob1: string;
  blob2: string;
  image: string;
  overlayGradient: string;
  scrim: string;
  panelBg: string;
  stats: PortalThemeStat[];
};

export type UserTypeOption = {
  type: Portal;
  icon: IconComponent;
};
