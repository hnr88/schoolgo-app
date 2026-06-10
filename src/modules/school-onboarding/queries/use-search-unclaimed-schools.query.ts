'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type { StrapiEnvelope } from '@/modules/school-profile/types/school-profile.types';
import type { UnclaimedSchool } from '@/modules/school-onboarding/types/school-onboarding.types';

export const UNCLAIMED_SCHOOLS_QUERY_KEY = 'unclaimed-schools';

export function useSearchUnclaimedSchools(search: string) {
  const trimmed = search.trim();

  return useQuery<UnclaimedSchool[]>({
    queryKey: [UNCLAIMED_SCHOOLS_QUERY_KEY, trimmed],
    enabled: trimmed.length >= 2,
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<UnclaimedSchool[]>>(
        '/api/schools/unclaimed',
        { params: { search: trimmed, page: 1, pageSize: 10 } },
      );
      return res.data.data;
    },
  });
}
