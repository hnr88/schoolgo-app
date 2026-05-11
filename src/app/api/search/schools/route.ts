import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { searchRequestSchema } from '@/modules/school-search/schemas/search-request.schema';

const STRAPI_SEARCH_URL = `${env.STRAPI_API_URL}/api/search/schools`;
const STRAPI_BASE = env.STRAPI_API_URL.replace(/\/+$/, '');

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

  const parsed = searchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: parsed.error.issues[0].message } },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(STRAPI_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(
        { data: null, error: data.error ?? { status: upstream.status, message: 'Upstream error' } },
        { status: upstream.status },
      );
    }

    if (data?.data?.hits && Array.isArray(data.data.hits)) {
      data.data.hits = data.data.hits.map(resolveHitMedia);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Search service unavailable' } },
      { status: 502 },
    );
  }
}
