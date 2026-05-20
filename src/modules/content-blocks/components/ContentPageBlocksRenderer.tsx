import {
  getContentBlockDefinition,
} from '@/modules/content-blocks/lib/block-registry';
import type { ContentPageDesign } from '@/modules/content-blocks/types/content-blocks.types';
import {
  getContentPagesByCategory,
  getRelatedContentPages,
  type ContentPage,
} from '@/modules/content-pages';

interface ContentPageBlocksRendererProps {
  page: ContentPage;
  design: ContentPageDesign;
}

export function ContentPageBlocksRenderer({
  page,
  design,
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
          />
        );
      })}
    </>
  );
}
