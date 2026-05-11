import Image from 'next/image';
import { cn } from '@/lib/utils';

interface DefaultPhotoProps {
  className?: string;
}

export function DefaultPhoto({ className }: DefaultPhotoProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rausch-50 to-rausch-100',
        className,
      )}
      aria-hidden='true'
    >
      <svg
        className='pointer-events-none absolute inset-0 h-full w-full text-rausch-400 opacity-20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <pattern
            id='default-photo-waves'
            width='80'
            height='20'
            patternUnits='userSpaceOnUse'
            patternTransform='rotate(-6)'
          >
            <path
              d='M0 10 Q20 0 40 10 Q60 20 80 10'
              fill='none'
              stroke='currentColor'
              strokeWidth='0.75'
            />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#default-photo-waves)' />
      </svg>
      <Image
        src='/logos/logo-red.png'
        alt=''
        width={240}
        height={221}
        className='relative h-auto w-1/2 max-w-40 object-contain'
      />
    </div>
  );
}
