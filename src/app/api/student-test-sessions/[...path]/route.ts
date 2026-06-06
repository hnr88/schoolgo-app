import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const ALLOWED_SEGMENTS = new Set(['start', 'responses', 'submit', 'next-item']);

function getBearerAuth(request: NextRequest): string | null {
  const header = request.headers.get('authorization') ?? request.headers.get('Authorization');
  if (!header) return null;
  if (!header.toLowerCase().startsWith('bearer ')) return null;
  if (header.slice(7).trim().length === 0) return null;
  return header;
}

function isAllowedPath(segments: string[]): boolean {
  if (segments.length === 1) return segments[0].length > 0;
  if (segments.length === 2) return ALLOWED_SEGMENTS.has(segments[1]);
  return false;
}

async function proxy(
  request: NextRequest,
  segments: string[],
  method: 'GET' | 'POST',
): Promise<NextResponse> {
  if (!isAllowedPath(segments)) {
    return NextResponse.json(
      { data: null, error: { status: 404, name: 'NotFoundError', message: 'Unknown route' } },
      { status: 404 },
    );
  }

  const auth = getBearerAuth(request);
  if (!auth) {
    return NextResponse.json(
      { data: null, error: { status: 401, name: 'UnauthorizedError', message: 'Student token is required' } },
      { status: 401 },
    );
  }

  const limit = rateLimit(request, 'student-test-session', { capacity: 120, refillPerSecond: 4 });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, name: 'RateLimitError', message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const headers: Record<string, string> = { Authorization: auth };
  let body: string | undefined;
  if (method === 'POST') {
    headers['Content-Type'] = 'application/json';
    const text = await request.text();
    body = text.length > 0 ? text : '{}';
  }

  try {
    const upstream = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/student-test-sessions/${segments.join('/')}`, {
      method,
      headers,
      body,
    });
    const data: unknown = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      const errData = data as Record<string, unknown> | null;
      return NextResponse.json(
        {
          data: null,
          error: (errData?.error as Record<string, unknown>) ?? {
            status: upstream.status,
            name: 'UpstreamError',
            message: 'Upstream error',
          },
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    console.error('[/api/student-test-sessions] Proxy to upstream failed');
    return NextResponse.json(
      { data: null, error: { status: 502, name: 'UpstreamError', message: 'Test session service unavailable' } },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxy(request, path, 'POST');
}
