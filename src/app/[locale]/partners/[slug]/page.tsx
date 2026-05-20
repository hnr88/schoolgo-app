import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('partners');

export const generateMetadata = createContentSectionGenerateMetadata('partners');

export default createContentSectionPage('partners');
