import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { ContentDirectoryCard } from '@/modules/content-pages/components/ContentDirectoryCard';
import type { ContentRelatedPagesProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentRelatedPages({ pages }: ContentRelatedPagesProps) {
  if (pages.length === 0) return null;

  return (
    <section id='related' className='bg-muted py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Related'
          heading='Continue with nearby pages'
          subheading='Related pages keep the content graph visible and give every detail page a natural next click.'
        />
        <div className='mt-8 grid gap-5 md:grid-cols-3'>
          {pages.map((page) => (
            <ContentDirectoryCard key={page.slug} page={page} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
