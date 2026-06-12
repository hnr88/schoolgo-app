'use client';

import { Link } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import type { SearchCapability } from '@/modules/unified-search';
import { cn } from '@/lib/utils';
import { AccommodationBadge } from '@/modules/school-search/components/cards/AccommodationBadge';
import { CurriculumBadge } from '@/modules/school-search/components/cards/CurriculumBadge';
import { EnrolmentStatusBadge } from '@/modules/school-search/components/cards/EnrolmentStatusBadge';
import { SchoolCardFooter } from '@/modules/school-search/components/cards/SchoolCardFooter';
import { SchoolCardImage } from '@/modules/school-search/components/cards/SchoolCardImage';
import { SectorBadge } from '@/modules/school-search/components/cards/SectorBadge';
import {
  asAccommodation,
  asEnrolmentStatus,
  asSector,
} from '@/modules/school-search/lib/school-hit-guards';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';
import type { CurriculumCode } from '@/modules/school-search/types/filter.types';

interface SpecSchoolCardProps {
  hit: SchoolHit;
  isAdvanced: boolean;
  activePortal: Portal;
  capability?: SearchCapability;
  priority?: boolean;
  onUnauthenticatedBookmark?: () => void;
  className?: string;
}

export function SpecSchoolCard({
  hit,
  isAdvanced,
  activePortal,
  capability,
  priority = false,
  onUnauthenticatedBookmark,
  className,
}: SpecSchoolCardProps) {
  const sector = asSector(hit.sector);
  const status = asEnrolmentStatus(hit.enrolmentStatus);
  const accommodation = asAccommodation(hit.accommodation);
  const curriculumCodes: readonly CurriculumCode[] = hit.curriculumCodes ?? [];
  const tuition = hit.annualTuitionFrom ?? hit.lowestAnnualTuition;

  const logo =
    hit.logoUrl && !hit.logoUrl.startsWith('/images/placeholders/') ? hit.logoUrl : null;

  return (
    <Link
      href={`/${activePortal}/schools/${hit.slug}`}
      className={cn(
        'group flex flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      data-testid={`spec-school-card-${hit.documentId}`}
    >
      <SchoolCardImage
        logo={logo}
        name={hit.name}
        documentId={hit.documentId}
        isAdvanced={isAdvanced}
        capability={capability}
        priority={priority}
        onUnauthenticatedBookmark={onUnauthenticatedBookmark}
      />

      <div className="mt-1 flex flex-col gap-1">
        <h3 className="line-clamp-1 text-body-sm font-semibold text-ink-900">{hit.name}</h3>
        <p className="line-clamp-1 text-body-sm text-foggy">
          {hit.suburb}
          {hit.state ? `, ${hit.state}` : ''}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {status && <EnrolmentStatusBadge status={status} />}
        {sector && <SectorBadge sector={sector} />}
        {curriculumCodes.length > 0 && <CurriculumBadge codes={curriculumCodes} />}
        {accommodation && <AccommodationBadge value={accommodation} />}
      </div>

      <SchoolCardFooter tuition={tuition} />
    </Link>
  );
}
