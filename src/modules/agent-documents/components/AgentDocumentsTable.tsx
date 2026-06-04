'use client';

import { useTranslations } from 'next-intl';
import { FileText, Trash2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SurfaceCard } from '@/modules/core';
import { DOCUMENT_STATUS_VARIANT } from '@/modules/students/constants/document.constants';
import { toAbsoluteFileUrl } from '@/modules/agent-documents/lib/format-file-size';
import type { AgentDocumentsTableProps } from '@/modules/agent-documents/types/component.types';

function formatDate(date: string | null) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
}

export function AgentDocumentsTable({ documents, onDelete }: AgentDocumentsTableProps) {
  const t = useTranslations('AgentDocuments');

  return (
    <SurfaceCard padding='none' className='overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colName')}</TableHead>
            <TableHead>{t('colType')}</TableHead>
            <TableHead>{t('colStudent')}</TableHead>
            <TableHead>{t('colStatus')}</TableHead>
            <TableHead>{t('colUploaded')}</TableHead>
            <TableHead className='w-24' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.documentId}>
              <TableCell>
                <div className='flex items-center gap-2.5'>
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-babu-50 text-babu-700'>
                    <FileText className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
                  </span>
                  <span className='truncate text-sm font-medium text-ink-900'>
                    {doc.fileName || doc.file?.name || '—'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className='text-sm'>{t(`docType_${doc.documentType}`)}</span>
              </TableCell>
              <TableCell>
                <span className='text-sm'>
                  {doc.student
                    ? `${doc.student.firstName} ${doc.student.lastName ?? ''}`.trim()
                    : '—'}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={DOCUMENT_STATUS_VARIANT[doc.status]}>
                  {t(`docStatus_${doc.status}`)}
                </Badge>
              </TableCell>
              <TableCell>
                <span className='text-sm text-foggy'>{formatDate(doc.createdAt)}</span>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1'>
                  {doc.file?.url && (
                    <a
                      href={toAbsoluteFileUrl(doc.file.url)}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={t('viewFile')}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md text-foggy transition-colors hover:bg-babu-50 hover:text-babu-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    >
                      <ExternalLink className='h-4 w-4' />
                    </a>
                  )}
                  <button
                    type='button'
                    onClick={() => onDelete(doc)}
                    aria-label={t('deleteButton')}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-md text-foggy transition-colors hover:bg-muted hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SurfaceCard>
  );
}
