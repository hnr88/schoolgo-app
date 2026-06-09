'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolApplicationListItem } from '@/modules/school-applications';
import type { SchoolOffersListResponse } from '@/modules/school-offers/types/school-offers.types';

export const SCHOOL_OFFERS_QUERY_KEY = ['school-offers'] as const;

export function useSchoolOffers() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SCHOOL_OFFERS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolApplicationListItem[]> => {
      const { data } = await privateApi.get<SchoolOffersListResponse>(
        '/api/school-staffs/me/applications',
        { params: { status: 'offer_made', pageSize: 100 } },
      );
      return data.data;
    },
  });
}
