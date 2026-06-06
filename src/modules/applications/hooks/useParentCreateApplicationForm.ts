'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  parentCreateApplicationSchema,
  type ParentCreateApplicationFormValues,
} from '@/modules/applications/schemas/parent-create-application.schema';
import { useParentFitCheck } from '@/modules/applications/queries/use-parent-fit-check.query';
import type { SchoolOption } from '@/modules/applications/types/create-application.types';
import type { ParentCreateApplicationEligibility } from '@/modules/applications/types/parent-create-application.types';

export function useParentCreateApplicationForm(
  presetSchool: SchoolOption | null,
): ParentCreateApplicationEligibility {
  const form = useForm<ParentCreateApplicationFormValues>({
    resolver: zodResolver(parentCreateApplicationSchema),
    defaultValues: {
      student: '',
      school: presetSchool?.documentId ?? '',
      boardingRequired: false,
    },
    mode: 'onChange',
  });

  const student = form.watch('student');
  const school = form.watch('school');
  const targetYearLevel = form.watch('targetYearLevel');

  const { data: fitCheck, isFetching } = useParentFitCheck({ student, school, targetYearLevel });

  const isFitCheckLoading = Boolean(student && school && targetYearLevel) && isFetching;
  const isHardBlocked = Boolean(fitCheck && !fitCheck.eligible);

  return { form, fitCheck, isFitCheckLoading, isHardBlocked };
}
