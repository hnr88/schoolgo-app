'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Plus,
  FileText,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useStudentDocuments } from '@/modules/students/queries/use-student-documents.query';
import { useDeleteDocument } from '@/modules/students/queries/use-delete-document.mutation';
import { DocumentUploadDialog } from '@/modules/students/components/DocumentUploadDialog';
import { DOCUMENT_STATUS_VARIANT } from '@/modules/students/constants/document.constants';
import { DOCUMENT_TYPES } from '@/modules/students/types/document.types';
import type { StudentDocument } from '@/modules/students/types/document.types';

interface StudentDocumentsTabProps {
  studentDocumentId: string;
}

export function StudentDocumentsTab({ studentDocumentId }: StudentDocumentsTabProps) {
  const t = useTranslations('Students');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<StudentDocument | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const { data, isLoading } = useStudentDocuments({
    studentDocumentId,
    documentType: typeFilter,
  });
  const deleteMutation = useDeleteDocument();

  const documents = data?.data ?? [];

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.documentId);
    setDeleteTarget(null);
  }

  function formatDate(date: string | null) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString();
  }

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-48 w-full rounded-lg' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <Select value={typeFilter} onValueChange={(v) => { if (v) setTypeFilter(v); }}>
            <SelectTrigger className='w-48'>
              <SelectValue placeholder={t('docAllTypes')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t('docAllTypes')}</SelectItem>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {t(`docType_${type}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          {t('docUpload')}
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
          <FileText className='mb-3 h-10 w-10 text-foggy' />
          <p className='text-sm font-medium text-ink-900'>{t('docEmptyTitle')}</p>
          <p className='mt-1 text-xs text-foggy'>{t('docEmptySubtitle')}</p>
          <Button variant='outline' size='sm' className='mt-4' onClick={() => setUploadOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            {t('docUpload')}
          </Button>
        </div>
      ) : (
        <div className='rounded-lg border border-border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('docColName')}</TableHead>
                <TableHead>{t('docColType')}</TableHead>
                <TableHead>{t('docColStatus')}</TableHead>
                <TableHead>{t('docColExpiry')}</TableHead>
                <TableHead>{t('docColUploaded')}</TableHead>
                <TableHead className='w-24' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.documentId}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <FileText className='h-4 w-4 shrink-0 text-foggy' />
                      <span className='truncate text-sm font-medium'>
                        {doc.fileName || doc.file?.name || '—'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{t(`docType_${doc.documentType}`)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={DOCUMENT_STATUS_VARIANT[doc.status]}>
                      {t(`docStatus_${doc.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm text-foggy'>{formatDate(doc.expiresAt)}</span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm text-foggy'>{formatDate(doc.createdAt)}</span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1'>
                      {doc.file?.url && (
                        <a
                          href={doc.file.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex h-8 w-8 items-center justify-center rounded-md text-foggy hover:bg-muted hover:text-ink-900'
                        >
                          <ExternalLink className='h-4 w-4' />
                        </a>
                      )}
                      <button
                        type='button'
                        onClick={() => setDeleteTarget(doc)}
                        className='inline-flex h-8 w-8 items-center justify-center rounded-md text-foggy hover:bg-muted hover:text-destructive'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <DocumentUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        studentDocumentId={studentDocumentId}
      />

      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('docDeleteTitle')}</DialogTitle>
          </DialogHeader>
          <p className='text-sm text-foggy'>{t('docDeleteConfirm')}</p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDeleteTarget(null)}>
              {t('docCancel')}
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {t('docDeleteButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
