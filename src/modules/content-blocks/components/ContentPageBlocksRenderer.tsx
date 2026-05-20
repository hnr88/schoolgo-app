import {
  getContentBlockDefinition,
} from '@/modules/content-blocks/lib/block-registry';
import type { ContentPageDesign } from '@/modules/content-blocks/types/content-blocks.types';
import {
  getContentHref,
  getContentPagesByCategory,
  getRelatedContentPages,
  type ContentPage,
} from '@/modules/content-pages';

interface ContentPageBlocksRendererProps {
  page: ContentPage;
  design: ContentPageDesign;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  sectionLabel?: string;
}

export function ContentPageBlocksRenderer({
  page,
  design,
  getPageHref = getContentHref,
  getCategoryHref = (categorySlug) => `/resources/category/${categorySlug}`,
  sectionLabel,
}: ContentPageBlocksRendererProps) {
  const relatedPages = getRelatedContentPages(page);
  const categoryPages = getContentPagesByCategory(page.category).filter(
    (item) => item.slug !== page.slug,
  );

  return (
    <>
      {design.blocks.map((blockKey) => {
        const definition = getContentBlockDefinition(blockKey);
        const Block = definition.component;
        return (
          <Block
            key={blockKey}
            page={page}
            relatedPages={relatedPages}
            categoryPages={categoryPages}
            designLabel={design.name}
            getPageHref={getPageHref}
            getCategoryHref={getCategoryHref}
            sectionLabel={sectionLabel}
          />
        );
      })}
    </>
  );
}
