import 'server-only';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';
import type { AgentHit } from '@/modules/agent-search/types/agent-search.types';

interface PublicAgentsResponse {
  data?: {
    hits?: AgentHit[];
    total?: number;
    page?: number;
    pageSize?: number;
  } | null;
}

export interface PublicAgentsInitial {
  hits: AgentHit[];
  total: number;
}

function absolutize(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

export async function getPublicAgentsInitial(pageSize = 24): Promise<PublicAgentsInitial> {
  try {
    const { data: payload } = await publicApi.get<PublicAgentsResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/agents/public`,
      { params: { page: 1, pageSize } },
    );
    const hits = (payload.data?.hits ?? []).map((hit) => ({
      ...hit,
      photoUrl: absolutize(hit.photoUrl),
    }));
    return { hits, total: payload.data?.total ?? hits.length };
  } catch {
    return { hits: [], total: 0 };
  }
}
