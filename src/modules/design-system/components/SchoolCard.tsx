'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GraduationCap, Heart, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { TrustBadge } from '@/modules/design-system/components/TrustBadge';
import type { SchoolCardProps } from '@/modules/design-system/types/design-system.types';

export function SchoolCard({
  name,
  location,
  photoUrl,
  href,
  fee,
  feeSuffix,
  curriculum,
  boarding,
  rating,
  cricosLabel,
  topRatedLabel,
  shortlistAddLabel,
  shortlistRemoveLabel,
  className,
}: SchoolCardProps) {
  const [shortlisted, setShortlisted] = useState(false);

  const hasShortlist = Boolean(shortlistAddLabel && shortlistRemoveLabel);

  const card = (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2 transition-shadow hover:shadow-3',
        className,
      )}
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt=''
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
            className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
            aria-hidden='true'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-quill'>
            <GraduationCap className='h-12 w-12' strokeWidth={1.5} aria-hidden='true' />
          </div>
        )}

        {topRatedLabel && (
          <span className='absolute left-3 top-3 z-[1] inline-flex items-center gap-1 rounded-pill bg-arches-500 px-2.5 py-1 text-caption font-semibold text-on-primary shadow-brand'>
            <Star className='h-3 w-3 fill-current' strokeWidth={0} aria-hidden='true' />
            {topRatedLabel}
          </span>
        )}

        {hasShortlist && (
          <button
            type='button'
            onClick={() => setShortlisted((s) => !s)}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? shortlistRemoveLabel : shortlistAddLabel}
            className='absolute right-3 top-3 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground shadow-2 backdrop-blur-sm transition-transform hover:bg-card active:scale-95'
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                shortlisted ? 'fill-primary text-primary' : 'text-ink-900',
              )}
              strokeWidth={shortlisted ? 1.5 : 1.75}
              aria-hidden='true'
            />
          </button>
        )}
      </div>

      <div className='flex flex-1 flex-col gap-1 p-4'>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='line-clamp-1 text-body font-semibold text-ink-900'>{name}</h3>
          {rating && (
            <span className='flex shrink-0 items-center gap-1 text-body-sm text-ink-900'>
              <Star className='h-3.5 w-3.5 fill-ink-900 text-ink-900' aria-hidden='true' />
              {rating}
            </span>
          )}
        </div>

        <p className='line-clamp-1 text-body-sm text-foggy'>
          {location}
          {curriculum ? ` · ${curriculum}` : ''}
        </p>

        {fee && (
          <p className='text-body-sm text-foggy'>
            <span className='font-semibold text-ink-900'>{fee}</span>
            {feeSuffix ? ` ${feeSuffix}` : ''}
            {boarding ? ` · ${boarding}` : ''}
          </p>
        )}

        {cricosLabel && (
          <div className='mt-auto border-t border-divider pt-3'>
            <TrustBadge variant='cricos' label={cricosLabel} />
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={name}
        className='block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      >
        {card}
      </Link>
    );
  }

  return card;
}
