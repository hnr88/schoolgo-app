import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('student-life');

export const generateMetadata = createContentSectionGenerateMetadata('student-life');

export default createContentSectionPage('student-life');
