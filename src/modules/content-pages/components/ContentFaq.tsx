import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentFaqProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentFaq({ items }: ContentFaqProps) {
  return (
    <section id='faq' className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='FAQ'
          heading='Questions this page should answer'
          subheading='This simple FAQ pattern keeps policy, admissions, and support pages easy to scan.'
        />
        <div className='mt-8 divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
          {items.map((item) => (
            <details key={item.question} className='group p-5'>
              <summary className='cursor-pointer list-none text-base font-semibold text-ink-900'>
                {item.question}
              </summary>
              <p className='mt-3 text-sm leading-6 text-foggy'>{item.answer}</p>
            </details>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
