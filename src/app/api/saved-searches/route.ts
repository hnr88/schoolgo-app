import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';
import { createSavedSearchSchema } from '@/modules/school-search/schemas/saved-searches.schema';

export const dynamic = 'force-dynamic';

const UPSTREAM_URL = `${env.NEXT_PUBLIC_API_URL}/api/saved-searches`;

function unauthorized(): NextResponse {
  return NextResponse.json(
    { data: null, error: { status: 401, message: 'Unauthorized' } },
    { status: 401 },
  );
}

function rateLimited(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { data: null, error: { status: 429, message: 'Too many requests' } },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  );
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return unauthorized();
  }

  const limit = rateLimit(request, 'saved-searches-post', { capacity: 30, refillPerSecond: 1 });
  if (!limit.ok) {
    return rateLimited(limit.retryAfterSeconds);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 400, message: 'Invalid JSON body' } },
      { status: 400 },
    );
  }

  const parsed = createSavedSearchSchema.safeParse(body);
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

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(parsed.data),
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

    return NextResponse.json(data);
  } catch {
    console.error('[POST /api/saved-searches] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Saved searches service unavailable' } },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return unauthorized();
  }

  const limit = rateLimit(request, 'saved-searches-get', { capacity: 60, refillPerSecond: 2 });
  if (!limit.ok) {
    return rateLimited(limit.retryAfterSeconds);
  }

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
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

    return NextResponse.json(data);
  } catch {
    console.error('[GET /api/saved-searches] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Saved searches service unavailable' } },
      { status: 502 },
    );
  }
}
