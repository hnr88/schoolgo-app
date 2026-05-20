import { FileText } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ResourceRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Resources' title='Linked resource rows' description='This is a reusable row list for brochures, forms, category hubs, and tools.'>
      <div className='grid gap-4'>
        {page.resources.map((resource) => (
          <Link key={resource.href} href={resource.href} className='flex flex-col gap-4 rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3 md:flex-row md:items-start'>
            <FileText className='h-5 w-5 text-primary' aria-hidden='true' />
            <span>
              <span className='block font-semibold text-ink-900'>{resource.title}</span>
              <span className='mt-1 block text-sm leading-6 text-foggy'>{resource.description}</span>
            </span>
            <span className='text-sm font-semibold text-primary md:ml-auto'>{resource.meta}</span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
