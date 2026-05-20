import { Layers3 } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { contentBlockDefinitions } from '@/modules/content-blocks/lib/block-registry';
import { getContentPage } from '@/modules/content-pages';
import { getDesignForContentPage } from '@/modules/content-blocks/lib/content-block-designs';
import { ContentPageBlocksRenderer } from '@/modules/content-blocks/components/ContentPageBlocksRenderer';

export function ContentBlocksGalleryPage() {
  const page = getContentPage('admissions-hub-australian-schools');
  if (!page) return null;
  const design = getDesignForContentPage(page);

  return (
    <>
      <section className='border-b border-divider bg-muted pt-28 md:pt-40'>
        <SectionContainer className='pb-12 md:pb-16'>
          <div className='flex items-center gap-2 text-primary'>
            <Layers3 className='h-5 w-5' aria-hidden='true' />
            <span className='text-sm font-semibold uppercase'>Block library</span>
          </div>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            24 reusable SchoolGo content blocks
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
            These are the small React modules used to compose the resource page designs.
          </p>
        </SectionContainer>
      </section>
      <section className='bg-background py-14'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Inventory'
            heading='Reusable block components'
            subheading='Each block has a key, description, and component file inside the content-blocks module.'
          />
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {contentBlockDefinitions.map((block) => (
              <div key={block.key} className='rounded-lg border border-border bg-card p-5 shadow-1'>
                <p className='text-xs font-semibold uppercase text-primary'>{block.key}</p>
                <h2 className='mt-2 text-lg font-semibold text-ink-900'>{block.name}</h2>
                <p className='mt-2 text-sm leading-6 text-foggy'>{block.description}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>
      <section className='border-t border-divider bg-muted py-14'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Example assembly'
            heading='One page assembled from selected blocks'
            subheading='The same page data can be recomposed with different block arrays.'
          />
        </SectionContainer>
      </section>
      <ContentPageBlocksRenderer page={page} design={design} />
    </>
  );
}
