import 'server-only';
import { env } from '@/lib/env';
import type { SearchResponse } from '@/modules/school-search/types/search-api.types';

export async function getFeaturedSchoolLogos(
  limit: number,
): Promise<(string | null)[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/search/schools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit }),
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as SearchResponse;
    const hits = payload.data?.hits ?? [];
    return hits.slice(0, limit).map((hit) => hit.logoUrl);
  } catch {
    return [];
  }
}
