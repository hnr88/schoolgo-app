import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';

export interface FilterChipsProps {
  className?: string;
}

export interface FilterSidebarProps {
  className?: string;
  cardClassName?: string;
}

export interface MapViewProps {
  className?: string;
}

export interface SearchAuthGateProps {
  children: ReactNode;
}

export interface SearchBarProps {
  className?: string;
}

export interface SearchLayoutProps {
  children: ReactNode;
  guestAccess?: boolean;
}

export interface SearchPageContentProps {
  activePortal: Portal;
  title: string;
  guestAccess?: boolean;
}
