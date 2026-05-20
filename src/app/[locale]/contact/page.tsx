import {
  createContentStaticGenerateMetadata,
  createContentStaticPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentStaticGenerateMetadata('contact');

export default createContentStaticPage('contact');
