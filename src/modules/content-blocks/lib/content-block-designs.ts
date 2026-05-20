import {
  contentPageDesigns,
  contentPageDesignSlugs,
} from '@/modules/content-blocks/constants/content-block-designs.constants';
import { contentPages, type ContentPage } from '@/modules/content-pages';

export { contentPageDesigns, contentPageDesignSlugs };

export function getContentPageDesign(slug: string) {
  return contentPageDesigns.find((design) => design.slug === slug);
}

export function getDesignForContentPage(page: ContentPage) {
  const index = contentPages.findIndex((item) => item.slug === page.slug);
  return contentPageDesigns[index >= 0 ? index % contentPageDesigns.length : 0];
}
