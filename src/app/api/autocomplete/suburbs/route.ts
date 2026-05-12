import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';
import { autocompleteSuburbsQuerySchema } from '@/modules/school-search/schemas/autocomplete-suburbs.schema';

export const dynamic = 'force-dynamic';

const UPSTREAM_URL = `${env.NEXT_PUBLIC_API_URL}/api/autocomplete/suburbs`;

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, 'autocomplete-suburbs', {
    capacity: 60,
    refillPerSecond: 4,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const params = request.nextUrl.searchParams;
  const parsed = autocompleteSuburbsQuerySchema.safeParse({
    q: params.get('q') ?? '',
    limit: params.get('limit') ?? undefined,
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

  const upstreamUrl = new URL(UPSTREAM_URL);
  upstreamUrl.searchParams.set('q', parsed.data.q);
  upstreamUrl.searchParams.set('limit', String(parsed.data.limit));

  try {
    const upstream = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const data: unknown = await upstream.json().catch(() => null);

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
    console.error('[GET /api/autocomplete/suburbs] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Autocomplete service unavailable' } },
      { status: 502 },
    );
  }
}
