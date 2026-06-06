'use client';

import { useTranslations } from 'next-intl';
import { useWatch } from 'react-hook-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getInitials } from '@/modules/students/lib/get-initials';
import {
  computeStudentCompleteness,
  getStudentCompletedCount,
  STUDENT_COMPLETENESS_TOTAL,
} from '@/modules/students/lib/student-form-completeness';
import type { StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { StudentFormSummaryProps } from '@/modules/students/types/component.types';

export function StudentFormSummary({ control }: StudentFormSummaryProps) {
  const t = useTranslations('Students');
  const values = useWatch({ control }) as StudentFormValues;

  const firstName = values.firstName?.trim() ?? '';
  const lastName = values.lastName?.trim() ?? '';
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = firstName || lastName ? getInitials(firstName, lastName) : '·';
  const percent = computeStudentCompleteness(values);
  const completed = getStudentCompletedCount(values);

  const chips = [values.nationality, values.currentYearLevel, values.targetEntryYear]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));

  return (
    <aside className='rounded-2xl border border-divider bg-card p-6 shadow-1 lg:sticky lg:top-8'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Avatar className='size-16'>
          <AvatarFallback className='bg-rausch-50 text-lg font-semibold text-primary-strong'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <p className='font-display text-lg font-semibold text-ink-900'>
          {fullName || t('summaryEmptyName')}
        </p>
        {chips.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-2'>
            {chips.map((chip) => (
              <Badge key={chip} variant='secondary' className='rounded-pill'>
                {chip}
              </Badge>
            ))}
          </div>
        ) : (
          <p className='text-sm text-foggy'>{t('summaryEmptyHint')}</p>
        )}
      </div>

      <div className='mt-6 flex flex-col gap-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-medium text-ink-900'>{t('completenessLabel')}</span>
          <span className='font-semibold text-primary-strong tabular-nums'>
            {t('summaryPercent', { percent })}
          </span>
        </div>
        <Progress value={percent} aria-label={t('completenessLabel')} />
        <p className='text-caption text-foggy'>
          {t('summaryFieldsFilled', { completed, total: STUDENT_COMPLETENESS_TOTAL })}
        </p>
      </div>
    </aside>
  );
}
