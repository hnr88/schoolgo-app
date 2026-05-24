import 'server-only';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';
import type { SchoolHit, SearchResponse } from '@/modules/school-search/types/search-api.types';

export async function getFeaturedSchools(limit: number): Promise<SchoolHit[]> {
  try {
    const { data: payload } = await publicApi.post<SearchResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/search/schools`,
      { limit },
    );
    return payload.data?.hits?.slice(0, limit) ?? [];
  } catch {
    return [];
  }
}
