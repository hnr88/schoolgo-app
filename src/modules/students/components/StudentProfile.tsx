'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useStudent } from '@/modules/students/queries/use-student.query';
import { StudentDocumentsTab } from '@/modules/students/components/StudentDocumentsTab';
import type { StudentProfileProps } from '@/modules/students/types/component.types';

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-xs font-medium text-foggy'>{label}</span>
      <span className='text-sm text-ink-900'>{value || '—'}</span>
    </div>
  );
}

export function StudentProfile({ documentId }: StudentProfileProps) {
  const t = useTranslations('Students');
  const { data: student, isLoading } = useStudent(documentId);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-64 w-full rounded-lg' />
      </div>
    );
  }

  if (!student) {
    return <p className='text-sm text-foggy'>{t('notFound')}</p>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/students'>
            <Button variant='ghost' size='sm'>
              <ArrowLeft className='mr-1 h-4 w-4' />
              {t('backToList')}
            </Button>
          </Link>
          <div>
            <div className='flex items-center gap-3'>
              <h1 className='font-display text-2xl font-bold text-ink-900'>
                {student.firstName} {student.lastName}
              </h1>
              <Badge>{t(`status${student.status.charAt(0).toUpperCase()}${student.status.slice(1)}`)}</Badge>
            </div>
            <p className='text-sm text-foggy'>
              {student.nationality ?? ''}{student.nationality && student.currentYearLevel ? ' · ' : ''}{student.currentYearLevel ?? ''}
            </p>
          </div>
        </div>
        <Link href={`/dashboard/students/${documentId}/edit`}>
          <Button variant='outline' size='sm'>
            <Edit className='mr-1 h-4 w-4' />
            {t('edit')}
          </Button>
        </Link>
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>{t('tabOverview')}</TabsTrigger>
          <TabsTrigger value='documents'>{t('tabDocuments')}</TabsTrigger>
          <TabsTrigger value='tests'>{t('tabTests')}</TabsTrigger>
          <TabsTrigger value='applications'>{t('tabApplications')}</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='mt-6'>
          <div className='rounded-lg border border-border p-6'>
            <h2 className='mb-4 text-lg font-semibold text-ink-900'>{t('sectionPersonal')}</h2>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3'>
              <InfoRow label={t('fieldFirstName')} value={student.firstName} />
              <InfoRow label={t('fieldLastName')} value={student.lastName} />
              <InfoRow label={t('fieldDob')} value={student.dateOfBirth} />
              <InfoRow label={t('fieldGender')} value={student.gender ? t(`gender${student.gender.charAt(0).toUpperCase()}${student.gender.slice(1)}`) : null} />
              <InfoRow label={t('fieldNationality')} value={student.nationality} />
            </div>

            <Separator className='my-6' />

            <h2 className='mb-4 text-lg font-semibold text-ink-900'>{t('sectionEducation')}</h2>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3'>
              <InfoRow label={t('fieldCurrentSchool')} value={student.currentSchool} />
              <InfoRow label={t('fieldCurrentYear')} value={student.currentYearLevel} />
              <InfoRow label={t('fieldTargetYear')} value={student.targetEntryYear} />
              <InfoRow label={t('fieldTargetTerm')} value={student.targetEntryTerm} />
            </div>

            <Separator className='my-6' />

            <h2 className='mb-4 text-lg font-semibold text-ink-900'>{t('sectionParent')}</h2>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3'>
              <InfoRow label={t('fieldParentName')} value={student.parentGuardianName} />
              <InfoRow label={t('fieldParentEmail')} value={student.parentGuardianEmail} />
              <InfoRow label={t('fieldParentPhone')} value={student.parentGuardianPhone} />
              <InfoRow label={t('fieldParentWechat')} value={student.parentGuardianWechat} />
            </div>

            {student.agentNotes && (
              <>
                <Separator className='my-6' />
                <h2 className='mb-2 text-lg font-semibold text-ink-900'>{t('fieldNotes')}</h2>
                <p className='whitespace-pre-wrap text-sm text-foggy'>{student.agentNotes}</p>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value='documents' className='mt-6'>
          <StudentDocumentsTab studentDocumentId={student.documentId} />
        </TabsContent>

        <TabsContent value='tests' className='mt-6'>
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
            <p className='text-sm text-foggy'>{t('testsComingSoon')}</p>
          </div>
        </TabsContent>

        <TabsContent value='applications' className='mt-6'>
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
            <p className='text-sm text-foggy'>{t('applicationsComingSoon')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
