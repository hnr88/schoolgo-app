export { SearchBar } from '@/modules/school-search/components/SearchBar';
export { FilterChips } from '@/modules/school-search/components/FilterChips';
export { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
export { SearchSchoolCard } from '@/modules/school-search/components/SchoolCard';
export { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
export { MapView } from '@/modules/school-search/components/MapView';
export { SearchPageContent } from '@/modules/school-search/components/SearchPageContent';
export { SaveSearchButton } from '@/modules/school-search/components/SaveSearchButton';
export { SavedSearchesPanel } from '@/modules/school-search/components/SavedSearchesPanel';
export { SearchAutocompleteDropdown } from '@/modules/school-search/components/SearchAutocompleteDropdown';
export { useSchoolSearch, useTypedSchoolSearch } from '@/modules/school-search/queries/use-school-search.query';
export { useAutocompleteSchools } from '@/modules/school-search/queries/use-autocomplete-schools.query';
export { useAutocompleteSuburbs } from '@/modules/school-search/queries/use-autocomplete-suburbs.query';
export { useCompareSchools } from '@/modules/school-search/queries/use-compare-schools.query';
export { useSavedSearches } from '@/modules/school-search/queries/use-saved-searches.query';
export { useCreateSavedSearch } from '@/modules/school-search/queries/use-create-saved-search.mutation';
export { useDeleteSavedSearch } from '@/modules/school-search/queries/use-delete-saved-search.mutation';
export { useBookmarks } from '@/modules/school-search/queries/use-bookmarks.query';
export { useCreateBookmark } from '@/modules/school-search/queries/use-create-bookmark.mutation';
export { useDeleteBookmark } from '@/modules/school-search/queries/use-delete-bookmark.mutation';
export { useSearchWithFilters } from '@/modules/school-search/hooks/useSearchWithFilters';
export { typedSearchSchools, searchSchools } from '@/modules/school-search/lib/search-api';
export { autocompleteSchools } from '@/modules/school-search/lib/autocomplete-schools-api';
export { autocompleteSuburbs } from '@/modules/school-search/lib/autocomplete-suburbs-api';
export { compareSchools } from '@/modules/school-search/lib/compare-schools-api';
export {
  createSavedSearch,
  listSavedSearches,
  deleteSavedSearch,
} from '@/modules/school-search/lib/saved-searches-api';
export {
  createBookmark,
  listBookmarks,
  deleteBookmark,
} from '@/modules/school-search/lib/bookmarks-api';
export { mapStoreToTypedRequest } from '@/modules/school-search/lib/store-to-typed-request';
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
export type {
  AutocompleteSchoolHit,
  AutocompleteSchoolsResponse,
} from '@/modules/school-search/types/autocomplete-schools.types';
export type {
  AutocompleteSuburbHit,
  AutocompleteSuburbsResponse,
} from '@/modules/school-search/types/autocomplete-suburbs.types';
export type {
  CompareSchoolHit,
  CompareSchoolsResponse,
  TuitionByLevel,
  CricosAgeRange,
} from '@/modules/school-search/types/compare-schools.types';
export type {
  SavedSearch,
  CreateSavedSearchInput,
  SavedSearchResponse,
  SavedSearchesListResponse,
} from '@/modules/school-search/types/saved-searches.types';
export type {
  Bookmark,
  CreateBookmarkInput,
  BookmarkResponse,
  BookmarksListResponse,
} from '@/modules/school-search/types/bookmarks.types';
export type {
  SearchAutocompleteDropdownProps,
  SavedSearchesPanelProps,
  SpecResultsPanelProps,
} from '@/modules/school-search/types/component.types';
