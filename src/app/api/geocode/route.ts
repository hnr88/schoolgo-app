import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

const querySchema = z.object({
  q: z.string().trim().min(2).max(120),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    q: request.nextUrl.searchParams.get('q') ?? '',
  });

  if (!parsed.success) {
    return NextResponse.json({ results: [] });
  }

  try {
    const params = new URLSearchParams({
      q: parsed.data.q,
      format: 'json',
      countrycodes: 'au',
      limit: '1',
      addressdetails: '0',
    });

    const upstream = await fetch(`${NOMINATIM_URL}?${params}`, {
      headers: { 'User-Agent': 'SchoolGo/1.0 (schoolgo.com.au)' },
    });

    if (!upstream.ok) {
      return NextResponse.json({ results: [] });
    }

    const data: Array<{ lat: string; lng: string; lon: string; boundingbox: string[]; display_name: string }> =
      await upstream.json();

    const results = data.map((item) => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      boundingbox: item.boundingbox.map(Number) as [number, number, number, number],
      displayName: item.display_name,
    }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
