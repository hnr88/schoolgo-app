import type { ReactNode } from 'react';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader activePortal='parent' variant='dark' />
      <main id='main-content'>{children}</main>
      <MarketingFooter activePortal='parent' />
    </>
  );
}
