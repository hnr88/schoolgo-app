'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Plus, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { PageHeader } from '@/modules/dashboard';
import { DOCUMENT_TYPES, DOCUMENT_STATUSES } from '@/modules/students/types/document.types';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { useAgentDocuments } from '@/modules/agent-documents/queries/use-agent-documents.query';
import { useDeleteAgentDocument } from '@/modules/agent-documents/queries/use-delete-agent-document.mutation';
import { AgentDocumentsTable } from '@/modules/agent-documents/components/AgentDocumentsTable';
import { AgentDocumentUploadDialog } from '@/modules/agent-documents/components/AgentDocumentUploadDialog';
import { DeleteAgentDocumentDialog } from '@/modules/agent-documents/components/DeleteAgentDocumentDialog';
import type { AgentDocument } from '@/modules/agent-documents/types/agent-document.types';

export function AgentDocumentsPage() {
  const t = useTranslations('AgentDocuments');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AgentDocument | null>(null);
  const [studentFilter, setStudentFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: studentsData } = useStudents({ pageSize: 100 });
  const { data, isLoading, isError } = useAgentDocuments({
    studentDocumentId: studentFilter,
    documentType: typeFilter,
    status: statusFilter,
  });
  const deleteMutation = useDeleteAgentDocument();

  const documents = data?.data ?? [];
  const students = studentsData?.data ?? [];

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.documentId);
      toast.success(t('deleteSuccess'));
    } catch {
      toast.error(t('deleteError'));
    }
    setDeleteTarget(null);
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button onClick={() => setUploadOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            {t('upload')}
          </Button>
        }
      />

      <SurfaceCard padding='sm' className='flex flex-wrap items-center gap-3'>
        <Select value={studentFilter} onValueChange={(v) => { if (v) setStudentFilter(v); }}>
          <SelectTrigger className='w-48'><SelectValue placeholder={t('allStudents')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('allStudents')}</SelectItem>
            {students.map((s) => (
              <SelectItem key={s.documentId} value={s.documentId}>{s.firstName} {s.lastName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => { if (v) setTypeFilter(v); }}>
          <SelectTrigger className='w-48'><SelectValue placeholder={t('allTypes')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('allTypes')}</SelectItem>
            {DOCUMENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{t(`docType_${type}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v); }}>
          <SelectTrigger className='w-44'><SelectValue placeholder={t('allStatuses')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('allStatuses')}</SelectItem>
            {DOCUMENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>{t(`docStatus_${status}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SurfaceCard>

      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-40 w-full rounded-lg' />
        </div>
      ) : isError ? (
        <ErrorState message={t('errorTitle')} framed />
      ) : documents.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title={t('emptyTitle')}
          description={t('emptySubtitle')}
          framed
          action={
            <Button variant='outline' size='sm' onClick={() => setUploadOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              {t('upload')}
            </Button>
          }
        />
      ) : (
        <AgentDocumentsTable documents={documents} onDelete={setDeleteTarget} />
      )}

      <AgentDocumentUploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <DeleteAgentDocumentDialog
        document={deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
