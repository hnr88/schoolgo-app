import {
  createContentStaticGenerateMetadata,
  createContentStaticPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentStaticGenerateMetadata('request-info');

export default createContentStaticPage('request-info');
