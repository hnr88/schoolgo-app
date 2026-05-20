import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import { getContentHref } from '@/modules/content-pages';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function RelatedPagesBlock({
  relatedPages = [],
  getPageHref = getContentHref,
}: ContentBlockProps) {
  if (relatedPages.length === 0) return null;
  return (
    <BlockShell id='related' eyebrow='Related' title='Continue with nearby pages' description='Related page cards give every design a natural next click.' tone='muted'>
      <div className='grid gap-5 md:grid-cols-3'>
        {relatedPages.map((page) => (
          <Link key={page.slug} href={getPageHref(page)} className='group overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-3'>
            <span className='relative block aspect-video bg-muted'>
              <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform group-hover:scale-105' />
            </span>
            <span className='block p-5'>
              <span className='text-xs font-semibold uppercase text-primary'>{page.eyebrow}</span>
              <span className='mt-3 block text-lg font-semibold text-ink-900'>{page.title}</span>
              <span className='mt-2 line-clamp-3 text-sm leading-6 text-foggy'>{page.subtitle}</span>
              <span className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary'>View page <ArrowRight className='h-4 w-4 group-hover:translate-x-1' aria-hidden='true' /></span>
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
