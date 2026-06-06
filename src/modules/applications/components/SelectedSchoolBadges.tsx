'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { SelectedSchoolBadgesProps } from '@/modules/applications/types/create-application.types';

export function SelectedSchoolBadges({ schools, onRemove }: SelectedSchoolBadgesProps) {
  const t = useTranslations('Applications');

  if (schools.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-2 pt-1'>
      {schools.map((school) => (
        <Badge key={school.documentId} variant='secondary' className='gap-1 pr-1'>
          {school.label}
          <button
            type='button'
            aria-label={t('createRemoveSchool', { name: school.label })}
            className='rounded-sm opacity-70 hover:opacity-100'
            onClick={() => onRemove(school.documentId)}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}
    </div>
  );
}
