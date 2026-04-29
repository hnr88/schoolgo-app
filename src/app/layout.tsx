import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { robotsPolicy, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: robotsPolicy,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logos/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logos/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logos/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
