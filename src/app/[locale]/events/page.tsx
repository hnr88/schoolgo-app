import {
  createContentSectionIndexGenerateMetadata,
  createContentSectionIndexPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentSectionIndexGenerateMetadata('events');

export default createContentSectionIndexPage('events');
