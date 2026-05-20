import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentTimelineProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentTimeline({ items }: ContentTimelineProps) {
  return (
    <section id='timeline' className='bg-muted py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Timeline'
          heading='How this page can guide a decision'
          subheading='A compact timeline works well for admissions, event, policy, and onboarding pages.'
        />
        <ol className='mt-8 grid gap-4 md:grid-cols-3'>
          {items.map((item) => (
            <li key={item.title} className='rounded-lg border border-border bg-card p-6 shadow-1'>
              <p className='text-sm font-semibold text-rausch-700'>{item.date}</p>
              <h3 className='mt-3 text-lg font-semibold text-ink-900'>{item.title}</h3>
              <p className='mt-2 text-sm leading-6 text-foggy'>{item.description}</p>
              {item.href && (
                <Link href={item.href} className='mt-4 inline-flex text-sm font-semibold text-rausch-700'>
                  View linked page
                </Link>
              )}
            </li>
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}
