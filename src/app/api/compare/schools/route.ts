import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';
import { compareSchoolsQuerySchema } from '@/modules/school-search/schemas/compare-schools.schema';

export const dynamic = 'force-dynamic';

const STRAPI_COMPARE_URL = `${env.NEXT_PUBLIC_API_URL}/api/compare/schools`;

export async function GET(request: NextRequest) {
  const limit = rateLimit(request, 'compare-schools', { capacity: 30, refillPerSecond: 2 });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const idsParam = request.nextUrl.searchParams.get('ids');
  const parsed = compareSchoolsQuerySchema.safeParse({ ids: idsParam ?? '' });
  if (!parsed.success) {
    return NextResponse.json(
      {
        data: null,
        error: {
          status: 400,
          message: parsed.error.flatten().fieldErrors.ids?.[0] ?? 'Invalid ids parameter',
        },
      },
      { status: 400 },
    );
  }

  const ids = parsed.data.ids;
  const url = `${STRAPI_COMPARE_URL}?ids=${encodeURIComponent(ids.join(','))}`;

  try {
    const upstream = await fetch(url, { method: 'GET' });
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
    console.error('[GET /api/compare/schools] Proxy to Strapi failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Compare service unavailable' } },
      { status: 502 },
    );
  }
}
