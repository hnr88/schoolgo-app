import { env } from '@/lib/env';

export function formatVaultFileSize(sizeKb: number): string {
  if (sizeKb < 1) return `${Math.round(sizeKb * 1024)} B`;
  if (sizeKb < 1024) return `${sizeKb.toFixed(1)} KB`;
  return `${(sizeKb / 1024).toFixed(1)} MB`;
}

export function toAbsoluteVaultUrl(url: string): string {
  if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}
