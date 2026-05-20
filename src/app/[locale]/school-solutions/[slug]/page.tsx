import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('school-solutions');

export const generateMetadata = createContentSectionGenerateMetadata('school-solutions');

export default createContentSectionPage('school-solutions');
