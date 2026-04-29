import type { ReactNode } from 'react';
import type { School } from '@/modules/school-search/types/school.types';
import type { Portal } from '@/lib/portal-url';

export interface FilterChipsProps {
  className?: string;
}

export interface FilterSidebarProps {
  className?: string;
  cardClassName?: string;
}

export interface LeafletMapProps {
  schools: School[];
}

export interface MapViewProps {
  className?: string;
}

export interface SearchSchoolCardProps {
  school: School;
}

export interface SearchAuthGateProps {
  children: ReactNode;
}

export interface SearchBarProps {
  className?: string;
}

export interface SearchLayoutProps {
  children: ReactNode;
}

export interface SearchPageContentProps {
  activePortal: Portal;
  title: string;
}
