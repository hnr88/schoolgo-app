import { getTranslations } from 'next-intl/server';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import type { SearchSchoolCardProps } from '@/modules/school-search/types/component.types';
import { SCHOOL_IMAGES } from '@/modules/school-search/constants/school-card.constants';

export async function SearchSchoolCard({ school }: SearchSchoolCardProps) {
  const t = await getTranslations('SchoolSearch.card');
  const tc = await getTranslations('Common');
  const fee = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(school.tuitionAud);

  return (
    <DsSchoolCard
      href={`/schools/${school.id}`}
      photoUrl={SCHOOL_IMAGES[Math.abs([...school.id].reduce((h, c) => h * 31 + c.charCodeAt(0), 0)) % SCHOOL_IMAGES.length]}
      name={school.name}
      location={`${school.suburb}, ${school.state}`}
      curriculum={school.curriculum}
      fee={fee}
      feeSuffix={t('currency')}
      topRatedLabel={school.isTopRated ? t('topRated') : undefined}
      cricosLabel={tc('cricosVerified')}
      shortlistAddLabel={tc('addToShortlist')}
      shortlistRemoveLabel={tc('removeFromShortlist')}
    />
  );
}
