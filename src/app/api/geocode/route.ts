import { NextRequest, NextResponse } from 'next/server';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const params = new URLSearchParams({
      q: q.trim(),
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
