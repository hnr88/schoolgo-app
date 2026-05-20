import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { ContentPageView } from '@/modules/content-pages/components/ContentPageView';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

interface ContentStandalonePageProps {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  sectionLabel?: string;
}

export function ContentStandalonePage({
  page,
  getPageHref,
  getCategoryHref,
  sectionLabel,
}: ContentStandalonePageProps) {
  return (
    <>
      <MarketingHeader activePortal='parent' variant='dark' />
      <main id='main-content'>
        <ContentPageView
          page={page}
          getPageHref={getPageHref}
          getCategoryHref={getCategoryHref}
          sectionLabel={sectionLabel}
        />
      </main>
      <MarketingFooter activePortal='parent' />
    </>
  );
}
