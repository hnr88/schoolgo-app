import Image from 'next/image';
import { UsersRound } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getContentHref } from '@/modules/content-pages';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const segments = [
  ['Families', 'Need clarity on fit, fees, timing, and support.'],
  ['Agents', 'Need evidence, pipeline visibility, and consistent handoffs.'],
  ['Schools', 'Need profile quality, demand signals, and admissions operations.'],
] as const;

export function SegmentStrategyBlock({
  page,
  relatedPages = [],
  getPageHref = getContentHref,
}: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Segmentation'
      title='Audience strategy and operating focus'
      description='A reusable enterprise block for pages that need to route different stakeholder groups.'
    >
      <div className='grid gap-5 md:grid-cols-3'>
        {segments.map(([segment, need], index) => {
          const related = relatedPages[index] ?? page;
          return (
            <Link
              key={segment}
              href={getPageHref(related)}
              className='overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 hover:shadow-3'
            >
              <span className='relative block aspect-video bg-muted'>
                <Image src={related.image} alt={related.imageAlt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' />
              </span>
              <span className='block p-6'>
                <UsersRound className='h-6 w-6 text-primary' aria-hidden='true' />
                <h3 className='mt-5 text-lg font-semibold text-ink-900'>{segment}</h3>
                <p className='mt-2 text-sm leading-6 text-foggy'>{need}</p>
                <p className='mt-5 text-sm font-semibold text-primary'>Open linked journey</p>
              </span>
            </Link>
          );
        })}
      </div>
    </BlockShell>
  );
}
