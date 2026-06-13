'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { DefaultPhoto } from '@/modules/design-system/components/DefaultPhoto';
import { TrustBadge } from '@/modules/design-system/components/TrustBadge';
import { getSchoolAvatarTheme } from '@/modules/design-system/lib/school-avatar';
import type { SchoolCardProps } from '@/modules/design-system/types/design-system.types';

export function SchoolCard({
  name,
  location,
  photoUrl,
  logoUrl,
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
  shortlisted: shortlistedProp,
  onShortlistToggle,
  shortlistDisabled = false,
  className,
  statusSlot,
  actionSlot,
}: SchoolCardProps) {
  const [shortlistedLocal, setShortlistedLocal] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const isControlled = shortlistedProp !== undefined;
  const shortlisted = isControlled ? shortlistedProp : shortlistedLocal;

  const handleShortlistToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isControlled) {
      onShortlistToggle?.();
    } else {
      setShortlistedLocal((s) => !s);
    }
  };

  const hasShortlist = Boolean(shortlistAddLabel && shortlistRemoveLabel);

  // Airbnb-style listing card: the image is the hero (floats with its own soft
  // shadow that lifts on hover), text sits plainly beneath with generous air and
  // no boxed card chrome.
  const card = (
    <article className={cn('group flex flex-col gap-3', className)}>
      <div className='relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted shadow-1 transition-shadow duration-300 ease-out-quart group-hover:shadow-3 motion-reduce:transition-none'>
        {photoUrl && !photoFailed ? (
          <Image
            src={photoUrl}
            alt=''
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
            className='object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105 motion-reduce:transition-none'
            aria-hidden='true'
            onError={() => setPhotoFailed(true)}
          />
        ) : logoUrl && !logoFailed ? (
          <div
            className={cn(
              'flex h-full w-full items-center justify-center bg-gradient-to-br',
              getSchoolAvatarTheme(name).logoSurface,
            )}
          >
            <div className='relative h-1/2 w-1/2 max-w-32'>
              <Image
                src={logoUrl}
                alt=''
                fill
                sizes='200px'
                className='object-contain transition-transform duration-500 ease-out-quart group-hover:scale-105 motion-reduce:transition-none'
                aria-hidden='true'
                onError={() => setLogoFailed(true)}
              />
            </div>
          </div>
        ) : (
          <DefaultPhoto name={name} />
        )}

        {statusSlot && <div className='absolute left-3 top-3 z-[2]'>{statusSlot}</div>}

        {topRatedLabel && (
          <span className='absolute left-3 top-3 z-[1] inline-flex items-center gap-1 rounded-pill bg-arches-500 px-2.5 py-1 text-caption font-semibold text-on-primary shadow-brand'>
            <Star className='h-3 w-3 fill-current' strokeWidth={0} aria-hidden='true' />
            {topRatedLabel}
          </span>
        )}

        {hasShortlist && (
          <button
            type='button'
            onClick={handleShortlistToggle}
            disabled={shortlistDisabled}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? shortlistRemoveLabel : shortlistAddLabel}
            className='absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-2 backdrop-blur-sm transition ease-out-quart hover:scale-105 hover:bg-card active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none'
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

      <div className='flex flex-col gap-1 px-0.5'>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='line-clamp-1 text-body font-semibold text-ink-900'>{name}</h3>
          {rating && (
            <span className='flex shrink-0 items-center gap-1 text-body-sm font-medium text-ink-900'>
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
          <div className='pt-1'>
            <TrustBadge variant='cricos' label={cricosLabel} />
          </div>
        )}

        {actionSlot && <div className='pt-2'>{actionSlot}</div>}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={name}
        className='block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      >
        {card}
      </Link>
    );
  }

  return card;
}
