'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ParentStudentAvatar } from '@/modules/students/components/ParentStudentAvatar';
import { ParentStudentWizard } from '@/modules/students/components/parent-wizard/ParentStudentWizard';
import { useParentStudent } from '@/modules/students/queries/use-parent-student.query';
import { parentStudentToFormValues } from '@/modules/students/lib/parent-student-to-form-values';
import { studentMediaUrl } from '@/modules/students/lib/media-url';
import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

function CurrentMedia({ student }: { student: ParentStudentDetail }) {
  const t = useTranslations('StudentWizard');
  const voiceUrl = studentMediaUrl(student.voiceIntro?.url);

  if (!student.photo && !student.voiceIntro) return null;

  return (
    <div className='flex flex-col gap-4 rounded-lg border border-border bg-muted p-4'>
      <p className='text-sm text-muted-foreground'>{t('keepMediaHint')}</p>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8'>
        {student.photo ? (
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-medium text-ink-900'>{t('currentPhoto')}</span>
            <ParentStudentAvatar
              firstName={student.firstName}
              lastName={student.lastName}
              photoUrl={student.photo.url}
              size={64}
            />
          </div>
        ) : null}
        {voiceUrl ? (
          <div className='flex flex-1 flex-col gap-2'>
            <span className='text-xs font-medium text-ink-900'>{t('currentVoice')}</span>
            <audio controls src={voiceUrl} className='w-full max-w-sm' />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EditStudentPage({ documentId }: { documentId: string }) {
  const t = useTranslations('StudentWizard');
  const { data: student, isLoading, isError } = useParentStudent(documentId);

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex items-center gap-4'>
        <Link href={`/parent/students/${documentId}`}>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('back')}
          </Button>
        </Link>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('editTitle')}</h1>
      </header>

      {isLoading ? (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-24 w-full rounded-lg' />
          <Skeleton className='h-96 w-full rounded-lg' />
        </div>
      ) : null}

      {isError || (!isLoading && !student) ? (
        <p className='text-sm text-destructive'>{t('updateError')}</p>
      ) : null}

      {student ? (
        <>
          <CurrentMedia student={student} />
          <div className='rounded-lg border border-border bg-card p-6 shadow-1 sm:p-8 lg:p-10'>
            <ParentStudentWizard
              documentId={documentId}
              initialValues={parentStudentToFormValues(student)}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
