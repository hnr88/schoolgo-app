import { getTranslations } from 'next-intl/server';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import type { School } from '@/modules/school-search/types/school.types';

interface SearchSchoolCardProps {
  school: School;
}

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
      photoUrl={`https://picsum.photos/seed/school-${school.id}/480/360`}
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
