'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
    <div className='flex max-w-sm flex-col gap-2'>
      <span className='text-sm font-medium text-foreground' id='test-results-student-label'>
        {t('selectStudentLabel')}
      </span>
      <Select
        value={value === '' ? null : value}
        onValueChange={(next) => {
          if (typeof next === 'string') onChange(next);
        }}
      >
        <SelectTrigger className='w-full' aria-labelledby='test-results-student-label'>
          <SelectValue placeholder={t('selectStudentPlaceholder')} />
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
  );
}
