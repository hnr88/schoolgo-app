'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import type { UploadedMedia } from '@/modules/forms';
import { ParentStudentWizard } from '@/modules/students/components/parent-wizard/ParentStudentWizard';
import { useParentStudent } from '@/modules/students/queries/use-parent-student.query';
import { parentStudentToFormValues } from '@/modules/students/lib/parent-student-to-form-values';
import { studentMediaUrl } from '@/modules/students/lib/media-url';

function toExistingMedia(
  url: string | null,
  mime: string,
  name: string,
): UploadedMedia | null {
  if (!url) return null;
  return { id: -1, url, mime, name, size: 0 };
}

export function EditStudentPage({ documentId }: { documentId: string }) {
  const t = useTranslations('StudentWizard');
  const { data: student, isLoading, isError } = useParentStudent(documentId);

  const existingPhoto = student
    ? toExistingMedia(studentMediaUrl(student.photo?.url), '', t('currentPhotoAlt'))
    : null;
  const existingVoiceIntro = student
    ? toExistingMedia(
        studentMediaUrl(student.voiceIntro?.url),
        student.voiceIntro?.mime ?? '',
        t('currentVoice'),
      )
    : null;

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex items-center gap-4'>
        <Link
          href={`/parent/students/${documentId}`}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
        >
          <ArrowLeft className='mr-1 h-4 w-4' />
          {t('back')}
        </Link>
        <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900'>{t('editTitle')}</h1>
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
        <div className='rounded-lg border border-border bg-card p-6 shadow-1 sm:p-8 lg:p-10'>
          <ParentStudentWizard
            documentId={documentId}
            initialValues={parentStudentToFormValues(student)}
            existingPhoto={existingPhoto}
            existingVoiceIntro={existingVoiceIntro}
          />
        </div>
      ) : null}
    </div>
  );
}
