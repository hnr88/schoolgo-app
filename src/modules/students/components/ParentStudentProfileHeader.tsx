'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileText, GraduationCap, Pencil } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import { AudioPreview } from '@/modules/forms';
import { ParentStudentArchiveButton } from '@/modules/students/components/ParentStudentArchiveButton';
import { ParentStudentAvatar } from '@/modules/students/components/ParentStudentAvatar';
import { studentMediaUrl } from '@/modules/students/lib/media-url';
import { PARENT_STATUS_DOT } from '@/modules/students/constants/parent-profile.constants';
import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

export function ParentStudentProfileHeader({ student }: { student: ParentStudentDetail }) {
  const t = useTranslations('ParentStudents');
  const voiceUrl = studentMediaUrl(student.voiceIntro?.url);

  return (
    <SurfaceCard elevation='raised' padding='lg'>
      <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex items-center gap-5'>
          <ParentStudentAvatar
            firstName={student.firstName}
            lastName={student.lastName}
            photoUrl={student.photo?.url}
            size={64}
            className='text-xl'
          />
          <div>
            <div className='flex flex-wrap items-center gap-3'>
              <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900'>
                {student.firstName} {student.lastName}
              </h1>
              <span className='flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5'>
                <span className={`inline-block h-2 w-2 rounded-full ${PARENT_STATUS_DOT[student.status] ?? 'bg-foggy/50'}`} />
                <span className='text-xs font-medium text-hof'>
                  {t(`status_${student.status}`)}
                </span>
              </span>
            </div>
            {student.nationality && <p className='mt-1 text-sm text-foggy'>{student.nationality}</p>}
            <div className='mt-3 flex flex-wrap gap-2'>
              <Link
                href={{ pathname: '/parent/applications', query: { student: student.documentId } }}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
              >
                <GraduationCap className='h-4 w-4' />
                {t('viewApplications', { count: student.activeApplicationCount })}
              </Link>
              <Link
                href={{ pathname: '/parent/results', query: { student: student.documentId } }}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
              >
                <FileText className='h-4 w-4' />
                {t('viewResults')}
              </Link>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Link
            href={`/parent/students/${student.documentId}/edit`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
          >
            <Pencil className='h-4 w-4' />
            {t('edit')}
          </Link>
          <ParentStudentArchiveButton student={student} />
        </div>
      </div>

      {voiceUrl && (
        <div className='mt-5'>
          <p className='mb-2 text-sm font-medium text-ink-900'>{t('voiceIntro')}</p>
          <AudioPreview
            media={{ id: 0, url: voiceUrl, mime: student.voiceIntro?.mime ?? '', name: t('voiceIntroName'), size: 0 }}
            onRemove={() => undefined}
            disabled
            removeLabel={t('voiceIntro')}
          />
        </div>
      )}
    </SurfaceCard>
  );
}
