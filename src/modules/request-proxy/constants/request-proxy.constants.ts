import { env } from '@/lib/env';

export const LAUNCHING_SOON = env.NEXT_PUBLIC_LAUNCHING_SOON === 'true';

export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://staging-api.schoolgo.com.au https://api.schoolgo.com.au https://*.schoolgo.com.au https://*.tile.openstreetmap.org",
    "font-src 'self' data:",
    "connect-src 'self' https://staging-api.schoolgo.com.au https://api.schoolgo.com.au https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

export const COUNTRY_TO_LOCALE: Record<string, string> = {
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  KR: 'ko',
  MY: 'ms',
  SG: 'ms',
  VN: 'vi',
  TH: 'th',
};

export const PUBLIC_CONTENT_PREFIXES = [
  'admissions',
  'fees',
  'international',
  'curriculum',
  'student-life',
  'boarding',
  'partners',
  'school-solutions',
  'events',
  'pathways',
  'company',
  'school-search',
] as const;
