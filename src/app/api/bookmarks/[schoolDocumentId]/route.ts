import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ schoolDocumentId: string }> },
) {
  const { schoolDocumentId } = await params;

  if (!/^[a-z0-9]{1,32}$/i.test(schoolDocumentId)) {
    return NextResponse.json(
      { data: null, error: { status: 400, message: 'Invalid schoolDocumentId' } },
      { status: 400 },
    );
  }

  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json(
      { data: null, error: { status: 401, message: 'Unauthorized' } },
      { status: 401 },
    );
  }

  const limit = rateLimit(request, 'bookmarks-delete', {
    capacity: 60,
    refillPerSecond: 2,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { data: null, error: { status: 429, message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  try {
    const upstream = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/bookmarks/${schoolDocumentId}`,
      {
        method: 'DELETE',
        headers: { Authorization: auth },
      },
    );

    if (upstream.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    if (!upstream.ok) {
      let errBody: unknown = null;
      try {
        errBody = await upstream.json();
      } catch {
        errBody = null;
      }
      const err =
        (errBody as { error?: { status: number; message: string } } | null)?.error ?? {
          status: upstream.status,
          message: 'Upstream error',
        };
      return NextResponse.json({ data: null, error: err }, { status: upstream.status });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { data: null, error: { status: 502, message: 'Bookmark service unavailable' } },
      { status: 502 },
    );
  }
}
