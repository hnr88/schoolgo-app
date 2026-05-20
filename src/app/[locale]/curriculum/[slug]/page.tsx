import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('curriculum');

export const generateMetadata = createContentSectionGenerateMetadata('curriculum');

export default createContentSectionPage('curriculum');
