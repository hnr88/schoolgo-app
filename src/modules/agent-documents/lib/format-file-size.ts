import { env } from '@/lib/env';

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function toAbsoluteFileUrl(url: string): string {
  if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}
