import 'server-only';
import { NextRequest } from 'next/server';

interface Bucket {
  tokens: number;
  refilledAt: number;
}

const buckets = new Map<string, Bucket>();

function clientKey(request: NextRequest, route: string): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown';
  return `${route}:${ip}`;
}

export function rateLimit(
  request: NextRequest,
  route: string,
  options: { capacity: number; refillPerSecond: number },
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const key = clientKey(request, route);
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing) {
    buckets.set(key, { tokens: options.capacity - 1, refilledAt: now });
    return { ok: true };
  }

  const elapsedSec = (now - existing.refilledAt) / 1000;
  const refill = elapsedSec * options.refillPerSecond;
  const tokens = Math.min(options.capacity, existing.tokens + refill);

  if (tokens < 1) {
    const retryAfterSeconds = Math.ceil((1 - tokens) / options.refillPerSecond);
    existing.tokens = tokens;
    existing.refilledAt = now;
    return { ok: false, retryAfterSeconds };
  }

  existing.tokens = tokens - 1;
  existing.refilledAt = now;
  return { ok: true };
}
