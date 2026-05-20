import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('pathways');

export const generateMetadata = createContentSectionGenerateMetadata('pathways');

export default createContentSectionPage('pathways');
