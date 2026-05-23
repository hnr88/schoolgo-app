import Image from 'next/image';
import { cn } from '@/lib/utils';

const AVATAR_COLORS = [
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-violet-100 text-violet-700',
  'bg-cyan-100 text-cyan-700',
  'bg-lime-100 text-lime-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface DefaultPhotoProps {
  className?: string;
  name?: string;
}

export function DefaultPhoto({ className, name }: DefaultPhotoProps) {
  if (name) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center',
          getAvatarColor(name),
          className,
        )}
        aria-hidden='true'
      >
        <span className='text-2xl font-bold'>{getInitials(name)}</span>
      </div>
    );
  }

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
