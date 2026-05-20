import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('company');

export const generateMetadata = createContentSectionGenerateMetadata('company');

export default createContentSectionPage('company');
