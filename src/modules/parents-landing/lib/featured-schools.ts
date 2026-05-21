import 'server-only';
import { env } from '@/lib/env';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import { FEATURED_SCHOOL_SLUGS } from '@/modules/parents-landing/constants/parents-landing.constants';

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

interface StrapiMedia {
  url?: string | null;
}

interface SchoolApiRecord {
  documentId: string;
  slug: string;
  name: string;
  suburb: string | null;
  state: string | null;
  curriculumOffered: string | null;
  primaryAnnualTuition: number | null;
  juniorSecAnnualTuition: number | null;
  seniorSecAnnualTuition: number | null;
  logo?: StrapiMedia | null;
  coverImage?: StrapiMedia | null;
}

interface SchoolApiResponse {
  data?: SchoolApiRecord[];
}

function fallbackImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length];
}

function mediaUrl(media?: StrapiMedia | null): string | null {
  const url = media?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

function lowestTuition(record: SchoolApiRecord): number | null {
  const values = [
    record.primaryAnnualTuition,
    record.juniorSecAnnualTuition,
    record.seniorSecAnnualTuition,
  ].filter((v): v is number => typeof v === 'number');
  return values.length > 0 ? Math.min(...values) : null;
}

function fromRecord(record: SchoolApiRecord): FeaturedSchool {
  const logo = mediaUrl(record.logo);
  const cover = mediaUrl(record.coverImage);
  return {
    documentId: record.documentId,
    slug: record.slug,
    name: record.name,
    suburb: record.suburb ?? '',
    state: record.state ?? '',
    curriculumOffered: record.curriculumOffered,
    lowestAnnualTuition: lowestTuition(record),
    photoUrl: logo ?? cover ?? fallbackImage(record.documentId),
  };
}

async function fetchBySlug(slug: string): Promise<SchoolApiRecord | null> {
  try {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('pagination[pageSize]', '1');
    params.set('populate[logo][fields][0]', 'url');
    params.set('populate[coverImage][fields][0]', 'url');
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${params.toString()}`,
      { next: { revalidate: 300 } },
    );
    if (!response.ok) return null;
    const payload = (await response.json()) as SchoolApiResponse;
    return payload.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedSchools(): Promise<FeaturedSchool[]> {
  try {
    const records = await Promise.all(FEATURED_SCHOOL_SLUGS.map(fetchBySlug));
    return records.filter((r): r is SchoolApiRecord => r !== null).map(fromRecord);
  } catch {
    return [];
  }
}
