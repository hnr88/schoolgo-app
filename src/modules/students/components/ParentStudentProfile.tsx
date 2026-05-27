'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { VERIFICATION_STATUS_LABELS, type VerificationStatus } from '@/modules/test-results';
import { useParentStudent } from '@/modules/students/queries/use-parent-student.query';
import { ParentStudentProfileHeader } from '@/modules/students/components/ParentStudentProfileHeader';
import { ParentStudentInfoSection } from '@/modules/students/components/ParentStudentInfoSection';
import type { ParentStudentProfileProps } from '@/modules/students/types/parent-component.types';

export function ParentStudentProfile({ documentId }: ParentStudentProfileProps) {
  const t = useTranslations('ParentStudents');
  const tResults = useTranslations('ParentTestResults');
  const { data: student, isLoading, isError, error } = useParentStudent(documentId);

  if (isError && error && 'response' in error && (error as { response?: { status?: number } }).response?.status === 404) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-40 w-full rounded-xl' />
        <div className='grid gap-6 lg:grid-cols-2'>
          <Skeleton className='h-64 w-full rounded-xl' />
          <Skeleton className='h-64 w-full rounded-xl' />
        </div>
      </div>
    );
  }

  if (!student) {
    return <p className='text-sm text-foggy'>{t('notFound')}</p>;
  }

  const genderValue = student.gender ? t(`gender_${student.gender}`) : null;
  const contactValue = student.preferredContactChannel
    ? t(`contact_${student.preferredContactChannel}`)
    : null;

  return (
    <div className='flex flex-col gap-6'>
      <Link href='/parent/students' className='inline-flex items-center gap-1 text-sm text-primary hover:underline'>
        <ArrowLeft className='h-4 w-4' />
        {t('backToList')}
      </Link>

      <ParentStudentProfileHeader student={student} />

      <div className='grid gap-6 lg:grid-cols-2'>
        <ParentStudentInfoSection
          title={t('sectionPersonal')}
          rows={[
            { label: t('fieldFirstName'), value: student.firstName },
            { label: t('fieldLastName'), value: student.lastName },
            { label: t('fieldEmail'), value: student.email },
            { label: t('fieldDob'), value: student.dateOfBirth },
            { label: t('fieldGender'), value: genderValue },
            { label: t('fieldNationality'), value: student.nationality },
          ]}
        />
        <ParentStudentInfoSection
          title={t('sectionEducation')}
          rows={[
            { label: t('fieldCurrentSchool'), value: student.currentSchool },
            { label: t('fieldCurrentYear'), value: student.currentYearLevel },
            { label: t('fieldTargetYear'), value: student.targetEntryYear },
            { label: t('fieldTargetTerm'), value: student.targetEntryTerm },
          ]}
        />
        <ParentStudentInfoSection
          title={t('sectionGuardian')}
          rows={[
            { label: t('fieldParentName'), value: student.parentGuardianName },
            { label: t('fieldParentEmail'), value: student.parentGuardianEmail },
            { label: t('fieldParentPhone'), value: student.parentGuardianPhone },
            { label: t('fieldParentWechat'), value: student.parentGuardianWechat },
            { label: t('fieldPreferredContact'), value: contactValue },
          ]}
        />
        <ParentStudentInfoSection
          title={t('sectionSummary')}
          rows={[
            { label: t('fieldActiveApps'), value: String(student.activeApplicationCount) },
            { label: t('fieldDocuments'), value: String(student.documentsCount) },
            {
              label: t('fieldEnglishTest'),
              value: student.englishTestSummary
                ? `${student.englishTestSummary.testType.toUpperCase()}${student.englishTestSummary.overallScore ? ` · ${student.englishTestSummary.overallScore}` : ''} · ${tResults(
                    VERIFICATION_STATUS_LABELS[student.englishTestSummary.verificationStatus as VerificationStatus] ??
                      VERIFICATION_STATUS_LABELS.unverified,
                  )}`
                : null,
            },
          ]}
        />
      </div>
    </div>
  );
}
