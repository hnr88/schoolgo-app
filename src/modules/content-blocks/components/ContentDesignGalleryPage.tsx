import { LayoutTemplate } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { contentPageDesigns } from '@/modules/content-blocks/lib/content-block-designs';

export function ContentDesignGalleryPage() {
  return (
    <>
      <section className='border-b border-divider bg-muted pt-28 md:pt-40'>
        <SectionContainer className='pb-12 md:pb-16'>
          <div className='flex items-center gap-2 text-primary'>
            <LayoutTemplate className='h-5 w-5' aria-hidden='true' />
            <span className='text-sm font-semibold uppercase'>Page designs</span>
          </div>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold text-ink-900 md:text-5xl'>
            {contentPageDesigns.length} page designs composed from the block module
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-foggy'>
            Each design chooses a different combination of reusable blocks, including enterprise operations layouts.
          </p>
        </SectionContainer>
      </section>
      <section className='bg-background py-14 md:py-20'>
        <SectionContainer>
          <SectionHeader
            eyebrow='Designs'
            heading='Composable page recipes'
            subheading='Open any design to see a real dummy page rendered from its block list.'
          />
          <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {contentPageDesigns.map((design) => (
              <Link
                key={design.slug}
                href={`/resources/designs/${design.slug}`}
                className='rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3'
              >
                <span className='text-xs font-semibold uppercase text-primary'>{design.useCase}</span>
                <h2 className='mt-2 text-lg font-semibold text-ink-900'>{design.name}</h2>
                <p className='mt-2 text-sm leading-6 text-foggy'>{design.description}</p>
                <p className='mt-4 text-sm font-semibold text-primary'>{design.blocks.length} blocks</p>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
