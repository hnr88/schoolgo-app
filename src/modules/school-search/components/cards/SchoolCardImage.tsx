'use client';

import Image from 'next/image';
import { CardActions } from '@/modules/school-search/components/cards/CardActions';
import { DefaultPhoto } from '@/modules/design-system';

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
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md bg-muted">
      {logo ? (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <div className="relative h-1/2 w-1/2 max-w-32">
            <Image
              src={logo}
              alt={name}
              fill
              priority={priority}
              sizes="200px"
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <DefaultPhoto name={name} />
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
