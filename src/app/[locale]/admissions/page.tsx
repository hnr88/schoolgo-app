import {
  createContentSectionIndexGenerateMetadata,
  createContentSectionIndexPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentSectionIndexGenerateMetadata('admissions');

export default createContentSectionIndexPage('admissions');
