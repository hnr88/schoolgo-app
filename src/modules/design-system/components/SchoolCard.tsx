import Image from 'next/image';
import { GraduationCap, Heart } from 'lucide-react';
import { TrustBadge } from '@/modules/design-system/components/TrustBadge';
import { cn } from '@/lib/utils';

interface SchoolCardProps {
  photoUrl?: string;
  name: string;
  meta: string;
  feeAud?: string;
  cricosVerified?: boolean;
  onShortlist?: () => void;
  shortlisted?: boolean;
  className?: string;
}

export function SchoolCard({
  photoUrl,
  name,
  meta,
  feeAud,
  cricosVerified = true,
  onShortlist,
  shortlisted = false,
  className,
}: SchoolCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3',
        className,
      )}
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes='(max-width: 640px) 100vw, 320px'
            className='object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-quill'>
            <GraduationCap className='h-12 w-12' strokeWidth={1.5} aria-hidden='true' />
          </div>
        )}
        {onShortlist && (
          <button
            type='button'
            onClick={onShortlist}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
            className='absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-pill bg-white/90 shadow-2 transition-colors hover:bg-white'
          >
            <Heart
              className={cn('h-5 w-5 transition-colors', shortlisted ? 'fill-primary text-primary' : 'text-foreground')}
              strokeWidth={1.75}
              aria-hidden='true'
            />
          </button>
        )}
      </div>

      <div className='flex flex-1 flex-col gap-2 p-5'>
        <h3 className='text-base font-semibold leading-snug text-ink-900'>{name}</h3>
        <p className='text-body-sm text-foggy'>{meta}</p>
        <div className='mt-auto flex items-center justify-between pt-3'>
          {cricosVerified && <TrustBadge variant='cricos' />}
          {feeAud && (
            <span className='text-body-sm font-semibold text-ink-900'>{feeAud}</span>
          )}
        </div>
      </div>
    </article>
  );
}
