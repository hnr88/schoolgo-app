'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { StatusBadge } from '@/modules/design-system';

export function SavedBadge() {
  const t = useTranslations('SchoolSearch.card');

  return (
    <StatusBadge tone='brand'>
      <Heart className='h-3 w-3' fill='currentColor' aria-hidden />
      {t('savedBadge')}
    </StatusBadge>
  );
}
