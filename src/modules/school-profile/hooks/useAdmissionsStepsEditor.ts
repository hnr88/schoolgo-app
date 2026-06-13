'use client';

import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  createAdmissionsStepsSchema,
  type AdmissionsStepsValues,
} from '@/modules/school-profile/schemas/admissionsSteps.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import type {
  SchoolAdmissionsStepInput,
  SchoolProfileDetails,
} from '@/modules/school-profile/types/school-profile.types';

export function useAdmissionsStepsEditor(school: SchoolProfileDetails) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createAdmissionsStepsSchema(t), [t]);

  const form = useForm<AdmissionsStepsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      steps: (school.admissionsSteps ?? []).map((step) => ({
        title: step.title,
        description: step.description ?? '',
      })),
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'steps',
  });

  const addStep = () => append({ title: '', description: '' });

  const moveUp = (index: number) => {
    if (index > 0) move(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index < fields.length - 1) move(index, index + 1);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    const admissionsSteps: SchoolAdmissionsStepInput[] = values.steps.map((step, index) => {
      const description = emptyToNull(step.description);
      return {
        stepNumber: index + 1,
        title: step.title.trim(),
        order: index + 1,
        ...(description !== null ? { description } : {}),
      };
    });
    await mutateAsync({ admissionsSteps });
    form.reset(values);
  });

  return {
    form,
    fields,
    addStep,
    remove,
    moveUp,
    moveDown,
    handleSubmit,
    isPending,
  };
}
