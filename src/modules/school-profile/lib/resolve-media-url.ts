import { env } from '@/lib/env';

export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}
