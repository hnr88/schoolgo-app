'use client';

import { useTranslations } from 'next-intl';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSchoolStaffMe } from '@/modules/school-templates/queries/use-school-staff-me.query';
import { useSchoolTemplates } from '@/modules/school-templates/queries/use-school-templates.query';
import { useTemplatesPageState } from '@/modules/school-templates/hooks/useTemplatesPageState';
import { TemplateVersionTable } from '@/modules/school-templates/components/TemplateVersionTable';
import { TemplateBuilder } from '@/modules/school-templates/components/TemplateBuilder';
import { PublishDialog } from '@/modules/school-templates/components/PublishDialog';

export function SchoolTemplatesPage() {
  const t = useTranslations('SchoolTemplates');
  const staffQuery = useSchoolStaffMe();
  const schoolId = staffQuery.data?.school.documentId;
  const isAdmin = staffQuery.data?.permissionLevel === 'admin';
  const templatesQuery = useSchoolTemplates(schoolId);
  const state = useTemplatesPageState();

  const templates = templatesQuery.data ?? [];
  const hasDraft = templates.some((tpl) => tpl.status === 'draft');

  if (staffQuery.isLoading || templatesQuery.isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-10 w-40' />
        <Skeleton className='h-48 w-full rounded-lg' />
      </div>
    );
  }

  if (staffQuery.isError || templatesQuery.isError) {
    return (
      <div className='flex flex-col items-center gap-4 py-16 text-center'>
        <p className='text-sm text-foggy'>{t('loadError')}</p>
        <Button type='button' variant='outline' onClick={() => templatesQuery.refetch()}>
          <RefreshCw className='mr-1 h-4 w-4' />{t('retry')}
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        {!isAdmin && <p className='text-sm text-foggy'>{t('adminOnly')}</p>}
        {isAdmin && (
          <Button type='button' className='ml-auto' disabled={hasDraft} onClick={state.openNew} data-testid='new-template'>
            <Plus className='mr-1 h-4 w-4' />{t('createTemplate')}
          </Button>
        )}
      </div>

      {templates.length === 0 ? (
        <div className='flex flex-col items-center gap-1 rounded-lg border border-border bg-card py-12 text-center shadow-1'>
          <p className='text-base font-semibold text-ink-900'>{t('empty')}</p>
          <p className='text-sm text-foggy'>{t('emptyHint')}</p>
        </div>
      ) : (
        <div className='overflow-hidden rounded-lg border border-border bg-card shadow-1'>
          <TemplateVersionTable
            templates={templates}
            canManage={isAdmin}
            onView={state.openView}
            onEdit={state.openEdit}
            onPublish={(tpl) => state.setPublishId(tpl.documentId)}
          />
        </div>
      )}

      <TemplateBuilder
        key={state.builderKey}
        open={state.builder.open}
        readOnly={state.builder.readOnly}
        existingDraftId={state.builder.existingDraftId}
        initialSteps={state.builder.initialSteps}
        titleVersion={state.builder.version}
        onOpenChange={(o) => (o ? undefined : state.closeBuilder())}
        onSaved={state.closeBuilder}
      />

      <PublishDialog
        open={state.publishId !== null}
        documentId={state.publishId}
        onOpenChange={(o) => (o ? undefined : state.setPublishId(null))}
      />
    </div>
  );
}
