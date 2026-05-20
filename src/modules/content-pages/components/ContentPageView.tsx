import { ContentPageBlocksRenderer, getDesignForContentPage } from '@/modules/content-blocks';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

interface ContentPageViewProps {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  sectionLabel?: string;
}

export function ContentPageView({
  page,
  getPageHref,
  getCategoryHref,
  sectionLabel,
}: ContentPageViewProps) {
  const design = getDesignForContentPage(page);

  return (
    <ContentPageBlocksRenderer
      page={page}
      design={design}
      getPageHref={getPageHref}
      getCategoryHref={getCategoryHref}
      sectionLabel={sectionLabel}
    />
  );
}
