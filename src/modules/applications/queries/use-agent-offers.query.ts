'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { StrapiApplicationListResponse } from '@/modules/applications/types/application.types';

const OFFER_POPULATE: Record<string, string> = {
  'populate[student][fields][0]': 'firstName',
  'populate[student][fields][1]': 'lastName',
  'populate[student][fields][2]': 'documentId',
  'populate[school][fields][0]': 'name',
  'populate[school][fields][1]': 'state',
  'populate[school][fields][2]': 'documentId',
};

export function useAgentOffers() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['agent', 'offers', 'offer_made'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        ...OFFER_POPULATE,
        'filters[status][$eq]': 'offer_made',
        'pagination[pageSize]': 100,
        'sort[0]': 'statusChangedAt:asc',
      };

      const { data } = await privateApi.get<StrapiApplicationListResponse>('/api/applications', {
        params,
      });
      return data;
    },
  });
}
