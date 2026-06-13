'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { SearchCapability } from '@/modules/unified-search';
import { CardActions } from '@/modules/school-search/components/cards/CardActions';
import { formatAud } from '@/modules/school-search/lib/format-currency';
import { DefaultPhoto, getSchoolAvatarTheme } from '@/modules/design-system';

interface SchoolCardImageProps {
  logo: string | null;
  name: string;
  documentId: string;
  isAdvanced: boolean;
  capability?: SearchCapability;
  priority?: boolean;
  tuition?: number | null;
  onUnauthenticatedBookmark?: () => void;
}

export function SchoolCardImage({
  logo,
  name,
  documentId,
  isAdvanced,
  capability,
  priority = false,
  tuition,
  onUnauthenticatedBookmark,
}: SchoolCardImageProps) {
  const t = useTranslations('SchoolSearch.spec.tileCard');
  return (
    <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
      {logo ? (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center bg-gradient-to-br',
            getSchoolAvatarTheme(name).logoSurface,
          )}
        >
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
      {tuition != null && (
        <span className="absolute bottom-2 left-2 z-10 inline-flex items-center rounded-pill bg-card/95 px-2.5 py-1 text-caption font-semibold text-ink-900 shadow-1 backdrop-blur-sm">
          {t('allIn', { amount: formatAud(tuition).replace('A$', '$') })}
        </span>
      )}
    </div>
  );
}
