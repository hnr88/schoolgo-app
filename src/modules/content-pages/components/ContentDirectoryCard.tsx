import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';
import { getContentHref } from '@/modules/content-pages/data/content-pages';

export function ContentDirectoryCard({ page }: { page: ContentPage }) {
  return (
    <Link
      href={getContentHref(page)}
      className='group flex h-full flex-col rounded-lg border border-border bg-card p-5 no-underline shadow-1 hover:shadow-3'
    >
      <span className='text-xs font-semibold uppercase text-primary'>{page.eyebrow}</span>
      <span className='mt-3 text-lg font-semibold leading-snug text-ink-900'>{page.title}</span>
      <span className='mt-2 line-clamp-3 text-sm leading-6 text-foggy'>{page.subtitle}</span>
      <span className='mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary'>
        View page
        <ArrowRight className='h-4 w-4 group-hover:translate-x-1' aria-hidden='true' />
      </span>
    </Link>
  );
}
