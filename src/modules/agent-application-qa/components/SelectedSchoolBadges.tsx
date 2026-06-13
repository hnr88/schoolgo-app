'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ReadinessSchoolOption } from '@/modules/agent-application-qa/types/readiness.types';

export function SelectedSchoolBadges({
  schools,
  onRemove,
}: {
  schools: ReadinessSchoolOption[];
  onRemove: (documentId: string) => void;
}) {
  const t = useTranslations('AgentApplicationQa');

  if (schools.length === 0) return null;

  return (
    <ul className='flex flex-wrap gap-2'>
      {schools.map((school) => (
        <li key={school.documentId}>
          <Badge variant='secondary' className='gap-1 pr-1'>
            <span className='max-w-xs truncate'>{school.label}</span>
            <button
              type='button'
              onClick={() => onRemove(school.documentId)}
              aria-label={t('schoolRemove', { name: school.label })}
              className='rounded-full p-0.5 hover:bg-foreground/10'
            >
              <X className='h-3 w-3' aria-hidden='true' />
            </button>
          </Badge>
        </li>
      ))}
    </ul>
  );
}
