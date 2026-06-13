'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  createInternationalSchema,
  type InternationalValues,
} from '@/modules/school-profile/schemas/international.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import { inputToYearLevels, yearLevelsToInput } from '@/modules/school-profile/lib/year-levels';
import { InternationalFields } from '@/modules/school-profile/components/InternationalFields';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface InternationalFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function InternationalForm({ school, disabled = false }: InternationalFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createInternationalSchema(t), [t]);

  const form = useForm<InternationalValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cricosAgeRange: school.cricosAgeRange ?? '',
      yearLevelsInternational: yearLevelsToInput(school.yearLevelsInternational),
      languagesOffered: school.languagesOffered ?? '',
      elicosEslSupport: school.elicosEslSupport,
      atarAvailable: school.atarAvailable,
      internationalStudentCapacity: school.internationalStudentCapacity,
      internationalStudentPercentage: school.internationalStudentPercentage,
      totalEnrolment: school.totalEnrolment,
      oshcPreferredProvider: school.oshcPreferredProvider ?? '',
      proposedEntryLevel: school.proposedEntryLevel ?? '',
      postSubmissionMessage: school.postSubmissionMessage ?? '',
    },
  });

  const handleSubmit = async (values: InternationalValues) => {
    await mutateAsync({
      cricosAgeRange: emptyToNull(values.cricosAgeRange),
      yearLevelsInternational: inputToYearLevels(values.yearLevelsInternational ?? ''),
      languagesOffered: emptyToNull(values.languagesOffered),
      elicosEslSupport: values.elicosEslSupport,
      atarAvailable: values.atarAvailable,
      internationalStudentCapacity: values.internationalStudentCapacity,
      internationalStudentPercentage: values.internationalStudentPercentage,
      totalEnrolment: values.totalEnrolment,
      oshcPreferredProvider: emptyToNull(values.oshcPreferredProvider),
      proposedEntryLevel: emptyToNull(values.proposedEntryLevel),
      postSubmissionMessage: emptyToNull(values.postSubmissionMessage),
    });
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <InternationalFields form={form} disabled={disabled} />
        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
