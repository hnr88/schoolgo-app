'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolApplicationListItem } from '@/modules/school-applications';
import { schoolOffersListResponseSchema } from '@/modules/school-offers/schemas/school-offers.schema';

export const SCHOOL_OFFERS_QUERY_KEY = ['school-offers'] as const;

export function useSchoolOffers() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SCHOOL_OFFERS_QUERY_KEY,
    enabled: isAuthenticated,
    queryFn: async (): Promise<SchoolApplicationListItem[]> => {
      const { data } = await privateApi.get<unknown>('/api/school-staffs/me/applications', {
        params: { status: 'offer_made', pageSize: 100 },
      });
      return schoolOffersListResponseSchema.parse(data).data;
    },
  });
}
