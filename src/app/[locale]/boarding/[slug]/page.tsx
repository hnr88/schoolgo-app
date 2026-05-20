import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('boarding');

export const generateMetadata = createContentSectionGenerateMetadata('boarding');

export default createContentSectionPage('boarding');
