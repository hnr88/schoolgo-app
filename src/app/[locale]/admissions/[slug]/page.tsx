import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('admissions');

export const generateMetadata = createContentSectionGenerateMetadata('admissions');

export default createContentSectionPage('admissions');
