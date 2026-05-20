import {
  createContentSectionGenerateMetadata,
  createContentSectionGenerateStaticParams,
  createContentSectionPage,
} from '@/modules/content-pages';

export const generateStaticParams = createContentSectionGenerateStaticParams('events');

export const generateMetadata = createContentSectionGenerateMetadata('events');

export default createContentSectionPage('events');
