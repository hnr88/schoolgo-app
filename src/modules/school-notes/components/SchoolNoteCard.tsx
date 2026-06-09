'use client';

import { useFormatter, useNow, useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import type { SchoolNote } from '@/modules/school-notes/types/school-notes.types';

interface SchoolNoteCardProps {
  note: SchoolNote;
  canDelete: boolean;
  onDelete: (documentId: string) => void;
  isDeleting: boolean;
}

export function SchoolNoteCard({ note, canDelete, onDelete, isDeleting }: SchoolNoteCardProps) {
  const t = useTranslations('SchoolNotes');
  const format = useFormatter();
  const now = useNow();

  const author = note.author;
  const authorName = author
    ? [author.firstName, author.lastName].filter(Boolean).join(' ').trim() ||
      author.username ||
      t('unknownAuthor')
    : t('unknownAuthor');

  return (
    <SurfaceCard data-testid='school-note-card'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-semibold text-ink-900'>{authorName}</p>
          <p className='text-xs text-foggy'>
            {author?.roleTitle ? `${author.roleTitle} · ` : ''}
            {format.relativeTime(new Date(note.createdAt), { now })}
          </p>
        </div>
        {canDelete && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            disabled={isDeleting}
            onClick={() => onDelete(note.documentId)}
            aria-label={t('delete')}
            data-testid='delete-note'
          >
            <Trash2 className='h-4 w-4 text-foggy' />
          </Button>
        )}
      </div>
      <p className='mt-3 text-sm leading-relaxed whitespace-pre-wrap text-ink-900'>
        {note.content}
      </p>
    </SurfaceCard>
  );
}
