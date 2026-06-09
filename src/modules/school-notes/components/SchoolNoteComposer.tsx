'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SurfaceCard } from '@/modules/core';
import { schoolNoteSchema } from '@/modules/school-notes/schemas/school-note.schema';
import { useCreateSchoolNote } from '@/modules/school-notes/queries/use-create-school-note.mutation';

export function SchoolNoteComposer() {
  const t = useTranslations('SchoolNotes');
  const [content, setContent] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const createNote = useCreateSchoolNote();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schoolNoteSchema.safeParse({ content });
    if (!parsed.success) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    createNote.mutate(parsed.data.content, {
      onSuccess: () => setContent(''),
    });
  };

  return (
    <SurfaceCard>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label htmlFor='school-note-content' className='text-sm font-semibold text-ink-900'>
          {t('composerLabel')}
        </label>
        <Textarea
          id='school-note-content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('composerPlaceholder')}
          rows={3}
          data-testid='note-composer-input'
        />
        {showValidation && (
          <p className='text-sm text-destructive'>{t('validationEmpty')}</p>
        )}
        {createNote.isError && (
          <p className='text-sm text-destructive'>{t('createError')}</p>
        )}
        <div className='flex justify-end'>
          <Button type='submit' disabled={createNote.isPending} data-testid='post-note'>
            <Send className='mr-1 h-4 w-4' />
            {createNote.isPending ? t('posting') : t('post')}
          </Button>
        </div>
      </form>
    </SurfaceCard>
  );
}
