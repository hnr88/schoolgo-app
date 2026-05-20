import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

export interface ContentPageMetadataInput {
  page: ContentPage;
  path: string;
  locale: string;
  type: 'article' | 'website';
}
