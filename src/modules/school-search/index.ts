export { SearchBar } from '@/modules/school-search/components/SearchBar';
export { FilterChips } from '@/modules/school-search/components/FilterChips';
export { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
export { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
export { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
export { MapView } from '@/modules/school-search/components/MapView';
export { useSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
export { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
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
} from '@/modules/school-search/types/search-api.types';
