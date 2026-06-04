'use client';

import { useTranslations } from 'next-intl';
import { FileStack, Lock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
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
        <Skeleton className='h-10 w-40 rounded-md' />
        <Skeleton className='h-48 w-full rounded-lg' />
      </div>
    );
  }

  if (staffQuery.isError || templatesQuery.isError) {
    return (
      <ErrorState
        message={t('loadError')}
        onRetry={() => templatesQuery.refetch()}
        retryLabel={t('retry')}
        framed
      />
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        {!isAdmin && (
          <p className='flex items-center gap-2 rounded-lg border border-arches-100 bg-arches-50 px-4 py-3 text-sm font-medium text-arches-700'>
            <Lock className='h-4 w-4 shrink-0' aria-hidden='true' />
            {t('adminOnly')}
          </p>
        )}
        {isAdmin && (
          <Button type='button' className='ml-auto' disabled={hasDraft} onClick={state.openNew} data-testid='new-template'>
            <Plus className='mr-1 h-4 w-4' />{t('createTemplate')}
          </Button>
        )}
      </div>

      {templates.length === 0 ? (
        <EmptyState icon={FileStack} title={t('empty')} description={t('emptyHint')} framed />
      ) : (
        <SurfaceCard elevation='flat' padding='none' className='overflow-hidden'>
          <TemplateVersionTable
            templates={templates}
            canManage={isAdmin}
            onView={state.openView}
            onEdit={state.openEdit}
            onPublish={(tpl) => state.setPublishId(tpl.documentId)}
          />
        </SurfaceCard>
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
