'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { AccommodationBadge } from '@/modules/school-search/components/cards/AccommodationBadge';
import { CardActions } from '@/modules/school-search/components/cards/CardActions';
import { CurriculumBadge } from '@/modules/school-search/components/cards/CurriculumBadge';
import { EnrolmentStatusBadge } from '@/modules/school-search/components/cards/EnrolmentStatusBadge';
import { SectorBadge } from '@/modules/school-search/components/cards/SectorBadge';
import { formatAud } from '@/modules/school-search/lib/format-currency';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';
import type {
  Accommodation,
  CurriculumCode,
  EnrolmentStatus,
  Sector,
} from '@/modules/school-search/types/filter.types';

interface SpecSchoolCardProps {
  hit: SchoolHit;
  isAdvanced: boolean;
  onUnauthenticatedBookmark?: () => void;
  className?: string;
}

function asSector(value: string | null | undefined): Sector | null {
  if (value === 'gov' || value === 'non_gov' || value === 'catholic') return value;
  return null;
}

function asEnrolmentStatus(
  value: EnrolmentStatus | string | null | undefined,
): EnrolmentStatus | null {
  if (
    value === 'open' ||
    value === 'limited' ||
    value === 'waitlist' ||
    value === 'closed'
  ) {
    return value;
  }
  return null;
}

function asAccommodation(
  value: Accommodation | string | null | undefined,
): Accommodation | null {
  if (
    value === 'boarding' ||
    value === 'homestay' ||
    value === 'both' ||
    value === 'none'
  ) {
    return value;
  }
  return null;
}

export function SpecSchoolCard({
  hit,
  isAdvanced,
  onUnauthenticatedBookmark,
  className,
}: SpecSchoolCardProps) {
  const t = useTranslations('SchoolSearch.spec.tileCard');

  const sector = asSector(hit.sector);
  const status = asEnrolmentStatus(hit.enrolmentStatus);
  const accommodation = asAccommodation(hit.accommodation);
  const curriculumCodes: readonly CurriculumCode[] = hit.curriculumCodes ?? [];
  const tuition = hit.annualTuitionFrom ?? hit.lowestAnnualTuition;

  const rawPhoto = hit.photoUrl ?? hit.logoUrl;
  const photo =
    rawPhoto && !rawPhoto.startsWith('/images/placeholders/') ? rawPhoto : null;

  return (
    <Link
      href={`/school/${hit.slug}`}
      className={cn(
        'group flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-1 transition-shadow hover:shadow-2',
        className,
      )}
      data-testid={`spec-school-card-${hit.documentId}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        {photo && (
          <Image
            src={photo}
            alt={hit.name}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover"
          />
        )}
        <div className="absolute right-2 top-2 z-10">
          <CardActions
            schoolId={hit.documentId}
            schoolName={hit.name}
            isAdvanced={isAdvanced}
            onUnauthenticatedBookmark={onUnauthenticatedBookmark}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{hit.name}</h3>
        <p className="text-caption text-muted-foreground">
          {hit.suburb}
          {hit.state ? `, ${hit.state}` : ''}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {status && <EnrolmentStatusBadge status={status} />}
        {sector && <SectorBadge sector={sector} />}
        {curriculumCodes.length > 0 && <CurriculumBadge codes={curriculumCodes} />}
        {accommodation && <AccommodationBadge value={accommodation} />}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {tuition != null
            ? t('tuitionFrom', { amount: formatAud(tuition).replace('A$', '$') })
            : ''}
        </span>
        <span className="inline-flex items-center gap-1 text-caption font-medium text-primary group-hover:underline">
          {t('viewSchool')}
          <ArrowRight size={12} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
