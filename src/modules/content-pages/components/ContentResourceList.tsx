import { FileText } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentResource } from '@/modules/content-pages/types/content-pages.types';

export function ContentResourceList({ resources }: { resources: ContentResource[] }) {
  return (
    <section id='resources' className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Resources'
          heading='Reusable resource list'
          subheading='Use this block for brochures, policy links, contact routes, guides, tools, or event materials.'
        />
        <div className='mt-8 grid gap-4'>
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className='flex flex-col gap-4 rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3 md:flex-row md:items-start'
            >
              <FileText className='h-5 w-5 text-primary' aria-hidden='true' />
              <span>
                <span className='block font-semibold text-ink-900'>{resource.title}</span>
                <span className='mt-1 block text-sm leading-6 text-foggy'>{resource.description}</span>
              </span>
              <span className='text-sm font-semibold text-primary md:ml-auto'>{resource.meta}</span>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
