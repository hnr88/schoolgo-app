import type { AgentSortBy } from '@/modules/agent-search/types/agent-search.types';

export interface AgentFilterOption<T extends string> {
  value: T;
  labelKey: string;
}

export const AGENT_PAGE_SIZE = 24;

export const AGENT_COUNTRY_OPTIONS: readonly AgentFilterOption<string>[] = [
  { value: 'Australia', labelKey: 'country.australia' },
  { value: 'China', labelKey: 'country.china' },
  { value: 'India', labelKey: 'country.india' },
  { value: 'Vietnam', labelKey: 'country.vietnam' },
  { value: 'Indonesia', labelKey: 'country.indonesia' },
  { value: 'Malaysia', labelKey: 'country.malaysia' },
  { value: 'Thailand', labelKey: 'country.thailand' },
  { value: 'South Korea', labelKey: 'country.southKorea' },
] as const;

export const AGENT_LANGUAGE_OPTIONS: readonly AgentFilterOption<string>[] = [
  { value: 'English', labelKey: 'language.english' },
  { value: 'Mandarin', labelKey: 'language.mandarin' },
  { value: 'Cantonese', labelKey: 'language.cantonese' },
  { value: 'Hindi', labelKey: 'language.hindi' },
  { value: 'Vietnamese', labelKey: 'language.vietnamese' },
  { value: 'Bahasa Indonesia', labelKey: 'language.bahasaIndonesia' },
  { value: 'Thai', labelKey: 'language.thai' },
  { value: 'Korean', labelKey: 'language.korean' },
] as const;

export const AGENT_SERVICE_OPTIONS: readonly AgentFilterOption<string>[] = [
  { value: 'school_placement', labelKey: 'service.schoolPlacement' },
  { value: 'visa_assistance', labelKey: 'service.visaAssistance' },
  { value: 'guardianship', labelKey: 'service.guardianship' },
  { value: 'accommodation', labelKey: 'service.accommodation' },
  { value: 'airport_pickup', labelKey: 'service.airportPickup' },
  { value: 'english_preparation', labelKey: 'service.englishPreparation' },
] as const;

export const AGENT_SORT_OPTIONS: readonly AgentFilterOption<AgentSortBy>[] = [
  { value: 'relevance', labelKey: 'sort.relevance' },
  { value: 'experience', labelKey: 'sort.experience' },
  { value: 'name_asc', labelKey: 'sort.nameAsc' },
  { value: 'name_desc', labelKey: 'sort.nameDesc' },
  { value: 'recently_verified', labelKey: 'sort.recentlyVerified' },
] as const;
