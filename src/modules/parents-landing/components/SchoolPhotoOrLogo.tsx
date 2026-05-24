import Image from 'next/image';
import { getSchoolInitials, getAvatarColor } from '@/modules/parents-landing/lib/school-avatar';
import type { SchoolPhotoOrLogoProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function SchoolPhotoOrLogo({
  photoUrl,
  logoUrl,
  name,
  size = 'lg',
}: SchoolPhotoOrLogoProps) {
  const h = size === 'lg' ? 'h-40' : 'h-20';
  const textSize = size === 'lg' ? 'text-2xl' : 'text-lg';

  if (photoUrl) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl border border-border bg-muted ${h}`}>
        <Image src={photoUrl} alt={name} fill sizes='200px' className='object-cover' />
      </div>
    );
  }

  if (logoUrl) {
    return (
      <div className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-muted ${h}`}>
        <div className='relative h-1/2 w-1/2 max-w-32'>
          <Image src={logoUrl} alt={name} fill sizes='200px' className='object-contain' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-border ${h} ${getAvatarColor(name)}`}
      role='img'
      aria-label={name}
    >
      <span className={`font-bold ${textSize}`}>{getSchoolInitials(name)}</span>
    </div>
  );
}
