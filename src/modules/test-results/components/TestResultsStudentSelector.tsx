'use client';

import { useTranslations } from 'next-intl';
import { DsSelect } from '@/modules/design-system';
import type { StudentSelectorOption } from '@/modules/test-results/types/component.types';

interface TestResultsStudentSelectorProps {
  students: StudentSelectorOption[];
  value: string;
  onChange: (documentId: string) => void;
}

export function TestResultsStudentSelector({
  students,
  value,
  onChange,
}: TestResultsStudentSelectorProps) {
  const t = useTranslations('ParentTestResults');

  return (
    <label className='flex max-w-sm flex-col gap-2'>
      <span className='text-sm font-medium text-foreground'>{t('selectStudentLabel')}</span>
      <DsSelect value={value} onChange={(event) => onChange(event.target.value)}>
        <option value=''>{t('selectStudentPlaceholder')}</option>
        {students.map((student) => (
          <option key={student.documentId} value={student.documentId}>
            {student.firstName} {student.lastName}
          </option>
        ))}
      </DsSelect>
    </label>
  );
}
