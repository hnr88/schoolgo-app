import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('school-search');

export const generateMetadata = createContentSectionGenerateMetadata('school-search');

export default createContentSectionPage('school-search');
