import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { searchRequestSchema } from '@/modules/school-search/schemas/search-request.schema';

const STRAPI_SEARCH_URL = `${env.STRAPI_API_URL}/api/search/schools`;

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
        Authorization: `Bearer ${env.STRAPI_JWT}`,
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

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Search service unavailable' } },
      { status: 502 },
    );
  }
}
