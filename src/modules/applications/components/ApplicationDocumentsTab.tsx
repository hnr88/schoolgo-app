'use client';

import { useTranslations } from 'next-intl';
import { FileText, Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { useApplicationDocuments } from '@/modules/applications/queries/use-application-documents.query';
import { formatFileSize } from '@/modules/applications/lib/format';
import type { Application } from '@/modules/applications/types/application.types';

function DocumentsSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='h-12 w-full rounded-lg' />
      <Skeleton className='h-12 w-full rounded-lg' />
      <Skeleton className='h-12 w-full rounded-lg' />
    </div>
  );
}

export function ApplicationDocumentsTab({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const { data, isLoading } = useApplicationDocuments(application.documentId);

  if (isLoading) return <DocumentsSkeleton />;

  const documents = data?.data ?? [];

  if (documents.length === 0) {
    return <EmptyState icon={FileText} title={t('documentsEmpty')} />;
  }

  return (
    <div className='flex flex-col gap-2 rounded-xl border border-border bg-card'>
      {documents.map((doc) => (
        <div
          key={doc.id}
          className='flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0'
        >
          <div className='flex flex-1 flex-col gap-0.5 min-w-0'>
            <span className='truncate text-sm font-medium text-ink-900'>{doc.name}</span>
            <span className='text-xs text-foggy'>
              {doc.type} · {formatFileSize(doc.size)} · {new Date(doc.uploadedAt).toLocaleDateString()}
            </span>
          </div>
          <a
            href={doc.url}
            download
            aria-label={t('downloadDocument')}
            className='shrink-0 text-foggy hover:text-ink-900 transition-colors'
          >
            <Download className='h-4 w-4' />
          </a>
        </div>
      ))}
    </div>
  );
}
