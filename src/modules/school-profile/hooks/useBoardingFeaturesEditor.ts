'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  createBoardingFeaturesSchema,
  type BoardingFeaturesValues,
} from '@/modules/school-profile/schemas/boardingFeatures.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

export function useBoardingFeaturesEditor(school: SchoolProfileDetails) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createBoardingFeaturesSchema(t), [t]);

  const form = useForm<BoardingFeaturesValues>({
    resolver: zodResolver(schema),
    defaultValues: { boardingFeatures: school.boardingFeatures ?? [] },
  });

  const [draft, setDraft] = useState('');
  const features = form.watch('boardingFeatures');

  const addFeature = () => {
    const value = draft.trim();
    if (!value) return;
    if (features.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setDraft('');
      return;
    }
    form.setValue('boardingFeatures', [...features, value], { shouldDirty: true });
    setDraft('');
  };

  const removeFeature = (index: number) => {
    form.setValue(
      'boardingFeatures',
      features.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync({
      boardingFeatures: values.boardingFeatures.length > 0 ? values.boardingFeatures : null,
    });
    form.reset(values);
  });

  return {
    form,
    features,
    draft,
    setDraft,
    addFeature,
    removeFeature,
    handleSubmit,
    isPending,
  };
}
