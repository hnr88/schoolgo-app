'use client';

import { memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from '@/i18n/navigation';
import { formatAudCompact } from '@/modules/school-search/lib/format-currency';
import { HitPersonalizationBadges } from '@/modules/school-search/components/cards/HitPersonalizationBadges';
import { getSchoolCoords, getSchoolKey, SCHOOL_MAP_ICON } from '@/modules/school-search/components/school-map-utils';
import type { Portal } from '@/lib/portal-url';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface SchoolMapMarkerProps {
  school: SchoolHit;
  activePortal: Portal;
}

function SchoolMapMarkerComponent({ school, activePortal }: SchoolMapMarkerProps) {
  const t = useTranslations('SchoolSearch.map');
  const coords = getSchoolCoords(school);
  const lat = coords?.lat ?? 0;
  const lng = coords?.lng ?? 0;
  const position = useMemo<[number, number]>(() => [lat, lng], [lat, lng]);

  if (!school.slug)
    return <Marker position={position} icon={SCHOOL_MAP_ICON} title={school.name} alt={school.name} />;

  return (
    <Marker position={position} icon={SCHOOL_MAP_ICON} title={school.name} alt={school.name}>
      <Popup
        className='schoolgo-map-popup schoolgo-map-popup--compact'
        closeButton={false}
        autoPan={false}
      >
        <Link
          href={`/${activePortal}/schools/${school.slug}`}
          className='group flex min-w-44 max-w-52 flex-col no-underline transition-colors'
        >
          <div className='flex flex-col gap-1 p-3 pb-2'>
            <h3 className='line-clamp-2 text-body-sm font-semibold leading-snug text-ink-900'>
              {school.name}
            </h3>
            <p className='text-caption leading-none text-foggy'>
              {school.suburb}, {school.state}
            </p>
            {school.lowestAnnualTuition != null && (
              <span className='mt-0.5 inline-flex self-start rounded-pill bg-rausch-50 px-2 py-0.5 text-caption font-semibold leading-normal text-primary'>
                {t('popupFeePerYear', { fee: formatAudCompact(school.lowestAnnualTuition) })}
              </span>
            )}
            <HitPersonalizationBadges school={school} />
          </div>
          </div>
          <div className='mx-3 border-t border-divider' />
          <div className='flex items-center justify-between px-3 py-2 transition-colors group-hover:bg-muted/60'>
            <span className='text-caption font-semibold text-primary transition-colors group-hover:text-rausch-600'>
              {t('popupViewSchool')}
            </span>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-rausch-50 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary'>
              <ArrowRight className='h-3 w-3' aria-hidden />
            </span>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

export const SchoolMapMarker = memo(
  SchoolMapMarkerComponent,
  (prev, next) =>
    getSchoolKey(prev.school) === getSchoolKey(next.school) &&
    prev.activePortal === next.activePortal,
);
