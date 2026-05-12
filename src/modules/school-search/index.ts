export { SearchBar } from '@/modules/school-search/components/SearchBar';
export { FilterChips } from '@/modules/school-search/components/FilterChips';
export { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
export { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
export { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
export { MapView } from '@/modules/school-search/components/MapView';
export { SearchPageContent } from '@/modules/school-search/components/SearchPageContent';
export { useSchoolSearch, useTypedSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
export { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
export { typedSearchSchools, searchSchools } from '@/modules/school-search/lib/search-api';
export type {
  School,
  SchoolFilters,
  Curriculum,
  AustralianState,
} from '@/modules/school-search/types/school.types';
export type {
  SchoolHit,
  SearchRequest,
  SearchResponse,
  TypedSearchRequest,
} from '@/modules/school-search/types/search-api.types';
export type {
  Accommodation,
  CurriculumCode,
  EnglishTestScore,
  EnglishTestType,
  EnrolmentStatus,
  EntryTerm,
  EntryYearLevel,
  Gender,
  ProgramType,
  QuickChipId,
  ReligiousAffiliation,
  SchoolLevel,
  Sector,
  SortOption,
} from '@/modules/school-search/types/filter.types';
