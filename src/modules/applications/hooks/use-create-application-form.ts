'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createApplicationSchema,
  type CreateApplicationFormValues,
} from '@/modules/applications/schemas/create-application.schema';
import type { SchoolOption } from '@/modules/applications/types/create-application.types';

export function useCreateApplicationForm(presetSchool: SchoolOption | null) {
  return useForm<CreateApplicationFormValues>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      student: '',
      school: presetSchool?.documentId ?? '',
      targetYearLevel: '',
      targetIntake: '',
      boardingRequired: false,
    },
  });
}
