'use client';

import Image from 'next/image';
import { CardActions } from '@/modules/school-search/components/cards/CardActions';

interface SchoolCardImageProps {
  logo: string | null;
  name: string;
  documentId: string;
  isAdvanced: boolean;
  priority?: boolean;
  onUnauthenticatedBookmark?: () => void;
}

export function SchoolCardImage({
  logo,
  name,
  documentId,
  isAdvanced,
  priority = false,
  onUnauthenticatedBookmark,
}: SchoolCardImageProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg bg-muted">
      {logo ? (
        <Image
          src={logo}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover"
        />
      ) : (
        <span aria-hidden className="text-2xl font-semibold text-muted-foreground">
          {initials}
        </span>
      )}
      <div className="absolute right-2 top-2 z-10">
        <CardActions
          schoolId={documentId}
          schoolName={name}
          isAdvanced={isAdvanced}
          onUnauthenticatedBookmark={onUnauthenticatedBookmark}
        />
      </div>
    </div>
  );
}
