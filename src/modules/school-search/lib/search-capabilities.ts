import type { SortOption } from '@/modules/school-search/types/filter.types';
import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';

export const ADVANCED_FILTER_FIELDS = [
  'entryTerms',
  'programTypes',
  'englishTest',
] as const;

export type AdvancedFilterField = (typeof ADVANCED_FILTER_FIELDS)[number];

export const ADVANCED_SORT_VALUES = [
  'name-desc',
  'enrolment-status',
  'application-deadline-asc',
  'school-size-asc',
  'school-size-desc',
  'international-pct-asc',
  'international-pct-desc',
] as const satisfies readonly SortOption[];

export type AdvancedSortValue = (typeof ADVANCED_SORT_VALUES)[number];

export const BASIC_FALLBACK_SORT: SortOption = 'name-asc';

export function canUseAdvancedSearch(isAuthenticated: boolean): boolean {
  return isAuthenticated;
}

export function isAdvancedSort(
  sortBy: SortOption | undefined,
): sortBy is AdvancedSortValue {
  return (
    sortBy !== undefined &&
    (ADVANCED_SORT_VALUES as readonly SortOption[]).includes(sortBy)
  );
}

export function isAdvancedCapability(
  capability: AdvancedFilterField | SortOption,
): boolean {
  return (
    (ADVANCED_FILTER_FIELDS as readonly string[]).includes(capability) ||
    (ADVANCED_SORT_VALUES as readonly string[]).includes(capability)
  );
}

export function stripAdvancedFields(
  request: TypedSearchRequest,
  isAuthenticated: boolean,
): TypedSearchRequest {
  if (canUseAdvancedSearch(isAuthenticated)) return request;

  const stripped: TypedSearchRequest = { ...request };
  delete stripped.entryTerms;
  delete stripped.programTypes;
  delete stripped.englishTest;
  if (isAdvancedSort(stripped.sortBy)) stripped.sortBy = BASIC_FALLBACK_SORT;
  return stripped;
}
