import { ContentPageBlocksRenderer, getDesignForContentPage } from '@/modules/content-blocks';
import { ContentPageStructuredData } from '@/modules/content-pages/components/ContentPageStructuredData';
import type { ContentPageViewProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentPageView({
  page,
  getPageHref,
  getCategoryHref,
  sectionLabel,
}: ContentPageViewProps) {
  const design = getDesignForContentPage(page);

  return (
    <>
      <ContentPageStructuredData
        page={page}
        getPageHref={getPageHref}
        getCategoryHref={getCategoryHref}
        contentBlocks={design.blocks}
        designName={design.name}
      />
      <ContentPageBlocksRenderer
        page={page}
        design={design}
        getPageHref={getPageHref}
        getCategoryHref={getCategoryHref}
        sectionLabel={sectionLabel}
      />
    </>
  );
}
