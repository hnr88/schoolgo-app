import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';
import type { SearchCapability } from '@/modules/unified-search';
import type { AutocompleteSchoolHit } from '@/modules/school-search/types/autocomplete-schools.types';
import type { AutocompleteSuburbHit } from '@/modules/school-search/types/autocomplete-suburbs.types';

export interface MapViewProps {
  className?: string;
  activePortal: Portal;
}

export interface SearchBarProps {
  className?: string;
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
  capability?: SearchCapability;
  className?: string;
  alwaysOn?: boolean;
  floating?: boolean;
  teaserSlot?: ReactNode;
}
