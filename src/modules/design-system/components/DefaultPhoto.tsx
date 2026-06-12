import Image from 'next/image';
import { Building2, GraduationCap, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getSchoolAvatarTheme,
  getSchoolInitials,
} from '@/modules/design-system/lib/school-avatar';
import type { IconComponent } from '@/modules/design-system/types/design-system.types';

interface DefaultPhotoProps {
  className?: string;
  name?: string;
}

const WATERMARK_ICONS: IconComponent[] = [GraduationCap, Building2, School];

function getWatermarkIcon(name: string): IconComponent {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return WATERMARK_ICONS[sum % WATERMARK_ICONS.length];
}

export function DefaultPhoto({ className, name }: DefaultPhotoProps) {
  if (name) {
    const theme = getSchoolAvatarTheme(name);
    const Watermark = getWatermarkIcon(name);

    return (
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br',
          theme.surface,
          className,
        )}
        aria-hidden='true'
      >
        <svg
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full opacity-30',
            theme.watermark,
          )}
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern
              id='default-photo-name-waves'
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
          <rect width='100%' height='100%' fill='url(#default-photo-name-waves)' />
        </svg>

        <Watermark
          className={cn(
            'pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-25',
            theme.watermark,
          )}
          strokeWidth={1.25}
          aria-hidden='true'
        />

        <span
          className={cn(
            'relative flex h-16 w-16 items-center justify-center rounded-2xl text-h4 font-bold tracking-tight shadow-2 ring-1 ring-inset',
            theme.chip,
            theme.ring,
          )}
        >
          {getSchoolInitials(name)}
        </span>
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
