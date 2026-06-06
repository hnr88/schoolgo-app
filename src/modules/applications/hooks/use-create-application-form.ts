'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bulkCreateApplicationSchema,
  type BulkCreateApplicationFormValues,
} from '@/modules/applications/schemas/create-application.schema';
import type { SchoolOption } from '@/modules/applications/types/create-application.types';

export function useCreateApplicationForm(presetSchool: SchoolOption | null) {
  return useForm<BulkCreateApplicationFormValues>({
    resolver: zodResolver(bulkCreateApplicationSchema),
    defaultValues: {
      student: '',
      schools: presetSchool ? [presetSchool.documentId] : [],
      targetYearLevel: '',
      targetIntake: '',
      boardingRequired: false,
    },
  });
}
