import { ContentPageBlocksRenderer, getDesignForContentPage } from '@/modules/content-blocks';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

export function ContentPageView({ page }: { page: ContentPage }) {
  const design = getDesignForContentPage(page);

  return <ContentPageBlocksRenderer page={page} design={design} />;
}
