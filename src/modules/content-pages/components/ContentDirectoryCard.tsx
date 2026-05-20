import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { getContentStaticPageHref } from '@/modules/content-pages/lib/content-static-routes';
import type { ContentDirectoryCardProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentDirectoryCard({
  page,
  getPageHref = getContentStaticPageHref,
}: ContentDirectoryCardProps) {
  return (
    <Link
      href={getPageHref(page)}
      className='group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 transition-transform duration-300 hover:-translate-y-1 hover:shadow-3'
    >
      <span className='relative block aspect-video bg-muted'>
        <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform duration-300 group-hover:scale-105' />
        <span className='absolute left-4 top-4 flex flex-wrap gap-2'>
          <StatusBadge tone='brand'>{page.type}</StatusBadge>
          <StatusBadge tone='muted'>{page.audience}</StatusBadge>
        </span>
      </span>
      <span className='flex flex-1 flex-col p-5'>
        <span className='text-xs font-semibold uppercase text-rausch-700'>{page.eyebrow}</span>
        <span className='mt-3 text-lg font-semibold leading-snug text-ink-900'>{page.title}</span>
        <span className='mt-2 line-clamp-3 text-sm leading-6 text-foggy'>{page.subtitle}</span>
        <span className='mt-4 rounded-lg bg-muted p-3 text-xs leading-5 text-foggy'>
          {page.aiSummary.answer}
        </span>
        <span className='mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-rausch-700'>
          View page
          <ArrowRight className='h-4 w-4 group-hover:translate-x-1' aria-hidden='true' />
        </span>
      </span>
    </Link>
  );
}
