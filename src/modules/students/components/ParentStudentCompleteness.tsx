'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SurfaceCard } from '@/modules/core';
import { getProfileCompleteness } from '@/modules/students/lib/profile-completeness';
import type { ParentStudentDetail } from '@/modules/students/types/parent-student.types';

export function ParentStudentCompleteness({ student }: { student: ParentStudentDetail }) {
  const t = useTranslations('ParentStudents');
  const { percent, isComplete } = getProfileCompleteness(student);

  return (
    <SurfaceCard padding='lg'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-sm font-semibold text-ink-900'>{t('completenessTitle')}</span>
          <span className='text-sm font-medium text-foggy'>{t('completenessValue', { percent })}</span>
        </div>
        <Progress value={percent} />
        {isComplete ? (
          <p className='flex items-center gap-1.5 text-xs text-babu-700'>
            <CheckCircle2 className='h-4 w-4 shrink-0' aria-hidden='true' />
            {t('completenessComplete')}
          </p>
        ) : (
          <p className='text-xs text-foggy'>{t('completenessHint')}</p>
        )}
      </div>
    </SurfaceCard>
  );
}
