import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import {
  searchRequestSchema,
  typedSearchRequestSchema,
} from '@/modules/school-search/schemas/search-request.schema';
import { filterDefaultMockHits } from '@/modules/school-search/lib/filter-mock-hits';

export const dynamic = 'force-dynamic';

const STRAPI_SEARCH_URL = `${env.NEXT_PUBLIC_API_URL}/api/search/schools`;
const STRAPI_BASE = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');

function resolveMediaUrl(url: unknown): string | null {
  if (typeof url !== 'string' || url.length === 0) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

function resolveHitMedia(hit: unknown): unknown {
  if (!hit || typeof hit !== 'object') return hit;
  const h = hit as Record<string, unknown>;
  return { ...h, logoUrl: resolveMediaUrl(h.logoUrl) };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 400, message: 'Invalid JSON body' } },
      { status: 400 },
    );
  }

  const isLegacyShape =
    body !== null &&
    typeof body === 'object' &&
    ('filters' in body ||
      'location' in body ||
      'matchingStrategy' in body ||
      'facets' in body ||
      'allOf' in body ||
      'anyOf' in body ||
      'noneOf' in body ||
      'query' in body);

  if (isLegacyShape) {
    const legacyParsed = searchRequestSchema.safeParse(body);
    if (!legacyParsed.success) {
      return NextResponse.json(
        {
          data: null,
          error: {
            status: 400,
            message: legacyParsed.error.flatten().formErrors[0] ?? 'Invalid request body',
          },
        },
        { status: 400 },
      );
    }
    return proxyToStrapi(legacyParsed.data);
  }

  const typedParsed = typedSearchRequestSchema.safeParse(body);
  if (!typedParsed.success) {
    return NextResponse.json(
      {
        data: null,
        error: {
          status: 400,
          message: typedParsed.error.flatten().formErrors[0] ?? 'Invalid request body',
        },
      },
      { status: 400 },
    );
  }

  if (env.SEARCH_BACKEND_MODE === 'proxy') {
    return proxyToStrapi(typedParsed.data);
  }

  const envelope = filterDefaultMockHits(typedParsed.data);
  return NextResponse.json({
    data: {
      hits: envelope.hits,
      total: envelope.total,
      page: envelope.page,
      pageSize: envelope.pageSize,
    },
    error: null,
  });
}

async function proxyToStrapi(parsedData: unknown): Promise<NextResponse> {
  try {
    const upstream = await fetch(STRAPI_SEARCH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    console.error('[POST /api/search/schools] Proxy to Strapi failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Search service unavailable' } },
      { status: 502 },
    );
  }
}
