import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { ContentPageView } from '@/modules/content-pages/components/ContentPageView';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

export function ContentStandalonePage({ page }: { page: ContentPage }) {
  return (
    <>
      <MarketingHeader activePortal='parent' />
      <main>
        <ContentPageView page={page} />
      </main>
      <MarketingFooter activePortal='parent' />
    </>
  );
}
