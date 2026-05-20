import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { ContentDirectoryCard } from '@/modules/content-pages/components/ContentDirectoryCard';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

interface ContentDirectoryGridProps {
  title: string;
  description: string;
  pages: ContentPage[];
  getPageHref?: (page: ContentPage) => string;
}

export function ContentDirectoryGrid({
  title,
  description,
  pages,
  getPageHref,
}: ContentDirectoryGridProps) {
  return (
    <section id='directory' className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader eyebrow='Directory' heading={title} subheading={description} />
        <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {pages.map((page) => (
            <ContentDirectoryCard key={page.slug} page={page} getPageHref={getPageHref} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
