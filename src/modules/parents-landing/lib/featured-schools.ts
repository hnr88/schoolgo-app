import 'server-only';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';
import { FEATURED_SCHOOL_SLUGS } from '@/modules/parents-landing/constants/parents-landing.constants';

export interface FeaturedSchool {
  documentId: string;
  slug: string;
  name: string;
  suburb: string;
  state: string;
  curriculumOffered: string | null;
  lowestAnnualTuition: number | null;
  photoUrl: string | null;
  logoUrl: string | null;
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
    photoUrl: cover ?? null,
    logoUrl: logo ?? null,
  };
}

async function fetchBySlug(slug: string): Promise<SchoolApiRecord | null> {
  try {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('pagination[pageSize]', '1');
    params.set('populate[logo][fields][0]', 'url');
    params.set('populate[coverImage][fields][0]', 'url');
    const { data: payload } = await publicApi.get<SchoolApiResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${params.toString()}`,
    );
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
