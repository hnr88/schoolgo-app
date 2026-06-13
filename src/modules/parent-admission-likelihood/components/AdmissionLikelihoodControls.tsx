'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AdmissionLikelihoodControlsProps } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

export function AdmissionLikelihoodControls({
  students,
  studentId,
  onStudentChange,
  onCompute,
  isComputing,
  canCompute,
  schoolCount,
}: AdmissionLikelihoodControlsProps) {
  const t = useTranslations('ParentAdmissionLikelihood');

  return (
    <div className='grid items-end gap-4 sm:grid-cols-[1fr_auto]'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='admission-likelihood-child'>{t('childLabel')}</Label>
        <Select
          value={studentId ?? undefined}
          onValueChange={(value) => {
            if (value) onStudentChange(value);
          }}
        >
          <SelectTrigger id='admission-likelihood-child'>
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

      <Button type='button' onClick={onCompute} disabled={!canCompute || isComputing}>
        {isComputing ? (
          <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
        ) : (
          <Sparkles className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
        )}
        {t('computeCta', { count: schoolCount })}
      </Button>
    </div>
  );
}
