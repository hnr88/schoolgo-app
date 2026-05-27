import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { env } from './src/lib/env';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
    dangerouslyAllowLocalIP:
      env.NEXT_PUBLIC_API_URL.includes('localhost') ||
      env.NEXT_PUBLIC_API_URL.includes('127.0.0.1'),
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'staging-api.schoolgo.com.au', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'api.schoolgo.com.au', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
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
};

export default withNextIntl(nextConfig);
