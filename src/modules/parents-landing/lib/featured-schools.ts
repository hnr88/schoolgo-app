import 'server-only';
import { env } from '@/lib/env';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';

const FEATURED_SLUGS = [
  'sydney-grammar-school',
  'melbourne-grammar-school',
  'brisbane-grammar-school',
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
}

interface SchoolApiResponse {
  data?: SchoolApiRecord[];
}

function pickImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length];
}

function lowestTuition(record: SchoolApiRecord): number | null {
  const values = [
    record.primaryAnnualTuition,
    record.juniorSecAnnualTuition,
    record.seniorSecAnnualTuition,
  ].filter((v): v is number => typeof v === 'number');
  return values.length > 0 ? Math.min(...values) : null;
}

function toFeatured(record: SchoolApiRecord): FeaturedSchool {
  return {
    documentId: record.documentId,
    slug: record.slug,
    name: record.name,
    suburb: record.suburb ?? '',
    state: record.state ?? '',
    curriculumOffered: record.curriculumOffered,
    lowestAnnualTuition: lowestTuition(record),
    photoUrl: pickImage(record.documentId),
  };
}

async function fetchBySlug(slug: string): Promise<SchoolApiRecord | null> {
  try {
    const params = new URLSearchParams();
    params.set('filters[slug][$eq]', slug);
    params.set('pagination[pageSize]', '1');
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
    const records = await Promise.all(FEATURED_SLUGS.map(fetchBySlug));
    return records.filter((r): r is SchoolApiRecord => r !== null).map(toFeatured);
  } catch {
    return [];
  }
}
