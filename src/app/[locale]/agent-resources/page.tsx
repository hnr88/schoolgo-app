import {
  createContentStaticGenerateMetadata,
  createContentStaticPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentStaticGenerateMetadata('agent-resources');

export default createContentStaticPage('agent-resources');
