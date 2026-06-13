'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import type { ShortlistMember } from '@/modules/parent-shortlist/types/shortlist.types';

interface MembersStripProps {
  members: ShortlistMember[];
}

export function MembersStrip({ members }: MembersStripProps) {
  const t = useTranslations('ParentShortlist');

  if (members.length === 0) {
    return (
      <p className='flex items-center gap-1.5 text-xs text-foggy'>
        <Users className='h-3.5 w-3.5' aria-hidden='true' />
        {t('noCollaborators')}
      </p>
    );
  }

  return (
    <div className='flex flex-wrap items-center gap-1.5'>
      <Users className='h-3.5 w-3.5 text-foggy' aria-hidden='true' />
      {members.map((member) => (
        <span
          key={member.userDocumentId}
          className='inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foggy'
        >
          {t(`role_${member.role}`)}
        </span>
      ))}
    </div>
  );
}
