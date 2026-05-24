'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema, type StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { UseStudentFormOptions } from '@/modules/students/types/component.types';

export function useStudentForm({ defaultValues }: UseStudentFormOptions) {
  return useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      currentSchool: '',
      currentYearLevel: '',
      targetEntryYear: '',
      targetEntryTerm: '',
      parentGuardianName: '',
      parentGuardianEmail: '',
      parentGuardianPhone: '',
      parentGuardianWechat: '',
      agentNotes: '',
      ...defaultValues,
    },
  });
}
