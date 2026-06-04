'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  parentCreateApplicationSchema,
  type ParentCreateApplicationFormValues,
} from '@/modules/applications/schemas/parent-create-application.schema';
import type { SchoolOption } from '@/modules/applications/types/create-application.types';

export function useParentCreateApplicationForm(presetSchool: SchoolOption | null) {
  return useForm<ParentCreateApplicationFormValues>({
    resolver: zodResolver(parentCreateApplicationSchema),
    defaultValues: {
      student: '',
      school: presetSchool?.documentId ?? '',
    },
    mode: 'onChange',
  });
}
