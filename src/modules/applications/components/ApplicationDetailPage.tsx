'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApplication } from '@/modules/applications/queries/use-application.query';
import { ApplicationDetailHeader } from '@/modules/applications/components/ApplicationDetailHeader';
import { ApplicationDetailsTab } from '@/modules/applications/components/ApplicationDetailsTab';
import { ApplicationDocumentsTab } from '@/modules/applications/components/ApplicationDocumentsTab';
import { ApplicationTimelineTab } from '@/modules/applications/components/ApplicationTimelineTab';
import { ApplicationActions } from '@/modules/applications/components/ApplicationActions';

function DetailSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-5 w-40' />
      <div className='rounded-xl border border-border bg-card p-6'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-7 w-72' />
          <Skeleton className='h-5 w-48' />
          <Skeleton className='h-10 w-full rounded-full' />
          <div className='grid grid-cols-4 gap-4 pt-2'>
            <Skeleton className='h-12 rounded-lg' />
            <Skeleton className='h-12 rounded-lg' />
            <Skeleton className='h-12 rounded-lg' />
            <Skeleton className='h-12 rounded-lg' />
          </div>
        </div>
      </div>
      <Skeleton className='h-10 w-80' />
      <Skeleton className='h-64 w-full rounded-xl' />
    </div>
  );
}

export function ApplicationDetailPage({ documentId }: { documentId: string }) {
  const t = useTranslations('Applications');
  const { data: application, isLoading, isError } = useApplication(documentId);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !application) {
    return (
      <div className='flex flex-col gap-6'>
        <Link
          href='/dashboard/applications'
          className='inline-flex items-center gap-1 text-sm text-primary hover:underline'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('backToApplications')}
        </Link>
        <p className='text-sm text-foggy'>{isError ? t('loadError') : t('notFound')}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <Link
        href='/dashboard/applications'
        className='inline-flex items-center gap-1 text-sm text-primary hover:underline'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('backToApplications')}
      </Link>

      <ApplicationDetailHeader application={application} />

      <div className='flex flex-col gap-4'>
        <Tabs defaultValue='details'>
          <TabsList>
            <TabsTrigger value='details'>{t('tabDetails')}</TabsTrigger>
            <TabsTrigger value='documents'>{t('tabDocuments')}</TabsTrigger>
            <TabsTrigger value='timeline'>{t('tabTimeline')}</TabsTrigger>
            <TabsTrigger value='messages'>{t('tabMessages')}</TabsTrigger>
          </TabsList>

          <TabsContent value='details' className='mt-6'>
            <ApplicationDetailsTab application={application} />
          </TabsContent>

          <TabsContent value='documents' className='mt-6'>
            <ApplicationDocumentsTab application={application} />
          </TabsContent>

          <TabsContent value='timeline' className='mt-6'>
            <ApplicationTimelineTab application={application} />
          </TabsContent>

          <TabsContent value='messages' className='mt-6'>
            <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20'>
              <p className='text-sm text-foggy'>{t('tabMessages')}</p>
            </div>
          </TabsContent>
        </Tabs>

        <ApplicationActions application={application} />
      </div>
    </div>
  );
}
