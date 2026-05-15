import 'server-only';
import { env } from '@/lib/env';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import type {
  SchoolHit,
  SearchResponse,
} from '@/modules/school-search/types/search-api.types';

const FEATURED_NAMES = [
  'Sydney Grammar School',
  'Melbourne Grammar School',
  'Brisbane Grammar School',
];

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

async function fetchByName(name: string): Promise<SchoolHit | null> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/search/schools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: name, limit: 1 }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as SearchResponse;
    return payload.data?.hits?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedSchools(): Promise<FeaturedSchool[]> {
  try {
    const hits = await Promise.all(FEATURED_NAMES.map(fetchByName));
    return hits.filter((h): h is SchoolHit => h !== null).map(toFeatured);
  } catch {
    return [];
  }
}
