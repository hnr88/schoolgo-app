import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const STRAPI_SEARCH_URL = `${env.NEXT_PUBLIC_API_URL}/api/search/agents`;
const STRAPI_BASE = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');

const searchAgentsRequestSchema = z.object({
  q: z.string().max(200).optional(),
  countriesServed: z.array(z.string().max(100)).max(50).optional(),
  languages: z.array(z.string().max(100)).max(50).optional(),
  services: z.array(z.string().max(100)).max(50).optional(),
  verifiedOnly: z.boolean().optional(),
  sortBy: z
    .enum(['relevance', 'experience', 'name_asc', 'name_desc', 'recently_verified'])
    .optional(),
  page: z.number().int().min(1).max(10000).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

function resolveMediaUrl(url: unknown): string | null {
  if (typeof url !== 'string' || url.length === 0) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

function resolveHitMedia(hit: unknown): unknown {
  if (!hit || typeof hit !== 'object') return hit;
  const h = hit as Record<string, unknown>;
  return { ...h, photoUrl: resolveMediaUrl(h.photoUrl) };
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, 'search-agents', { capacity: 60, refillPerSecond: 2 });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const authorization = request.headers.get('authorization');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 400, message: 'Invalid JSON body' } },
      { status: 400 },
    );
  }

  const parsed = searchAgentsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        data: null,
        error: {
          status: 400,
          message: parsed.error.flatten().formErrors[0] ?? 'Invalid request body',
        },
      },
      { status: 400 },
    );
  }

  return proxyToStrapi(parsed.data, authorization);
}

async function proxyToStrapi(
  parsedData: unknown,
  authorization: string | null,
): Promise<NextResponse> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authorization) headers.Authorization = authorization;
    const upstream = await fetch(STRAPI_SEARCH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(parsedData),
    });

    const data: unknown = await upstream.json();

    if (!upstream.ok) {
      const errData = data as Record<string, unknown> | null;
      return NextResponse.json(
        {
          data: null,
          error: (errData?.error as Record<string, unknown>) ?? {
            status: upstream.status,
            message: 'Upstream error',
          },
        },
        { status: upstream.status },
      );
    }

    const responseData = data as Record<string, unknown> | null;
    if (
      responseData?.data &&
      typeof responseData.data === 'object' &&
      responseData.data !== null
    ) {
      const inner = responseData.data as Record<string, unknown>;
      if (Array.isArray(inner.hits)) {
        inner.hits = inner.hits.map(resolveHitMedia);
      }
    }

    return NextResponse.json(data);
  } catch {
    console.error('[POST /api/search/agents] Proxy to Strapi failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Search service unavailable' } },
      { status: 502 },
    );
  }
}
