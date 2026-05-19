import 'server-only';
import { env } from '@/lib/env';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';
import type {
  SchoolHit,
  SearchResponse,
} from '@/modules/school-search/types/search-api.types';

interface FeaturedTarget {
  name: string;
  slug: string;
  fallback: FeaturedSchool;
}

const FEATURED: FeaturedTarget[] = [
  {
    name: 'Sydney Grammar School',
    slug: 'sydney-grammar-school',
    fallback: {
      documentId: 'featured-sydney-grammar-school',
      slug: 'sydney-grammar-school',
      name: 'Sydney Grammar School',
      suburb: 'Darlinghurst',
      state: 'NSW',
      curriculumOffered: 'HSC',
      lowestAnnualTuition: 52410,
      photoUrl: pickImage('featured-sydney-grammar-school'),
    },
  },
  {
    name: 'Melbourne Grammar School',
    slug: 'melbourne-grammar-school',
    fallback: {
      documentId: 'featured-melbourne-grammar-school',
      slug: 'melbourne-grammar-school',
      name: 'Melbourne Grammar School',
      suburb: 'Melbourne',
      state: 'VIC',
      curriculumOffered: 'VCE',
      lowestAnnualTuition: 64000,
      photoUrl: pickImage('featured-melbourne-grammar-school'),
    },
  },
  {
    name: 'Brisbane Grammar School',
    slug: 'brisbane-grammar-school',
    fallback: {
      documentId: 'featured-brisbane-grammar-school',
      slug: 'brisbane-grammar-school',
      name: 'Brisbane Grammar School',
      suburb: 'Brisbane',
      state: 'QLD',
      curriculumOffered: 'QCE, IB Diploma',
      lowestAnnualTuition: 41000,
      photoUrl: pickImage('featured-brisbane-grammar-school'),
    },
  },
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

function lowestFromRecord(record: SchoolApiRecord): number | null {
  const values = [
    record.primaryAnnualTuition,
    record.juniorSecAnnualTuition,
    record.seniorSecAnnualTuition,
  ].filter((v): v is number => typeof v === 'number');
  return values.length > 0 ? Math.min(...values) : null;
}

function fromRecord(record: SchoolApiRecord): FeaturedSchool {
  return {
    documentId: record.documentId,
    slug: record.slug,
    name: record.name,
    suburb: record.suburb ?? '',
    state: record.state ?? '',
    curriculumOffered: record.curriculumOffered,
    lowestAnnualTuition: lowestFromRecord(record),
    photoUrl: pickImage(record.documentId),
  };
}

function fromHit(hit: SchoolHit): FeaturedSchool {
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

function normalizedName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isTargetSchool(name: string, target: FeaturedTarget): boolean {
  return normalizedName(name).includes(normalizedName(target.name));
}

async function fetchByQuery(query: string): Promise<SchoolApiRecord | null> {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${query}`,
      { next: { revalidate: 300 } },
    );
    if (!response.ok) return null;
    const payload = (await response.json()) as SchoolApiResponse;
    return payload.data?.[0] ?? null;
  } catch {
    return null;
  }
}

async function fetchBySlug(slug: string): Promise<SchoolApiRecord | null> {
  const params = new URLSearchParams();
  params.set('filters[slug][$eq]', slug);
  params.set('pagination[pageSize]', '1');
  return fetchByQuery(params.toString());
}

async function fetchByExactName(name: string): Promise<SchoolApiRecord | null> {
  const params = new URLSearchParams();
  params.set('filters[name][$eqi]', name);
  params.set('pagination[pageSize]', '1');
  return fetchByQuery(params.toString());
}

async function fetchByNameContains(name: string): Promise<SchoolApiRecord | null> {
  const params = new URLSearchParams();
  params.set('filters[name][$containsi]', name);
  params.set('pagination[pageSize]', '1');
  params.set('sort[0]', 'name:asc');
  return fetchByQuery(params.toString());
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

async function resolveOne(target: FeaturedTarget): Promise<FeaturedSchool | null> {
  const bySlug = await fetchBySlug(target.slug);
  if (bySlug) return fromRecord(bySlug);

  const byExactName = await fetchByExactName(target.name);
  if (byExactName) return fromRecord(byExactName);

  const byContains = await fetchByNameContains(target.name);
  if (byContains) return fromRecord(byContains);

  const hit = await fetchByName(target.name);
  if (hit && isTargetSchool(hit.name, target)) return fromHit(hit);

  return target.fallback;
}

export async function getFeaturedSchools(): Promise<FeaturedSchool[]> {
  try {
    const results = await Promise.all(FEATURED.map(resolveOne));
    return results.filter((r): r is FeaturedSchool => r !== null);
  } catch {
    return [];
  }
}
