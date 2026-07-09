import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { env } from './src/lib/env';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Derive the local backend's uploads host from the configured API URL so media
// works on whatever port the backend runs on (1337 by default, but configurable),
// instead of a hardcoded port.
const apiUrl = new URL(env.NEXT_PUBLIC_API_URL);
const isLocalApi = apiUrl.hostname === 'localhost' || apiUrl.hostname === '127.0.0.1';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    '192.168.68.55',
    '*.local',
    'agent.localhost',
    'school.localhost',
  ],
  images: {
    // Next 16's optimizer refuses upstreams that resolve to private/loopback IPs
    // (SSRF protection). When the configured backend IS local (dev/e2e against
    // localhost:1337), allow it so real student/school media optimizes through the
    // real backend. In production NEXT_PUBLIC_API_URL is a public host, so this
    // stays false and the SSRF guard remains active.
    dangerouslyAllowLocalIP: isLocalApi,
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'staging-api.schoolgo.com.au', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'api.schoolgo.com.au', pathname: '/uploads/**' },
      ...(isLocalApi
        ? [
            {
              protocol: 'http' as const,
              hostname: apiUrl.hostname,
              port: apiUrl.port || '1337',
              pathname: '/uploads/**',
            },
          ]
        : []),
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        // Stale-HTML-after-deploy hardening: a browser reusing a previous build's
        // HTML document requests /_next/static chunks the new build no longer has
        // (a 404 on a healthy server). Forcing navigation documents to always
        // revalidate means a returning client refetches HTML that points at chunks
        // that currently exist. Scoped to text/html so hashed assets, next/image,
        // fonts, RSC and the API stay fully cacheable. (This is distinct from the
        // deploy-availability 502, which is addressed by the Dockerfile HEALTHCHECK
        // plus allowing old/new containers to overlap.)
        source: '/:path*',
        has: [{ type: 'header', key: 'accept', value: '(.*text/html.*)' }],
        headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
