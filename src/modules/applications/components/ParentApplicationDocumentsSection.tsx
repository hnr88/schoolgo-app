'use client';

import { useTranslations } from 'next-intl';
import { FileQuestion, FileText, FolderOpen } from 'lucide-react';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { ErrorState } from '@/modules/core/components/ErrorState';
import { SectionHeading } from '@/modules/core/components/SectionHeading';
import { SurfaceCard } from '@/modules/core/components/SurfaceCard';
import { useParentDocumentRequests } from '@/modules/applications/queries/use-parent-document-requests.query';
import { useParentStudentDocuments } from '@/modules/applications/queries/use-parent-student-documents.query';
import { useParentDocumentUploadTarget } from '@/modules/applications/hooks/useParentDocumentUploadTarget';
import { ParentDocumentUploadForm } from './ParentDocumentUploadForm';
import {
  ParentDocumentListSkeleton,
  ParentDocumentRequestRow,
  ParentUploadedDocumentRow,
} from './ParentDocumentLists';

export function ParentApplicationDocumentsSection({
  applicationDocumentId,
  studentDocumentId,
}: {
  applicationDocumentId: string;
  studentDocumentId: string;
}) {
  const t = useTranslations('ParentApplications');
  const requests = useParentDocumentRequests(applicationDocumentId);
  const uploads = useParentStudentDocuments(applicationDocumentId);
  const { documentType, setDocumentType, selectForUpload, formRef } =
    useParentDocumentUploadTarget();

  const requestItems = requests.data?.data ?? [];
  const uploadItems = uploads.data?.data ?? [];

  return (
    <SurfaceCard padding='lg'>
      <SectionHeading title={t('documentsTitle')} level={2} icon={FolderOpen} className='mb-4' />

      <div className='flex flex-col gap-6'>
        <section>
          <h3 className='mb-2 text-sm font-medium text-ink-900'>{t('docsChecklistTitle')}</h3>
          {requests.isLoading ? (
            <ParentDocumentListSkeleton />
          ) : requests.isError ? (
            <ErrorState
              message={t('documentsRequestsError')}
              onRetry={() => requests.refetch()}
              retryLabel={t('retry')}
              framed
            />
          ) : requestItems.length === 0 ? (
            <EmptyState icon={FileQuestion} title={t('docsChecklistEmpty')} framed />
          ) : (
            <div className='flex flex-col'>
              {requestItems.map((request) => (
                <ParentDocumentRequestRow
                  key={request.documentId}
                  request={request}
                  onUpload={selectForUpload}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className='mb-2 text-sm font-medium text-ink-900'>{t('documentsUploadedTitle')}</h3>
          {uploads.isLoading ? (
            <ParentDocumentListSkeleton />
          ) : uploads.isError ? (
            <ErrorState
              message={t('documentsUploadedError')}
              onRetry={() => uploads.refetch()}
              retryLabel={t('retry')}
              framed
            />
          ) : uploadItems.length === 0 ? (
            <EmptyState icon={FileText} title={t('documentsUploadedEmpty')} framed />
          ) : (
            <div className='flex flex-col'>
              {uploadItems.map((document) => (
                <ParentUploadedDocumentRow key={document.documentId} document={document} />
              ))}
            </div>
          )}
        </section>

        <section ref={formRef}>
          <h3 className='mb-3 text-sm font-medium text-ink-900'>{t('documentsUploadTitle')}</h3>
          <ParentDocumentUploadForm
            applicationDocumentId={applicationDocumentId}
            studentDocumentId={studentDocumentId}
            documentType={documentType}
            onDocumentTypeChange={setDocumentType}
          />
        </section>
      </div>
    </SurfaceCard>
  );
}
