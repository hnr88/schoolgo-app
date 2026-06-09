'use client';

import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FIT_REPORT_YEAR_LEVEL_LABEL_KEYS,
  FIT_REPORT_YEAR_LEVELS,
} from '@/modules/parent-fit-report/constants/fit-report.constants';
import type {
  FitReportControlsProps,
  FitReportYearLevel,
} from '@/modules/parent-fit-report/types/fit-report.types';

export function FitReportControls({
  students,
  studentId,
  yearLevel,
  onStudentChange,
  onYearLevelChange,
}: FitReportControlsProps) {
  const t = useTranslations('ParentFitReport');

  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='fit-report-child'>{t('childLabel')}</Label>
        <Select
          value={studentId ?? undefined}
          onValueChange={(value) => {
            if (value) onStudentChange(value);
          }}
        >
          <SelectTrigger id='fit-report-child'>
            <SelectValue placeholder={t('childPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.documentId} value={student.documentId}>
                {student.firstName} {student.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='fit-report-year'>{t('yearLevelLabel')}</Label>
        <Select
          value={yearLevel ?? undefined}
          onValueChange={(value) => {
            if (value) onYearLevelChange(value as FitReportYearLevel);
          }}
        >
          <SelectTrigger id='fit-report-year'>
            <SelectValue placeholder={t('yearLevelPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {FIT_REPORT_YEAR_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {t(FIT_REPORT_YEAR_LEVEL_LABEL_KEYS[level])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
