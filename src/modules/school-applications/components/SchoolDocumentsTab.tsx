'use client';

import { useTranslations } from 'next-intl';
import { FileText, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SurfaceCard } from '@/modules/core';
import { useSchoolChecklist } from '@/modules/school-applications/queries/use-school-checklist.query';
import type { SchoolApplicationDetail } from '@/modules/school-applications/types/school-applications.types';

const STATUS_ICON = {
  complete: CheckCircle2,
  partial: AlertCircle,
  missing: XCircle,
} as const;

const STATUS_CLASS = {
  complete: 'text-babu-700',
  partial: 'text-arches-700',
  missing: 'text-rausch-700',
} as const;

export function SchoolDocumentsTab({ application }: { application: SchoolApplicationDetail }) {
  const t = useTranslations('SchoolApplications');
  const { data: checklist, isLoading } = useSchoolChecklist(application.documentId);
  const docs = application.studentDocuments;

  return (
    <div className='flex flex-col gap-6'>
      <SurfaceCard padding='lg'>
        <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('checklistTitle')}</h3>
        {isLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-2/3' />
            <Skeleton className='h-5 w-1/2' />
          </div>
        ) : !checklist || checklist.length === 0 ? (
          <p className='text-sm text-foggy'>{t('checklistEmpty')}</p>
        ) : (
          <ul className='flex flex-col gap-3'>
            {checklist.map((item) => {
              const Icon = STATUS_ICON[item.status];
              return (
                <li key={item.stepName} className='flex items-center gap-3'>
                  <Icon className={`h-4 w-4 ${STATUS_CLASS[item.status]}`} />
                  <span className='text-sm text-ink-900'>{item.stepName}</span>
                  {item.details && <span className='text-xs text-foggy'>· {item.details}</span>}
                </li>
              );
            })}
          </ul>
        )}
      </SurfaceCard>

      <SurfaceCard padding='lg'>
        <h3 className='mb-4 text-sm font-semibold text-ink-900'>{t('documentsTitle')}</h3>
        {docs.length === 0 ? (
          <EmptyState framed icon={FileText} title={t('documentsEmpty')} />
        ) : (
          <ul className='flex flex-col gap-3'>
            {docs.map((doc) => (
              <li key={doc.documentId} className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                  <FileText className='h-4 w-4 text-foggy' />
                  <span className='text-sm text-ink-900'>{doc.fileName ?? doc.documentType}</span>
                </div>
                <span className='text-xs text-foggy'>{doc.documentType}</span>
              </li>
            ))}
          </ul>
        )}
      </SurfaceCard>
    </div>
  );
}
