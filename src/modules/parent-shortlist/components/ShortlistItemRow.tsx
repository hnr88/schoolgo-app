'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/modules/core';
import { AddNoteDialog } from '@/modules/parent-shortlist/components/AddNoteDialog';
import { DECISION_STATUS_STYLES } from '@/modules/parent-shortlist/constants/decision-status-styles';
import type { ShortlistItem } from '@/modules/parent-shortlist/types/shortlist.types';

interface ShortlistItemRowProps {
  item: ShortlistItem;
}

export function ShortlistItemRow({ item }: ShortlistItemRowProps) {
  const t = useTranslations('ParentShortlist');
  const [noteOpen, setNoteOpen] = useState(false);
  const schoolLabel = t('schoolRef', { id: item.schoolId.slice(0, 8) });

  return (
    <div className='flex items-center justify-between gap-3 rounded-lg border border-divider bg-card px-3 py-2'>
      <div className='flex min-w-0 items-center gap-2'>
        <span className='truncate text-sm font-medium text-ink-900'>{schoolLabel}</span>
        <StatusBadge
          status={item.decisionStatus}
          label={t(`decision_${item.decisionStatus}`)}
          styles={DECISION_STATUS_STYLES}
        />
      </div>
      <Button size='sm' variant='ghost' className='shrink-0 gap-1.5' onClick={() => setNoteOpen(true)}>
        <MessageSquarePlus className='h-4 w-4' aria-hidden='true' />
        {t('addNoteAction')}
      </Button>
      <AddNoteDialog
        itemDocumentId={item.documentId}
        schoolLabel={schoolLabel}
        open={noteOpen}
        onOpenChange={setNoteOpen}
      />
    </div>
  );
}
