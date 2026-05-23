import 'server-only';
import { env } from '@/lib/env';
import type { SchoolHit, SearchResponse } from '@/modules/school-search/types/search-api.types';

export async function getFeaturedSchools(limit: number): Promise<SchoolHit[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/search/schools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit }),
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as SearchResponse;
    return payload.data?.hits?.slice(0, limit) ?? [];
  } catch {
    return [];
  }
}
