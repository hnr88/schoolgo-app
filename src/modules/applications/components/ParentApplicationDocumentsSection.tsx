'use client';

import { useTranslations } from 'next-intl';
import { FileQuestion, FileText, FolderOpen } from 'lucide-react';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { SectionHeading } from '@/modules/core/components/SectionHeading';
import { SurfaceCard } from '@/modules/core/components/SurfaceCard';
import { useParentDocumentRequests } from '@/modules/applications/queries/use-parent-document-requests.query';
import { useParentStudentDocuments } from '@/modules/applications/queries/use-parent-student-documents.query';
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

  const requestItems = requests.data?.data ?? [];
  const uploadItems = uploads.data?.data ?? [];

  return (
    <SurfaceCard padding='lg'>
      <SectionHeading title={t('documentsTitle')} level={2} icon={FolderOpen} className='mb-4' />

      <div className='flex flex-col gap-6'>
        <section>
          <h3 className='mb-2 text-sm font-medium text-ink-900'>{t('documentsRequestsTitle')}</h3>
          {requests.isLoading ? (
            <ParentDocumentListSkeleton />
          ) : requestItems.length === 0 ? (
            <EmptyState icon={FileQuestion} title={t('documentsRequestsEmpty')} framed />
          ) : (
            <div className='flex flex-col'>
              {requestItems.map((request) => (
                <ParentDocumentRequestRow key={request.documentId} request={request} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className='mb-2 text-sm font-medium text-ink-900'>{t('documentsUploadedTitle')}</h3>
          {uploads.isLoading ? (
            <ParentDocumentListSkeleton />
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

        <section>
          <h3 className='mb-3 text-sm font-medium text-ink-900'>{t('documentsUploadTitle')}</h3>
          <ParentDocumentUploadForm
            applicationDocumentId={applicationDocumentId}
            studentDocumentId={studentDocumentId}
          />
        </section>
      </div>
    </SurfaceCard>
  );
}
