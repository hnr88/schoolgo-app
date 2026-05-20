import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('international');

export const generateMetadata = createContentSectionGenerateMetadata('international');

export default createContentSectionPage('international');
