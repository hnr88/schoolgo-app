import 'server-only';
import { cache } from 'react';
import { isAxiosError } from 'axios';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

interface AgentMedia {
  url?: string | null;
}

interface AgentPublicResponse {
  data?: AgentDetail | null;
}

/**
 * Absolutize a Strapi media URL (or pass through an external/full URL).
 * Used for the agent profile/cover photo which may be a media relation url or
 * a seedable external string already absolute.
 */
export function mediaUrl(media?: AgentMedia | string | null): string | null {
  const url = typeof media === 'string' ? media : media?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

/**
 * Fetch a public agent profile by slug.
 * - 404 (absent / unverified / unpublished) → `null` (page calls notFound()).
 * - Any other failure (5xx, network) → throws so error.tsx surfaces it.
 */
export const getAgentBySlug = cache(async function getAgentBySlug(
  slug: string,
): Promise<AgentDetail | null> {
  try {
    const { data: payload } = await publicApi.get<AgentPublicResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/agents/public/${encodeURIComponent(slug)}`,
    );
    return payload.data ?? null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
});
