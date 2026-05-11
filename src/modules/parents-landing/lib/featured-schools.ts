import 'server-only';
import { env } from '@/lib/env';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import type {
  SchoolHit,
  SearchResponse,
} from '@/modules/school-search/types/search-api.types';

const FEATURED_LIMIT = 3;

export interface FeaturedSchool {
  documentId: string;
  slug: string;
  name: string;
  suburb: string;
  state: string;
  curriculumOffered: string | null;
  lowestAnnualTuition: number | null;
  photoUrl: string;
}

function pickImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length];
}

function toFeatured(hit: SchoolHit): FeaturedSchool {
  return {
    documentId: hit.documentId,
    slug: hit.slug,
    name: hit.name,
    suburb: hit.suburb,
    state: hit.state,
    curriculumOffered: hit.curriculumOffered,
    lowestAnnualTuition: hit.lowestAnnualTuition,
    photoUrl: pickImage(hit.documentId),
  };
}

export async function getFeaturedSchools(): Promise<FeaturedSchool[]> {
  try {
    const response = await fetch(`${env.STRAPI_API_URL}/api/search/schools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit: FEATURED_LIMIT }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as SearchResponse;
    const hits = payload.data?.hits ?? [];
    return hits.slice(0, FEATURED_LIMIT).map(toFeatured);
  } catch {
    return [];
  }
}
