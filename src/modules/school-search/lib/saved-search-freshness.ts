import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';

export type SavedSearchFreshnessKind = 'unknown' | 'new' | 'unchanged' | 'fewer';

export interface SavedSearchFreshness {
  kind: SavedSearchFreshnessKind;
  currentTotal: number;
  newCount: number;
  canMarkSeen: boolean;
}

export function computeSavedSearchFreshness(
  currentTotal: number,
  lastResultCount: number | null | undefined,
): SavedSearchFreshness {
  if (
    lastResultCount === null ||
    lastResultCount === undefined ||
    !Number.isFinite(lastResultCount)
  ) {
    return { kind: 'unknown', currentTotal, newCount: 0, canMarkSeen: true };
  }
  const diff = currentTotal - lastResultCount;
  if (diff > 0) {
    return { kind: 'new', currentTotal, newCount: diff, canMarkSeen: true };
  }
  if (diff < 0) {
    return { kind: 'fewer', currentTotal, newCount: 0, canMarkSeen: true };
  }
  return { kind: 'unchanged', currentTotal, newCount: 0, canMarkSeen: false };
}

export function toFreshnessRequest(filterState: TypedSearchRequest): TypedSearchRequest {
  return { ...filterState, page: 1, pageSize: 1 };
}
