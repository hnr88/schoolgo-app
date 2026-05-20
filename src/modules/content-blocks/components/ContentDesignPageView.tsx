import { ContentPageBlocksRenderer } from '@/modules/content-blocks/components/ContentPageBlocksRenderer';
import type { ContentDesignPageViewProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ContentDesignPageView({ design, page }: ContentDesignPageViewProps) {
  return <ContentPageBlocksRenderer page={page} design={design} />;
}
