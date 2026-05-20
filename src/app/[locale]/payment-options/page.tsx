import {
  createContentStaticGenerateMetadata,
  createContentStaticPage,
} from '@/modules/content-pages';

export const generateMetadata = createContentStaticGenerateMetadata('payment-options');

export default createContentStaticPage('payment-options');
