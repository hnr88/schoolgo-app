import type { ReactNode } from 'react';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader activePortal="parent" />
      <main>{children}</main>
      <MarketingFooter activePortal="parent" />
    </>
  );
}
