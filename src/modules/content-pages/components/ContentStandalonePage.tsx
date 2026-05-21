import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { ContentPageView } from '@/modules/content-pages/components/ContentPageView';
import type { ContentStandalonePageProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentStandalonePage({
  page,
  getPageHref,
  getCategoryHref,
  sectionLabel,
}: ContentStandalonePageProps) {
  return (
    <>
      <MarketingHeader activePortal='parent' />
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
