'use client';

import Image from 'next/image';
import type { SearchCapability } from '@/modules/unified-search';
import { CardActions } from '@/modules/school-search/components/cards/CardActions';
import { DefaultPhoto } from '@/modules/design-system';

interface SchoolCardImageProps {
  logo: string | null;
  name: string;
  documentId: string;
  isAdvanced: boolean;
  capability?: SearchCapability;
  priority?: boolean;
  onUnauthenticatedBookmark?: () => void;
}

export function SchoolCardImage({
  logo,
  name,
  documentId,
  isAdvanced,
  capability,
  priority = false,
  onUnauthenticatedBookmark,
}: SchoolCardImageProps) {
  return (
    <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-lg bg-muted transition-shadow duration-300 ease-out-quart group-hover:shadow-2 motion-reduce:transition-none">
      {logo ? (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <div className="relative h-1/2 w-1/2 max-w-32">
            <Image
              src={logo}
              alt={name}
              fill
              priority={priority}
              sizes="200px"
              className="object-contain transition-transform duration-300 ease-out-quart group-hover:scale-105 motion-reduce:transition-none"
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
          capability={capability}
          onUnauthenticatedBookmark={onUnauthenticatedBookmark}
        />
      </div>
    </div>
  );
}
