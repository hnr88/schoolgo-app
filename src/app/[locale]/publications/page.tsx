import {
  createContentStaticGenerateMetadata,
  createContentStaticPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentStaticGenerateMetadata('publications');

export default createContentStaticPage('publications');
