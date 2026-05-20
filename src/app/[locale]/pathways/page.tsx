import {
  createContentSectionIndexGenerateMetadata,
  createContentSectionIndexPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentSectionIndexGenerateMetadata('pathways');

export default createContentSectionIndexPage('pathways');
