import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentLinkPanelProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentLinkPanel({ links }: ContentLinkPanelProps) {
  return (
    <section id='links' className='bg-muted py-16 md:py-20'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Linked journey'
          heading='Move between page examples'
          subheading='These links make the pages feel like a connected content system rather than isolated mockups.'
        />
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='group flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 text-sm font-semibold text-ink-900 no-underline shadow-1 hover:shadow-3'
            >
              {link.label}
              <ArrowRight className='h-4 w-4 text-rausch-700 group-hover:translate-x-1' aria-hidden='true' />
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
