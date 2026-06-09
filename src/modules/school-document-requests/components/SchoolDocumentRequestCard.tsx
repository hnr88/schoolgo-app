'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge, SurfaceCard } from '@/modules/core';
import {
  DOCUMENT_REQUEST_STATUS_LABEL_KEY,
  DOCUMENT_REQUEST_STATUS_STYLES,
} from '@/modules/school-document-requests/constants/school-document-requests.constants';
import { formatRequestDate } from '@/modules/school-document-requests/lib/format-request-date';
import type { SchoolDocumentRequestRow } from '@/modules/school-document-requests/types/school-document-requests.types';

export function SchoolDocumentRequestCard({ request }: { request: SchoolDocumentRequestRow }) {
  const t = useTranslations('SchoolDocumentRequests');
  const tDoc = useTranslations('Students');
  const student = request.application?.student;
  const studentName =
    [student?.firstName, student?.lastName].filter(Boolean).join(' ') || t('unknownStudent');
  const docLabels = request.documentTypes.map((type) => tDoc(`docType_${type}`)).join(', ');

  return (
    <SurfaceCard padding='lg'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-wrap items-center gap-3'>
            <span className='text-sm font-semibold text-ink-900'>{studentName}</span>
            <StatusBadge
              status={request.status}
              label={t(DOCUMENT_REQUEST_STATUS_LABEL_KEY[request.status])}
              styles={DOCUMENT_REQUEST_STATUS_STYLES}
            />
          </div>
          <p className='text-sm text-foggy'>{docLabels}</p>
          <div className='flex flex-wrap items-center gap-2 text-xs text-foggy'>
            <CalendarDays className='h-3.5 w-3.5' />
            <span>{t('requestedOn', { date: formatRequestDate(request.createdAt) })}</span>
            {request.deadline && (
              <span>· {t('deadlineOn', { date: formatRequestDate(request.deadline) })}</span>
            )}
          </div>
        </div>
        {request.application && (
          <Link
            href={`/dashboard/applications/${request.application.documentId}`}
            className='inline-flex items-center gap-1 text-sm font-medium text-rausch-700 hover:underline'
          >
            {t('viewApplication')}
            <ArrowRight className='h-4 w-4' />
          </Link>
        )}
      </div>
    </SurfaceCard>
  );
}
