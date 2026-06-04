'use client';

import { useState } from 'react';
import Image from 'next/image';
import { School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { studentMediaUrl } from '@/modules/students/lib/media-url';

interface TourSchoolAvatarProps {
  logoUrl: string | null | undefined;
  schoolName: string | null | undefined;
  size?: number;
  className?: string;
}

export function TourSchoolAvatar({
  logoUrl,
  schoolName,
  size = 44,
  className,
}: TourSchoolAvatarProps) {
  const [failed, setFailed] = useState(false);
  const src = studentMediaUrl(logoUrl);

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-vivid-iris-soft text-vivid-iris-strong',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={schoolName ?? ''}
          fill
          sizes={`${size}px`}
          className='object-contain'
          onError={() => setFailed(true)}
        />
      ) : (
        <School className='h-5 w-5' aria-hidden='true' />
      )}
    </span>
  );
}
