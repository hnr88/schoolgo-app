import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DefaultPhoto } from '@/modules/design-system';
import { getSchoolAvatarTheme } from '@/modules/design-system/lib/school-avatar';
import type { SchoolPhotoOrLogoProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function SchoolPhotoOrLogo({
  logoUrl,
  name,
  size = 'lg',
}: SchoolPhotoOrLogoProps) {
  const h = size === 'lg' ? 'h-40' : 'h-20';

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg bg-muted', h)}>
      {logoUrl ? (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center bg-gradient-to-br',
            getSchoolAvatarTheme(name).surface,
          )}
        >
          <div className='relative h-1/2 w-1/2 max-w-32'>
            <Image src={logoUrl} alt={name} fill sizes='200px' className='object-contain' />
          </div>
        </div>
      ) : (
        <DefaultPhoto name={name} />
      )}
    </div>
  );
}
