'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PARENT_DOCUMENT_REQUEST_STATUS_BADGE } from '@/modules/applications/constants/parent-document.constants';
import type {
  ParentDocumentRequest,
  ParentUploadedDocument,
} from '@/modules/applications/types/parent-document.types';

export function ParentDocumentListSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      {[0, 1].map((i) => (
        <div key={i} className='flex items-center justify-between gap-3'>
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-5 w-20 rounded-full' />
        </div>
      ))}
    </div>
  );
}

export function ParentDocumentRequestRow({ request }: { request: ParentDocumentRequest }) {
  const t = useTranslations('ParentApplications');
  const types = request.documentTypes.map((type) => t(`documentType_${type}`)).join(', ');

  return (
    <div className='flex flex-col gap-1 border-b border-border/50 py-3 last:border-b-0'>
      <div className='flex items-start justify-between gap-3'>
        <span className='text-sm text-ink-900'>{types}</span>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
            PARENT_DOCUMENT_REQUEST_STATUS_BADGE[request.status],
          )}
        >
          {t(`documentsRequestStatus_${request.status}`)}
        </span>
      </div>
      {request.note && (
        <span className='text-xs text-foggy'>
          {t('documentsRequestNote')}: {request.note}
        </span>
      )}
    </div>
  );
}

export function ParentUploadedDocumentRow({ document }: { document: ParentUploadedDocument }) {
  const t = useTranslations('ParentApplications');

  return (
    <div className='flex items-center justify-between gap-3 border-b border-border/50 py-3 last:border-b-0'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='text-sm text-ink-900'>{t(`documentType_${document.documentType}`)}</span>
        {document.fileName && (
          <span className='truncate text-xs text-foggy'>{document.fileName}</span>
        )}
      </div>
      {document.file?.url && (
        <a
          href={document.file.url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex shrink-0 items-center gap-1 text-sm font-medium text-primary-strong hover:underline'
        >
          {t('viewFile')}
          <ExternalLink className='h-3.5 w-3.5' />
        </a>
      )}
    </div>
  );
}
