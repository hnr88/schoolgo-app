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
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-muted">
      {logo ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rausch-50 to-rausch-100">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-2 md:h-20 md:w-20">
            <Image
              src={logo}
              alt={name}
              fill
              priority={priority}
              sizes="80px"
              className="object-contain p-2"
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
