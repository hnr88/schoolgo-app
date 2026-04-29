import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';

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

export interface UserTypeSelectorProps {
  value: Portal;
  onChange: (type: Portal) => void;
}
