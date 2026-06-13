'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  createCocurricularSchema,
  type CocurricularValues,
} from '@/modules/school-profile/schemas/cocurricular.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

export function useCoCurricularEditor(school: SchoolProfileDetails) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createCocurricularSchema(t), [t]);

  const form = useForm<CocurricularValues>({
    resolver: zodResolver(schema),
    defaultValues: { programTypes: school.programTypes ?? [] },
  });

  const [draft, setDraft] = useState('');
  const activities = form.watch('programTypes');

  const addActivity = () => {
    const value = draft.trim();
    if (!value) return;
    if (activities.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setDraft('');
      return;
    }
    form.setValue('programTypes', [...activities, value], { shouldDirty: true });
    setDraft('');
  };

  const removeActivity = (index: number) => {
    form.setValue(
      'programTypes',
      activities.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync({ programTypes: values.programTypes });
    form.reset(values);
  });

  return {
    form,
    activities,
    draft,
    setDraft,
    addActivity,
    removeActivity,
    handleSubmit,
    isPending,
  };
}
