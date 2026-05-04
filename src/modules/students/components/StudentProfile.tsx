'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useStudent } from '@/modules/students/queries/use-student.query';
import { StudentDocumentsTab } from '@/modules/students/components/StudentDocumentsTab';
import { STATUS_DOT } from '@/modules/students/constants/profile.constants';
import { getInitials } from '@/modules/students/lib/get-initials';
import type { StudentProfileProps } from '@/modules/students/types/component.types';

function InfoItem({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className='flex items-baseline justify-between border-b border-border/50 py-3 last:border-b-0'>
      <span className='text-sm text-foggy'>{label}</span>
      <span className='text-sm font-medium text-ink-900'>{value || '—'}</span>
    </div>
  );
}

export function StudentProfile({ documentId }: StudentProfileProps) {
  const t = useTranslations('Students');
  const { data: student, isLoading } = useStudent(documentId);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        <Skeleton className='h-6 w-32' />
        <div className='rounded-xl border border-border bg-card p-8'>
          <div className='flex items-center gap-6'>
            <Skeleton className='h-16 w-16 rounded-full' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-7 w-48' />
              <Skeleton className='h-4 w-64' />
              <Skeleton className='h-4 w-40' />
            </div>
          </div>
        </div>
        <Skeleton className='h-10 w-80' />
        <Skeleton className='h-64 w-full rounded-xl' />
      </div>
    );
  }

  if (!student) {
    return <p className='text-sm text-foggy'>{t('notFound')}</p>;
  }

  const initials = getInitials(student.firstName, student.lastName);
  const detailParts = [
    student.nationality,
    student.gender ? t(`gender${student.gender.charAt(0).toUpperCase()}${student.gender.slice(1)}`) : null,
    student.dateOfBirth ? `${t('fieldDob')}: ${student.dateOfBirth}` : null,
  ].filter(Boolean).join('  |  ');

  const schoolLine = [
    student.currentSchool ? `${t('fieldCurrentSchool')}: ${student.currentSchool}` : null,
    student.currentYearLevel ? `(${student.currentYearLevel})` : null,
  ].filter(Boolean).join(' ');

  const targetLine = [
    student.targetEntryYear ? `${t('fieldTargetYear')}: ${student.targetEntryYear}` : null,
    student.targetEntryTerm ?? null,
  ].filter(Boolean).join(', ');

  return (
    <div className='flex flex-col gap-6'>
      <Link href='/dashboard/students' className='inline-flex items-center gap-1 text-sm text-primary hover:underline'>
        <ArrowLeft className='h-4 w-4' />
        {t('backToList')}
      </Link>

      <div className='rounded-xl border border-border bg-card p-6'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-5'>
            <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-babu-500 text-xl font-bold text-white'>
              {initials}
            </div>
            <div>
              <div className='flex items-center gap-3'>
                <h1 className='text-2xl font-bold text-ink-900'>
                  {student.firstName} {student.lastName}
                </h1>
                <div className='flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5'>
                  <span className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[student.status] ?? 'bg-foggy/50'}`} />
                  <span className='text-xs font-medium text-hof'>
                    {t(`status${student.status.charAt(0).toUpperCase()}${student.status.slice(1)}`)}
                  </span>
                </div>
              </div>
              {detailParts && (
                <p className='mt-1 text-sm text-foggy'>{detailParts}</p>
              )}
              {schoolLine && (
                <p className='mt-0.5 text-sm text-hof'>{schoolLine}</p>
              )}
              {targetLine && (
                <p className='text-sm text-hof'>{targetLine}</p>
              )}
              {student.parentGuardianName && (
                <p className='mt-1 text-sm text-foggy'>
                  {t('fieldParentName')}: {student.parentGuardianName}
                  {student.parentGuardianPhone ? `  |  ${student.parentGuardianPhone}` : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>{t('tabOverview')}</TabsTrigger>
          <TabsTrigger value='documents'>{t('tabDocuments')}</TabsTrigger>
          <TabsTrigger value='tests'>{t('tabTests')}</TabsTrigger>
          <TabsTrigger value='applications'>{t('tabApplications')}</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='mt-6'>
          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='rounded-xl border border-border bg-card p-6'>
              <h2 className='mb-2 text-base font-semibold text-ink-900'>{t('sectionPersonal')}</h2>
              <InfoItem label={t('fieldFirstName')} value={student.firstName} />
              <InfoItem label={t('fieldLastName')} value={student.lastName} />
              <InfoItem label={t('fieldDob')} value={student.dateOfBirth} />
              <InfoItem label={t('fieldGender')} value={student.gender ? t(`gender${student.gender.charAt(0).toUpperCase()}${student.gender.slice(1)}`) : null} />
              <InfoItem label={t('fieldNationality')} value={student.nationality} />
            </div>

            <div className='rounded-xl border border-border bg-card p-6'>
              <h2 className='mb-2 text-base font-semibold text-ink-900'>{t('sectionEducation')}</h2>
              <InfoItem label={t('fieldCurrentSchool')} value={student.currentSchool} />
              <InfoItem label={t('fieldCurrentYear')} value={student.currentYearLevel} />
              <InfoItem label={t('fieldTargetYear')} value={student.targetEntryYear} />
              <InfoItem label={t('fieldTargetTerm')} value={student.targetEntryTerm} />
            </div>

            <div className='rounded-xl border border-border bg-card p-6'>
              <h2 className='mb-2 text-base font-semibold text-ink-900'>{t('sectionParent')}</h2>
              <InfoItem label={t('fieldParentName')} value={student.parentGuardianName} />
              <InfoItem label={t('fieldParentEmail')} value={student.parentGuardianEmail} />
              <InfoItem label={t('fieldParentPhone')} value={student.parentGuardianPhone} />
              <InfoItem label={t('fieldParentWechat')} value={student.parentGuardianWechat} />
            </div>

            {student.agentNotes && (
              <div className='rounded-xl border border-border bg-card p-6'>
                <h2 className='mb-2 text-base font-semibold text-ink-900'>{t('fieldNotes')}</h2>
                <p className='whitespace-pre-wrap text-sm text-hof'>{student.agentNotes}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value='documents' className='mt-6'>
          <StudentDocumentsTab studentDocumentId={student.documentId} />
        </TabsContent>

        <TabsContent value='tests' className='mt-6'>
          <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20'>
            <p className='text-sm text-foggy'>{t('testsComingSoon')}</p>
          </div>
        </TabsContent>

        <TabsContent value='applications' className='mt-6'>
          <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20'>
            <p className='text-sm text-foggy'>{t('applicationsComingSoon')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
