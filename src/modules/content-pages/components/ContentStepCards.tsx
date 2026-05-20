import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentStepCardsProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentStepCards({ steps }: ContentStepCardsProps) {
  return (
    <section id='next-steps' className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Next steps'
          heading='A practical path through the page'
          subheading='Each step links forward so families, agents, or schools can keep moving.'
        />
        <div className='mt-8 grid gap-5 md:grid-cols-3'>
          {steps.map((step, index) => (
            <Link
              key={step.title}
              href={step.href ?? '/resources'}
              className='rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'
            >
              <span className='flex h-9 w-9 items-center justify-center rounded-pill bg-rausch-700 text-sm font-bold text-background'>
                {index + 1}
              </span>
              <span className='mt-5 block text-lg font-semibold text-ink-900'>{step.title}</span>
              <span className='mt-2 block text-sm leading-6 text-foggy'>{step.description}</span>
              <span className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rausch-700'>
                Continue
                <ArrowRight className='h-4 w-4' aria-hidden='true' />
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
