import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('fees');

export const generateMetadata = createContentSectionGenerateMetadata('fees');

export default createContentSectionPage('fees');
