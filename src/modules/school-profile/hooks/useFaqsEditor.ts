'use client';

import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { createFaqsSchema, type FaqsValues } from '@/modules/school-profile/schemas/faqs.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

const EMPTY_ROW = { question: '', answer: '', topicTag: '' } as const;

export function useFaqsEditor(school: SchoolProfileDetails) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createFaqsSchema(t), [t]);

  const form = useForm<FaqsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      faqs: (school.faqs ?? []).map((item) => ({
        question: item.question,
        answer: item.answer,
        topicTag: item.topicTag ?? '',
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'faqs' });

  const addRow = () => append({ ...EMPTY_ROW });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync({
      faqs: values.faqs.map((item, index) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
        topicTag: emptyToNull(item.topicTag),
        order: index + 1,
      })),
    });
    form.reset(values);
  });

  return { form, fields, addRow, remove, handleSubmit, isPending };
}
