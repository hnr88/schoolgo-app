import {
  createContentSectionIndexGenerateMetadata,
  createContentSectionIndexPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentSectionIndexGenerateMetadata('curriculum');

export default createContentSectionIndexPage('curriculum');
