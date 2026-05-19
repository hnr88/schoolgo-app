import { notFound } from 'next/navigation';
import { SectionContainer } from '@/modules/design-system';
import { ContentDirectoryGrid } from '@/modules/content-pages/components/ContentDirectoryGrid';
import {
  getContentCategory,
  getContentPagesByCategory,
} from '@/modules/content-pages/data/content-pages';

export function ContentCategoryPage({ categorySlug }: { categorySlug: string }) {
  const category = getContentCategory(categorySlug);
  if (!category) notFound();

  const pages = getContentPagesByCategory(categorySlug);

  return (
    <>
      <section className='border-b border-divider bg-muted pt-28 md:pt-40'>
        <SectionContainer className='pb-12 md:pb-16'>
          <p className='text-sm font-semibold uppercase text-primary'>Resource category</p>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            {category.label}
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
            {category.description}
          </p>
        </SectionContainer>
      </section>
      <ContentDirectoryGrid
        title={`${category.label} page examples`}
        description='Use these dummy pages to test multiple layouts and cross-page links within this category.'
        pages={pages}
      />
    </>
  );
}
