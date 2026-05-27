'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { studentMediaUrl } from '@/modules/students/lib/media-url';
import { getInitials } from '@/modules/students/lib/get-initials';

interface ParentStudentAvatarProps {
  firstName: string;
  lastName: string;
  photoUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export function ParentStudentAvatar({
  firstName,
  lastName,
  photoUrl,
  size = 32,
  className,
}: ParentStudentAvatarProps) {
  const [failed, setFailed] = useState(false);
  const src = studentMediaUrl(photoUrl);
  const initials = getInitials(firstName, lastName);

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-babu-50 text-xs font-semibold text-babu-600',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt=''
          fill
          sizes={`${size}px`}
          className='object-cover'
          aria-hidden='true'
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
