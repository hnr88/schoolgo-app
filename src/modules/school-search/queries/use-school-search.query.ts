'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  searchSchools,
  searchSchoolsTyped,
  typedSearchSchools,
} from '@/modules/school-search/lib/search-api';
import type {
  SearchRequest,
  SearchResponse,
  TypedSearchRequest,
} from '@/modules/school-search/types/search-api.types';
import type { TypedSearchRequestInput } from '@/modules/school-search/schemas/search-request.schema';

export function useSchoolSearch(params: SearchRequest) {
  return useQuery<SearchResponse>({
    queryKey: ['school-search', params],
    queryFn: () => searchSchools(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useSchoolSearchTypedQuery(params: TypedSearchRequestInput) {
  return useQuery<SearchResponse>({
    queryKey: ['school-search', 'typed', params],
    queryFn: () => searchSchoolsTyped(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useTypedSchoolSearch(request: TypedSearchRequest) {
  return useQuery<SearchResponse>({
    queryKey: ['school-search', 'typed', request],
    queryFn: () => typedSearchSchools(request),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
