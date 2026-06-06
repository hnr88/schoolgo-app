'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList, ExternalLink, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core/components/EmptyState';
import { ErrorState } from '@/modules/core/components/ErrorState';
import { SectionHeading } from '@/modules/core/components/SectionHeading';
import { SurfaceCard } from '@/modules/core/components/SurfaceCard';
import { TestResultCard } from '@/modules/test-results';
import { useApplicationTestResults } from '@/modules/applications/queries/use-application-test-results.query';

export function ParentApplicationTestResultsSection({
  studentDocumentId,
}: {
  studentDocumentId: string;
}) {
  const t = useTranslations('ParentApplications');
  const { data, isLoading, isError, refetch } = useApplicationTestResults(studentDocumentId);

  const results = data?.data ?? [];

  return (
    <SurfaceCard id='test-results' padding='lg' className='scroll-mt-24'>
      <SectionHeading title={t('testResultsTitle')} level={2} icon={ClipboardList} className='mb-4' />

      {isLoading ? (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-40 w-full rounded-lg' />
        </div>
      ) : isError ? (
        <ErrorState
          message={t('testResultsError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
          framed
        />
      ) : results.length === 0 ? (
        <EmptyState icon={ClipboardList} title={t('testResultsEmpty')} framed />
      ) : (
        <div className='flex flex-col gap-4'>
          {results.map((result) => (
            <div key={result.documentId} className='flex flex-col gap-2'>
              <TestResultCard result={result} />
              {result.reportDocument?.file?.url && (
                <a
                  href={result.reportDocument.file.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-strong hover:underline'
                >
                  <FileText className='h-4 w-4' aria-hidden='true' />
                  {t('testResultsReport')}
                  <ExternalLink className='h-3.5 w-3.5' aria-hidden='true' />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
