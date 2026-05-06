'use client';

import { useTranslations } from 'next-intl';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';

const formatFee = (amount: number | null) => {
  if (amount == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(amount);
};

function pickImage(id: string): string {
  const hash = Math.abs([...id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0));
  return SCHOOL_IMAGES[hash % SCHOOL_IMAGES.length];
}

export function SearchSchoolCard({ school }: { school: SchoolHit }) {
  const t = useTranslations('SchoolSearch.card');
  const tc = useTranslations('Common');

  return (
    <DsSchoolCard
      href={`/schools/${school.slug}`}
      photoUrl={pickImage(school.documentId)}
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
