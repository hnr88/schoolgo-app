'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface ParentsFeaturedCardProps {
  href: string;
  photoSeed: string;
  name: string;
  location: string;
  curriculum: string;
  fee: string;
  boarding: string;
  shortlistAddLabel: string;
  shortlistRemoveLabel: string;
}

export function ParentsFeaturedCard({
  href,
  photoSeed,
  name,
  location,
  curriculum,
  fee,
  boarding,
  shortlistAddLabel,
  shortlistRemoveLabel,
}: ParentsFeaturedCardProps) {
  const [shortlisted, setShortlisted] = useState(false);

  return (
    <article className='group relative flex flex-col gap-3 overflow-hidden'>
      <div className='relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted shadow-2 transition-shadow group-hover:shadow-3'>
        <Link href={href} aria-label={name} className='absolute inset-0 z-[1] block'>
          <Image
            src={`https://picsum.photos/seed/${photoSeed}/720/540`}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, 400px'
            className='object-cover'
            aria-hidden='true'
          />
        </Link>
        <button
          type='button'
          onClick={() => setShortlisted((s) => !s)}
          aria-pressed={shortlisted}
          aria-label={shortlisted ? shortlistRemoveLabel : shortlistAddLabel}
          className='absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-pill bg-card/95 text-foreground shadow-2 transition-transform hover:bg-card active:scale-95'
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
      </div>

      <div className='flex flex-col gap-0.5 px-1'>
        <div className='flex items-baseline justify-between gap-3'>
          <h3 className='truncate text-body-sm font-semibold text-ink-900'>{name}</h3>
        </div>
        <p className='truncate text-caption text-foggy'>
          {location} · {curriculum}
        </p>
        <p className='text-caption text-foggy'>
          <span className='font-semibold text-ink-900'>{fee}</span> / year · {boarding}
        </p>
      </div>
    </article>
  );
}
