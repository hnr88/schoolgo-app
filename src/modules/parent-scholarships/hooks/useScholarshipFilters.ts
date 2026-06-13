'use client';

import { useMemo, useState } from 'react';
import { useScholarships } from '@/modules/parent-scholarships/queries/use-scholarships.query';
import type {
  ScholarshipFacets,
  ScholarshipFacetParams,
  ScholarshipType,
  ScholarshipYearLevel,
} from '@/modules/parent-scholarships/types/scholarship.types';

const EMPTY_FACETS: ScholarshipFacets = {
  type: null,
  yearLevel: null,
  nationality: '',
  minAmountAud: null,
  maxAmountAud: null,
};

function toParams(facets: ScholarshipFacets): ScholarshipFacetParams {
  const params: ScholarshipFacetParams = {};
  if (facets.type) params.type = facets.type;
  if (facets.yearLevel) params.yearLevel = facets.yearLevel;
  const nationality = facets.nationality.trim();
  if (nationality) params.nationality = nationality;
  if (facets.minAmountAud != null) params.minAmountAud = facets.minAmountAud;
  if (facets.maxAmountAud != null) params.maxAmountAud = facets.maxAmountAud;
  return params;
}

export function useScholarshipFilters() {
  const [facets, setFacets] = useState<ScholarshipFacets>(EMPTY_FACETS);
  const params = useMemo(() => toParams(facets), [facets]);
  const query = useScholarships(params);

  const scholarships = query.data?.data ?? [];
  const hasActiveFacets =
    facets.type !== null ||
    facets.yearLevel !== null ||
    facets.nationality.trim() !== '' ||
    facets.minAmountAud != null ||
    facets.maxAmountAud != null;

  return {
    facets,
    setType: (type: ScholarshipType | null) => setFacets((f) => ({ ...f, type })),
    setYearLevel: (yearLevel: ScholarshipYearLevel | null) =>
      setFacets((f) => ({ ...f, yearLevel })),
    setNationality: (nationality: string) => setFacets((f) => ({ ...f, nationality })),
    setMinAmount: (minAmountAud: number | null) => setFacets((f) => ({ ...f, minAmountAud })),
    setMaxAmount: (maxAmountAud: number | null) => setFacets((f) => ({ ...f, maxAmountAud })),
    reset: () => setFacets(EMPTY_FACETS),
    hasActiveFacets,
    scholarships,
    total: query.data?.meta.pagination.total ?? scholarships.length,
    isLoading: query.isLoading,
    isError: query.isError,
    isEmpty: !query.isLoading && !query.isError && scholarships.length === 0,
    refetch: query.refetch,
  };
}
