import {
  createContentSectionIndexGenerateMetadata,
  createContentSectionIndexPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentSectionIndexGenerateMetadata('company');

export default createContentSectionIndexPage('company');
