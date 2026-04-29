import { getTranslations } from 'next-intl/server';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import type { SearchSchoolCardProps } from '@/modules/school-search/types/component.types';

const SCHOOL_IMAGES = [
  'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=480&h=360&q=80',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=480&h=360&q=80',
  'https://images.unsplash.com/photo-1621241484978-6f60fdb68f1c?auto=format&fit=crop&w=480&h=360&q=80',
  'https://images.unsplash.com/photo-1651313976327-f10851420a08?auto=format&fit=crop&w=480&h=360&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=480&h=360&q=80',
  'https://images.unsplash.com/photo-1751510397614-e289eb4ce57a?auto=format&fit=crop&w=480&h=360&q=80',
];

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
