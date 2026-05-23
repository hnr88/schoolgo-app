import Image from 'next/image';
import { FileText } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ResourceRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Resources' title='Linked resource rows' description='This is a reusable row list for brochures, forms, category hubs, and tools.'>
      <div className='grid gap-5 lg:grid-cols-5'>
        <aside className='overflow-hidden rounded-xl border border-border bg-card shadow-2 lg:col-span-2'>
          <div className='relative aspect-video bg-muted lg:aspect-auto lg:h-full lg:min-h-96'>
            <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 1024px) 100vw, 40vw' className='object-cover' />
            <div className='absolute inset-0 bg-ink-900/25' />
            <div className='absolute inset-x-5 bottom-5'>
              <p className='text-xs font-semibold uppercase text-background/70'>Resource pack</p>
              <h3 className='mt-3 text-2xl font-bold text-background'>{page.title}</h3>
              <p className='mt-2 text-sm leading-6 text-background/80'>{page.subtitle}</p>
            </div>
          </div>
        </aside>
        <div className='grid gap-5 lg:col-span-3'>
          {page.resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className='group flex flex-col gap-4 rounded-lg border border-border bg-card p-5 no-underline shadow-1 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-3 md:flex-row md:items-start'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-rausch-700 group-hover:bg-rausch-700 group-hover:text-background'>
                <FileText className='h-5 w-5' aria-hidden='true' />
              </span>
              <span>
                <span className='block font-semibold text-ink-900'>{resource.title}</span>
                <span className='mt-1 block text-sm leading-6 text-foggy'>{resource.description}</span>
              </span>
              <span className='text-xs font-semibold uppercase text-foggy md:ml-auto'>{resource.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </BlockShell>
  );
}
