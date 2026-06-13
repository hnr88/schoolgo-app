'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { SHORTLIST_QUERY_KEY } from '@/modules/parent-shortlist/constants/shortlist.constants';
import { shortlistsResponseSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { Shortlist } from '@/modules/parent-shortlist/types/shortlist.types';

async function fetchShortlists(): Promise<Shortlist[]> {
  const { data } = await privateApi.get('/api/shortlists/mine-and-shared');
  return shortlistsResponseSchema.parse(data).data;
}

export function useShortlists() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: SHORTLIST_QUERY_KEY,
    queryFn: fetchShortlists,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
