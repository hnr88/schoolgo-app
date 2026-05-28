'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SchoolOption } from '@/modules/applications/types/create-application.types';

interface SchoolListResponse {
  data: Array<{ documentId: string; name: string; suburb: string | null; state: string | null }>;
}

export function usePresetSchool(documentId?: string, slug?: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const enabled = isAuthenticated && Boolean(documentId || slug);

  return useQuery<SchoolOption | null>({
    queryKey: ['preset-school', documentId ?? null, slug ?? null],
    enabled,
    queryFn: async () => {
      const params: Record<string, unknown> = {
        'fields[0]': 'name',
        'fields[1]': 'suburb',
        'fields[2]': 'state',
        'pagination[pageSize]': 1,
      };
      if (documentId) params['filters[documentId][$eq]'] = documentId;
      else if (slug) params['filters[slug][$eq]'] = slug;

      const { data } = await privateApi.get<SchoolListResponse>('/api/schools', { params });
      const hit = data.data[0];
      if (!hit) return null;
      return {
        documentId: hit.documentId,
        name: hit.name,
        suburb: hit.suburb ?? null,
        state: hit.state ?? null,
      };
    },
  });
}
