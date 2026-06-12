import 'server-only';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';

export interface FeaturedAgent {
  documentId: string;
  slug: string | null;
  name: string;
  photoUrl: string | null;
  headline: string | null;
  countriesServed: string[];
  yearsExperience: number | null;
  verified: boolean;
  partnerSchoolsCount: number;
}

interface AgentApiRecord {
  documentId: string;
  slug?: string | null;
  name: string;
  photoUrl?: string | null;
  headline?: string | null;
  countriesServed?: string[] | null;
  yearsExperience?: number | null;
  verified?: boolean | null;
  partnerSchoolsCount?: number | null;
}

interface AgentApiResponse {
  data?: AgentApiRecord[];
}

function absolutize(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

function fromRecord(record: AgentApiRecord): FeaturedAgent {
  return {
    documentId: record.documentId,
    slug: record.slug ?? null,
    name: record.name,
    photoUrl: absolutize(record.photoUrl),
    headline: record.headline ?? null,
    countriesServed: record.countriesServed ?? [],
    yearsExperience: record.yearsExperience ?? null,
    verified: record.verified ?? false,
    partnerSchoolsCount: record.partnerSchoolsCount ?? 0,
  };
}

export async function getFeaturedAgents(): Promise<FeaturedAgent[]> {
  try {
    const { data: payload } = await publicApi.get<AgentApiResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/agents/featured`,
    );
    return (payload.data ?? []).map(fromRecord);
  } catch {
    return [];
  }
}
