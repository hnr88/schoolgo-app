import Image from 'next/image';
import { CtaLink, SectionContainer } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function CtaBannerBlock({ page }: ContentBlockProps) {
  return (
    <section className='bg-background py-12'>
      <SectionContainer>
        <div className='relative overflow-hidden rounded-xl bg-ink-900 p-7 text-background shadow-4 md:flex md:items-center md:justify-between md:gap-8 md:p-10'>
          <Image src={page.image} alt='' fill sizes='100vw' className='object-cover opacity-35' aria-hidden='true' />
          <div className='absolute inset-0 bg-ink-900/65' />
          <div className='relative'>
            <p className='text-xs font-semibold uppercase text-background/60'>Next action</p>
            <h2 className='mt-3 text-3xl font-bold text-background'>{page.cta.title}</h2>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-background/70'>{page.cta.description}</p>
          </div>
          <CtaLink href={page.cta.primary.href} variant='secondary' className='relative mt-6 bg-background md:mt-0' arrow>
            {page.cta.primary.label}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
