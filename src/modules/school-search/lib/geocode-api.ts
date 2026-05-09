import { publicApi } from '@/lib/axios';

interface GeocodeResult {
  lat: number;
  lng: number;
  boundingbox: [number, number, number, number];
  displayName: string;
}

interface GeocodeResponse {
  results: GeocodeResult[];
}

export async function geocodeQuery(query: string): Promise<GeocodeResult | null> {
  if (query.trim().length < 2) return null;

  const { data } = await publicApi.get<GeocodeResponse>('/api/geocode', {
    params: { q: query },
  });

  return data.results[0] ?? null;
}
