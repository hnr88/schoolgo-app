import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';
import type { AutocompleteSchoolHit } from '@/modules/school-search/types/autocomplete-schools.types';
import type { AutocompleteSuburbHit } from '@/modules/school-search/types/autocomplete-suburbs.types';

export interface FilterChipsProps {
  className?: string;
}

export interface FilterSidebarProps {
  className?: string;
  cardClassName?: string;
}

export interface MapViewProps {
  className?: string;
  activePortal: Portal;
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
  specOnly?: boolean;
}

export interface SchoolResultsPanelProps {
  activePortal: Portal;
  variant?: 'default' | 'parent';
}

export interface SearchAutocompleteDropdownProps {
  query: string;
  isOpen: boolean;
  onSelectSchool: (hit: AutocompleteSchoolHit) => void;
  onSelectSuburb: (hit: AutocompleteSuburbHit) => void;
  onClose: () => void;
}

export interface SavedSearchesPanelProps {
  className?: string;
}

export interface SpecResultsPanelProps {
  activePortal: Portal;
  className?: string;
  alwaysOn?: boolean;
  floating?: boolean;
}
