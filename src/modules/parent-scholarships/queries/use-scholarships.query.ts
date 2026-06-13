'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/axios';
import { scholarshipBrowseResponseSchema } from '@/modules/parent-scholarships/schemas/scholarship.schema';
import { SCHOLARSHIP_BROWSE_PAGE_SIZE } from '@/modules/parent-scholarships/constants/scholarships.constants';
import type {
  ScholarshipBrowseResponse,
  ScholarshipFacetParams,
} from '@/modules/parent-scholarships/types/scholarship.types';

async function fetchScholarships(
  facets: ScholarshipFacetParams,
): Promise<ScholarshipBrowseResponse> {
  const params: Record<string, string | number> = {
    page: 1,
    pageSize: SCHOLARSHIP_BROWSE_PAGE_SIZE,
  };
  if (facets.type) params.type = facets.type;
  if (facets.yearLevel) params.yearLevel = facets.yearLevel;
  if (facets.nationality) params.nationality = facets.nationality;
  if (facets.minAmountAud != null) params.minAmountAud = facets.minAmountAud;
  if (facets.maxAmountAud != null) params.maxAmountAud = facets.maxAmountAud;

  const { data } = await publicApi.get<unknown>('/api/scholarships', { params });
  return scholarshipBrowseResponseSchema.parse(data);
}

export function useScholarships(facets: ScholarshipFacetParams) {
  return useQuery({
    queryKey: ['scholarships', facets],
    queryFn: () => fetchScholarships(facets),
    staleTime: 60_000,
  });
}
