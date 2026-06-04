'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, StickyNote } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SectionHeading, SurfaceCard } from '@/modules/core';
import {
  useCreateSchoolNote,
  useSchoolNotes,
} from '@/modules/school-applications/queries/use-school-notes.query';

export function SchoolNotesTab({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data: notes, isLoading } = useSchoolNotes(documentId);
  const createNote = useCreateSchoolNote(documentId);
  const [content, setContent] = useState('');

  function handleAdd() {
    const trimmed = content.trim();
    if (!trimmed) return;
    createNote.mutate(trimmed, {
      onSuccess: () => {
        setContent('');
        toast.success(t('noteAdded'));
      },
      onError: () => toast.error(t('noteAddError')),
    });
  }

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-4'>
      <SectionHeading title={t('notesTitle')} level={3} />

      <div className='flex flex-col gap-2'>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('notePlaceholder')}
          disabled={createNote.isPending}
          aria-label={t('notePlaceholder')}
        />
        <div className='flex justify-end'>
          <Button type='button' onClick={handleAdd} disabled={!content.trim() || createNote.isPending}>
            {createNote.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('noteAdd')}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className='h-16 w-full rounded-lg' />
      ) : !notes || notes.length === 0 ? (
        <EmptyState framed icon={StickyNote} title={t('notesEmpty')} />
      ) : (
        <ul className='flex flex-col gap-3'>
          {notes.map((note) => (
            <li key={note.documentId} className='rounded-lg border border-border bg-muted/40 p-3'>
              <p className='text-sm text-ink-900'>{note.content}</p>
              <p className='mt-1 text-xs text-foggy'>{new Date(note.createdAt).toLocaleString('en-AU')}</p>
            </li>
          ))}
        </ul>
      )}
    </SurfaceCard>
  );
}
