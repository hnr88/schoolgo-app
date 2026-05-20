import { ContentPageBlocksRenderer } from '@/modules/content-blocks/components/ContentPageBlocksRenderer';
import type { ContentPageDesign } from '@/modules/content-blocks/types/content-blocks.types';
import type { ContentPage } from '@/modules/content-pages';

interface ContentDesignPageViewProps {
  design: ContentPageDesign;
  page: ContentPage;
}

export function ContentDesignPageView({ design, page }: ContentDesignPageViewProps) {
  return <ContentPageBlocksRenderer page={page} design={design} />;
}
