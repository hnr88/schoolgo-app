import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';
import { autocompleteSchoolsQuerySchema } from '@/modules/school-search/schemas/autocomplete-schools.schema';

export const dynamic = 'force-dynamic';

const STRAPI_AUTOCOMPLETE_URL = `${env.NEXT_PUBLIC_API_URL}/api/autocomplete/schools`;

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, 'autocomplete-schools', {
    capacity: 60,
    refillPerSecond: 4,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const parsed = autocompleteSchoolsQuerySchema.safeParse({
    q: searchParams.get('q') ?? '',
    limit: searchParams.get('limit') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        data: null,
        error: {
          status: 400,
          message: parsed.error.flatten().formErrors[0] ?? 'Invalid query parameters',
        },
      },
      { status: 400 },
    );
  }

  const upstreamUrl = new URL(STRAPI_AUTOCOMPLETE_URL);
  upstreamUrl.searchParams.set('q', parsed.data.q);
  upstreamUrl.searchParams.set('limit', String(parsed.data.limit));

  try {
    const upstream = await fetch(upstreamUrl.toString(), { method: 'GET' });
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

    return NextResponse.json(data);
  } catch {
    console.error('[GET /api/autocomplete/schools] Proxy to Strapi failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Autocomplete service unavailable' } },
      { status: 502 },
    );
  }
}
