'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { StickyNote } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { useSchoolNotes } from '@/modules/school-notes/queries/use-school-notes.query';
import { useDeleteSchoolNote } from '@/modules/school-notes/queries/use-delete-school-note.mutation';
import { SchoolNoteComposer } from '@/modules/school-notes/components/SchoolNoteComposer';
import { SchoolNoteCard } from '@/modules/school-notes/components/SchoolNoteCard';

export function SchoolNotesPage() {
  const t = useTranslations('SchoolNotes');
  const notesQuery = useSchoolNotes();
  const deleteNote = useDeleteSchoolNote();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (documentId: string) => {
    setDeletingId(documentId);
    deleteNote.mutate(documentId, {
      onSettled: () => setDeletingId(null),
    });
  };

  if (notesQuery.isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-32 w-full rounded-xl' />
        <Skeleton className='h-24 w-full rounded-xl' />
        <Skeleton className='h-24 w-full rounded-xl' />
      </div>
    );
  }

  if (notesQuery.isError) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => notesQuery.refetch()}
        retryLabel={t('retry')}
        framed
      />
    );
  }

  const notes = notesQuery.data?.data ?? [];
  const me = notesQuery.data?.meta.me;

  return (
    <div className='flex flex-col gap-4'>
      <SchoolNoteComposer />
      {deleteNote.isError && (
        <p className='text-sm text-destructive'>{t('deleteError')}</p>
      )}
      {notes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          framed
        />
      ) : (
        <div className='flex flex-col gap-3'>
          {notes.map((note) => (
            <SchoolNoteCard
              key={note.documentId}
              note={note}
              canDelete={
                !!me &&
                (me.isAdmin || note.author?.documentId === me.staffDocumentId)
              }
              onDelete={handleDelete}
              isDeleting={deleteNote.isPending && deletingId === note.documentId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
