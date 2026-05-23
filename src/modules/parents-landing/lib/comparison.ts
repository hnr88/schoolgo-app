import 'server-only';
import { env } from '@/lib/env';
import { generateSchoolPlaceholder } from '@/lib/schools/generate-school-placeholder';
import { parseFeeAud } from '@/lib/schools/format-fee';

export interface ComparisonSchool {
  documentId: string;
  slug: string;
  name: string;
  suburb: string;
  state: string;
  sector: string;
  schoolType: string;
  annualFeeAud: string;
  intakePeriods: string;
  boardingAvailable: string;
  icseaScore: number | null;
  photoUrl: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

interface StrapiMedia {
  url?: string | null;
}

interface StrapiSchool {
  documentId: string;
  slug: string;
  name: string;
  suburb: string | null;
  state: string | null;
  sector: string | null;
  schoolType: string | null;
  annualFeeAud: string | null;
  intakePeriods: string | null;
  boardingAvailable: string | null;
  icseaScore: number | null;
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

function fromStrapi(record: StrapiSchool): ComparisonSchool {
  const logoUrl = mediaUrl(record.logo);
  const coverUrl = mediaUrl(record.coverImage);
  return {
    documentId: record.documentId,
    slug: record.slug,
    name: record.name,
    suburb: record.suburb ?? '',
    state: record.state ?? '',
    sector: record.sector ?? '',
    schoolType: record.schoolType ?? '',
    annualFeeAud: record.annualFeeAud ?? '',
    intakePeriods: record.intakePeriods ?? '',
    boardingAvailable: record.boardingAvailable ?? '',
    icseaScore: record.icseaScore ?? null,
    photoUrl: logoUrl ?? coverUrl ?? generateSchoolPlaceholder(record.documentId),
    logoUrl,
    coverImageUrl: coverUrl,
  };
}

export async function getComparisonSchools(): Promise<ComparisonSchool[]> {
  try {
    const params = new URLSearchParams();
    params.set('pagination[pageSize]', '50');
    params.set('populate[logo][fields][0]', 'url');
    params.set('populate[coverImage][fields][0]', 'url');

    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${params.toString()}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) return [];
    const payload = (await response.json()) as StrapiResponse;
    const records = payload.data ?? [];

    // Filter for independent schools with fees and ICSEA
    const candidates = records
      .filter((s) => {
        const hasFee = parseFeeAud(s.annualFeeAud ?? '');
        const isIndependent = (s.sector ?? '').toLowerCase() === 'independent';
        return isIndependent && hasFee && s.icseaScore != null;
      })
      .sort((a, b) => (b.icseaScore ?? 0) - (a.icseaScore ?? 0));

    // Pick top 3 from different states
    const picked: StrapiSchool[] = [];
    const seenStates = new Set<string>();
    for (const s of candidates) {
      if (!s.state || seenStates.has(s.state)) continue;
      seenStates.add(s.state);
      picked.push(s);
      if (picked.length === 3) break;
    }

    return picked.map(fromStrapi);
  } catch {
    return [];
  }
}

export function boardingBedsForSchool(school: { slug: string }): number {
  const seed = Array.from(school.slug).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );
  return 280 + (seed % 60);
}
