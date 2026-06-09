'use client';

import { useTranslations } from 'next-intl';
import { Banknote, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { useTuitionEditor } from '@/modules/school-tuition-editor/hooks/useTuitionEditor';
import { TuitionTable } from '@/modules/school-tuition-editor/components/TuitionTable';

export function SchoolTuitionEditorPage() {
  const t = useTranslations('SchoolTuition');
  const page = useTuitionEditor();

  if (page.isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-12 w-full rounded-xl' />
        <Skeleton className='h-64 w-full rounded-xl' />
      </div>
    );
  }

  if (page.isError) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => page.refetch()}
        retryLabel={t('retry')}
        framed
      />
    );
  }

  if (!page.isAdmin && page.rows.every((row) => row.serverAmount === null)) {
    return (
      <EmptyState
        icon={Banknote}
        title={t('emptyTitle')}
        description={t('emptyDescription')}
        framed
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {!page.isAdmin && <p className='text-sm text-foggy'>{t('readOnlyNotice')}</p>}
      <SurfaceCard padding='none' className='overflow-hidden'>
        <TuitionTable rows={page.rows} isAdmin={page.isAdmin} onChange={page.handleChange} />
      </SurfaceCard>
      {page.isAdmin && (
        <div className='flex items-center justify-end gap-3'>
          {page.dirtyCount > 0 && (
            <span className='text-sm text-foggy'>
              {t('unsavedChanges', { count: page.dirtyCount })}
            </span>
          )}
          <Button
            type='button'
            onClick={page.handleSave}
            disabled={page.dirtyCount === 0 || page.hasErrors || page.isSaving}
            data-testid='save-tuition'
          >
            <Save className='mr-1 h-4 w-4' />
            {page.isSaving ? t('saving') : t('save')}
          </Button>
        </div>
      )}
    </div>
  );
}
