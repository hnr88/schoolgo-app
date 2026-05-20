import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getContentHref } from '@/modules/content-pages';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ProgramCardsBlock({
  categoryPages = [],
  getPageHref = getContentHref,
}: ContentBlockProps) {
  const pages = categoryPages.slice(0, 3);
  if (pages.length === 0) return null;
  return (
    <BlockShell eyebrow='Programs' title='Program cards' description='Reusable cards for school levels, curriculum pathways, support services, or specialist programs.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {pages.map((page) => (
          <Link key={page.slug} href={getPageHref(page)} className='overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 hover:shadow-3'>
            <span className='relative block aspect-video bg-muted'>
              <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' />
            </span>
            <span className='block p-6'>
              <BookOpen className='h-5 w-5 text-primary' aria-hidden='true' />
              <span className='mt-5 block text-lg font-semibold text-ink-900'>{page.title}</span>
              <span className='mt-2 line-clamp-3 text-sm leading-6 text-foggy'>{page.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
