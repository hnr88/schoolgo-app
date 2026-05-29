'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSchoolApplication } from '@/modules/school-applications/queries/use-school-application.query';
import { SchoolApplicationHeader } from '@/modules/school-applications/components/SchoolApplicationHeader';
import { SchoolApplicationActions } from '@/modules/school-applications/components/SchoolApplicationActions';
import { SchoolDetailsTab } from '@/modules/school-applications/components/SchoolDetailsTab';
import { SchoolDocumentsTab } from '@/modules/school-applications/components/SchoolDocumentsTab';
import { SchoolTimelineTab } from '@/modules/school-applications/components/SchoolTimelineTab';
import { SchoolMessagesTab } from '@/modules/school-applications/components/SchoolMessagesTab';
import { SchoolNotesTab } from '@/modules/school-applications/components/SchoolNotesTab';
import { SchoolPreEnrolmentTab } from '@/modules/school-applications/components/SchoolPreEnrolmentTab';

function BackLink({ label }: { label: string }) {
  return (
    <Link
      href='/dashboard/applications'
      className='inline-flex items-center gap-1 text-sm text-rausch-700 hover:underline'
    >
      <ArrowLeft className='h-4 w-4' />
      {label}
    </Link>
  );
}

export function SchoolApplicationDetailPage({ documentId }: { documentId: string }) {
  const t = useTranslations('SchoolApplications');
  const { data: application, isLoading, isError, refetch } = useSchoolApplication(documentId);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        <Skeleton className='h-5 w-40' />
        <Skeleton className='h-32 w-full rounded-xl' />
        <Skeleton className='h-64 w-full rounded-xl' />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className='flex flex-col gap-6'>
        <BackLink label={t('detailBack')} />
        <div className='flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-12'>
          <p className='text-sm text-foggy'>{t('loadError')}</p>
          <Button variant='outline' onClick={() => refetch()}>
            {t('retry')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <BackLink label={t('detailBack')} />
      <SchoolApplicationHeader application={application} />
      <SchoolApplicationActions documentId={documentId} status={application.status} />

      <Tabs defaultValue='details'>
        <TabsList>
          <TabsTrigger value='details' className='text-foreground/80'>{t('tabDetails')}</TabsTrigger>
          <TabsTrigger value='documents' className='text-foreground/80'>{t('tabDocuments')}</TabsTrigger>
          <TabsTrigger value='timeline' className='text-foreground/80'>{t('tabTimeline')}</TabsTrigger>
          <TabsTrigger value='messages' className='text-foreground/80'>{t('tabMessages')}</TabsTrigger>
          <TabsTrigger value='notes' className='text-foreground/80'>{t('tabNotes')}</TabsTrigger>
          <TabsTrigger value='preEnrolment' className='text-foreground/80'>{t('tabPreEnrolment')}</TabsTrigger>
        </TabsList>

        <TabsContent value='details' className='mt-6'>
          <SchoolDetailsTab application={application} />
        </TabsContent>
        <TabsContent value='documents' className='mt-6'>
          <SchoolDocumentsTab application={application} />
        </TabsContent>
        <TabsContent value='timeline' className='mt-6'>
          <SchoolTimelineTab documentId={documentId} />
        </TabsContent>
        <TabsContent value='messages' className='mt-6'>
          <SchoolMessagesTab documentId={documentId} />
        </TabsContent>
        <TabsContent value='notes' className='mt-6'>
          <SchoolNotesTab documentId={documentId} />
        </TabsContent>
        <TabsContent value='preEnrolment' className='mt-6'>
          <SchoolPreEnrolmentTab documentId={documentId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
