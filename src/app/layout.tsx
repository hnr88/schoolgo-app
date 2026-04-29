import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { robotsPolicy, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: robotsPolicy,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
