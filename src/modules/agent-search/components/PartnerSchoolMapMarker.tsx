'use client';

import { memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import { PARTNER_SCHOOL_MAP_ICON } from '@/modules/agent-search/lib/agent-map-utils';
import type { AgentPartnerSchool } from '@/modules/agent-search/types/agent-search.types';

interface PartnerSchoolMapMarkerProps {
  school: AgentPartnerSchool;
  activePortal: Portal;
}

function PartnerSchoolMapMarkerComponent({ school, activePortal }: PartnerSchoolMapMarkerProps) {
  const t = useTranslations('AgentSearch.map');
  const position = useMemo<[number, number]>(() => [school.lat, school.lng], [school.lat, school.lng]);
  const href = `/${activePortal}/schools/${school.slug ?? school.documentId}`;

  return (
    <Marker position={position} icon={PARTNER_SCHOOL_MAP_ICON} title={school.name} alt={school.name}>
      <Popup
        className="schoolgo-map-popup schoolgo-map-popup--compact"
        closeButton={false}
        autoPan={false}
      >
        <Link
          href={href}
          className="group flex min-w-44 max-w-52 flex-col no-underline transition-colors"
        >
          <div className="flex flex-col gap-1 p-3 pb-2">
            <h3 className="line-clamp-2 text-body-sm font-semibold leading-snug text-ink-900">
              {school.name}
            </h3>
          </div>
          <div className="mx-3 border-t border-divider" />
          <div className="flex items-center justify-between px-3 py-2 transition-colors group-hover:bg-muted/60">
            <span className="text-caption font-semibold text-primary transition-colors group-hover:text-rausch-600">
              {t('popupViewSchool')}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rausch-50 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

export const PartnerSchoolMapMarker = memo(
  PartnerSchoolMapMarkerComponent,
  (prev, next) =>
    prev.school.documentId === next.school.documentId && prev.activePortal === next.activePortal,
);
