'use client';

import { useTranslations } from 'next-intl';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import type { Portal } from '@/lib/portal-url';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const formatFee = (amount: number | null) => {
  if (amount == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(amount);
};

export function SearchSchoolCard({
  school,
  activePortal,
}: {
  school: SchoolHit;
  activePortal: Portal;
}) {
  const t = useTranslations('SchoolSearch.card');
  const tc = useTranslations('Common');

  return (
    <DsSchoolCard
      href={`/${activePortal}/schools/${school.slug}`}
      logoUrl={school.logoUrl ?? undefined}
      name={school.name}
      location={`${school.suburb}, ${school.state}`}
      curriculum={school.curriculumOffered ?? undefined}
      fee={formatFee(school.lowestAnnualTuition) ?? undefined}
      feeSuffix={t('currency')}
      topRatedLabel={undefined}
      cricosLabel={tc('cricosVerified')}
      shortlistAddLabel={tc('addToShortlist')}
      shortlistRemoveLabel={tc('removeFromShortlist')}
    />
  );
}
