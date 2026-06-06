import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const UPSTREAM_URL = `${env.NEXT_PUBLIC_API_URL}/api/auth/student/magic-link/verify`;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token || token.trim().length === 0) {
    return NextResponse.json(
      { data: null, error: { status: 400, name: 'ValidationError', message: 'Token is required' } },
      { status: 400 },
    );
  }

  const limit = rateLimit(request, 'student-magic-link-verify', {
    capacity: 20,
    refillPerSecond: 1,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const upstreamUrl = new URL(UPSTREAM_URL);
  upstreamUrl.searchParams.set('token', token.trim());

  try {
    const upstream = await fetch(upstreamUrl, { method: 'GET' });
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

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    console.error('[GET /api/auth/student/magic-link/verify] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Student authentication service unavailable' } },
      { status: 502 },
    );
  }
}
