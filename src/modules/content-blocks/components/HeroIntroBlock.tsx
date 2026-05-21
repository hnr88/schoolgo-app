import Image from 'next/image';
import { SectionContainer, CtaLink } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function HeroIntroBlock({ page, designLabel }: ContentBlockProps) {
  return (
    <section className='relative overflow-hidden border-b border-divider bg-ink-900 pt-20 text-background md:pt-28'>
      <Image src={page.image} alt='' fill priority sizes='100vw' className='object-cover opacity-45 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700' aria-hidden='true' />
      <div className='absolute inset-0 bg-ink-900/60' />
      <SectionContainer className='relative pb-12 md:pb-16'>
        <p className='text-sm font-semibold uppercase text-background/75'>
          {page.eyebrow} / {designLabel ?? 'SchoolGo content'}
        </p>
        <div className='mt-8 grid gap-8 lg:grid-cols-5 lg:items-end'>
          <div className='lg:col-span-3'>
            <h1 className='max-w-4xl text-4xl font-bold leading-display text-background md:text-6xl'>
              {page.title}
            </h1>
            <p className='mt-5 max-w-2xl text-lg leading-relaxed text-background/80'>{page.subtitle}</p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <CtaLink href={page.cta.primary.href} size='lg' arrow>
                {page.cta.primary.label}
              </CtaLink>
              <CtaLink href={page.cta.secondary.href} variant='secondary' size='lg'>
                {page.cta.secondary.label}
              </CtaLink>
            </div>
            <dl className='mt-8 grid gap-4 border-t border-background/20 pt-5 sm:grid-cols-3'>
              {page.searchSignals.slice(0, 3).map((signal) => (
                <div key={signal.label}>
                  <dt className='text-xs font-semibold uppercase text-background/60'>{signal.label}</dt>
                  <dd className='mt-1 text-sm font-semibold text-background'>{signal.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className='rounded-xl border border-background/20 bg-background/95 p-5 text-ink-900 shadow-4 lg:col-span-2'>
            <p className='text-sm font-semibold uppercase text-rausch-700'>Decision framework</p>
            <div className='mt-4 grid gap-1'>
              {page.decisionPoints.map((point) => (
                <div key={point.title} className='border-l border-divider py-3 pl-4'>
                  <p className='text-sm font-semibold text-ink-900'>{point.title}</p>
                  <p className='mt-1 text-xs font-semibold uppercase text-rausch-700'>{point.owner}</p>
                  <p className='mt-1 line-clamp-2 text-xs leading-5 text-hof'>{point.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
