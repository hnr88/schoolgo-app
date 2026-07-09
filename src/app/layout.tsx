import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { ChunkErrorListener } from '@/modules/chunk-recovery';
import { robotsPolicy, siteUrl } from '@/modules/seo';

const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSans-Variable.ttf',
      style: 'normal',
      weight: '400 800',
    },
    {
      path: '../../public/fonts/GoogleSans-Italic-Variable.ttf',
      style: 'italic',
      weight: '400 800',
    },
  ],
  variable: '--font-google-sans',
  display: 'swap',
});

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
  return (
    <>
      <ChunkErrorListener />
      {children}
    </>
  );
}

export { googleSans };
