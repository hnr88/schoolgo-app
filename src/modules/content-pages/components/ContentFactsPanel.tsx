import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentFactsPanelProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentFactsPanel({ facts }: ContentFactsPanelProps) {
  return (
    <section id='key-facts' className='bg-background py-16 md:py-20'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Key facts'
          heading='What this page is designed to answer'
          subheading='A compact summary helps every page type feel scannable before the deeper sections begin.'
        />
        <dl className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {facts.map((fact) => (
            <div key={fact.label} className='rounded-lg border border-border bg-card p-5 shadow-1'>
              <dt className='text-xs font-semibold uppercase text-foggy'>
                {fact.label}
              </dt>
              <dd className='mt-2 text-sm font-semibold leading-6 text-ink-900'>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
