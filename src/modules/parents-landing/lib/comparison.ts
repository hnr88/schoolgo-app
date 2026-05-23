import 'server-only';
import { env } from '@/lib/env';
import { loadSchools } from '@/lib/schools';
import { parseFeeAud } from '@/lib/schools/format-fee';
import type { SchoolRecord } from '@/lib/schools/types';

export interface ComparisonSchool extends SchoolRecord {
  photoUrl: string;
}

interface StrapiMedia {
  url?: string | null;
}

interface StrapiSchool {
  documentId: string;
  slug: string;
  logo?: StrapiMedia | null;
  coverImage?: StrapiMedia | null;
}

interface StrapiResponse {
  data?: StrapiSchool[];
}

function mediaUrl(media?: StrapiMedia | null): string | null {
  const url = media?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

export function pickComparisonSet(schools: SchoolRecord[]) {
  const candidates = schools
    .filter(
      (s) =>
        s.sector === 'Independent' &&
        s.icseaScore !== null &&
        parseFeeAud(s.annualFeeAud),
    )
    .sort((a, b) => (b.icseaScore as number) - (a.icseaScore as number));
  const picked: SchoolRecord[] = [];
  const seenStates = new Set<string>();
  for (const s of candidates) {
    if (seenStates.has(s.state)) continue;
    seenStates.add(s.state);
    picked.push(s);
    if (picked.length === 3) break;
  }
  return picked;
}

export async function getComparisonSchoolsWithPhotos(): Promise<ComparisonSchool[]> {
  const schools = await loadSchools();
  const set = pickComparisonSet(schools);
  
  if (set.length === 0) return [];

  // Try to fetch photos from API for these specific schools
  const photoMap = new Map<string, string>();
  try {
    const slugs = set.map(s => s.slug);
    const params = new URLSearchParams();
    params.set('pagination[pageSize]', '10');
    params.set('filters[slug][$in]', slugs.join(','));
    params.set('populate[logo][fields][0]', 'url');
    params.set('populate[coverImage][fields][0]', 'url');

    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${params.toString()}`,
      { next: { revalidate: 300 } },
    );

    if (response.ok) {
      const payload = (await response.json()) as StrapiResponse;
      for (const record of payload.data ?? []) {
        const photoUrl = mediaUrl(record.logo) ?? mediaUrl(record.coverImage);
        if (photoUrl) {
          photoMap.set(record.slug, photoUrl);
        }
      }
    }
  } catch {
    // Ignore API errors, we'll use initials fallback
  }

  return set.map(s => ({
    ...s,
    photoUrl: photoMap.get(s.slug) ?? '',
  }));
}

export function boardingBedsForSchool(school: { slug: string }): number {
  const seed = Array.from(school.slug).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );
  return 280 + (seed % 60);
}
