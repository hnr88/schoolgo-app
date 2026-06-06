import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const UPSTREAM_URL = `${env.NEXT_PUBLIC_API_URL}/api/auth/student/me`;

function getBearerAuth(request: NextRequest): string | null {
  const header = request.headers.get('authorization') ?? request.headers.get('Authorization');
  if (!header) return null;
  if (!header.toLowerCase().startsWith('bearer ')) return null;
  const token = header.slice(7).trim();
  if (token.length === 0) return null;
  return header;
}

export async function GET(request: NextRequest) {
  const auth = getBearerAuth(request);
  if (!auth) {
    return NextResponse.json(
      { data: null, error: { status: 401, name: 'UnauthorizedError', message: 'Student token is required' } },
      { status: 401 },
    );
  }

  const limit = rateLimit(request, 'student-me', { capacity: 60, refillPerSecond: 2 });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      method: 'GET',
      headers: { Authorization: auth },
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

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    console.error('[GET /api/auth/student/me] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Student authentication service unavailable' } },
      { status: 502 },
    );
  }
}
