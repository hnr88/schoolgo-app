'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  createAcademicSchema,
  type AcademicValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import {
  emptyToNull,
  numberInputToValue,
  valueToInput,
} from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface AcademicFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function AcademicForm({ school, disabled = false }: AcademicFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createAcademicSchema(t), [t]);

  const form = useForm<AcademicValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ieltsMinScore: school.ieltsMinScore,
      aeasMinScore: school.aeasMinScore,
      pteMinScore: school.pteMinScore,
      duolingoMinScore: school.duolingoMinScore,
      curriculumOffered: school.curriculumOffered ?? '',
      levelsOffered: school.levelsOffered ?? '',
      intakePeriods: school.intakePeriods ?? '',
    },
  });

  const handleSubmit = async (values: AcademicValues) => {
    await mutateAsync({
      ieltsMinScore: values.ieltsMinScore,
      aeasMinScore: values.aeasMinScore,
      pteMinScore: values.pteMinScore,
      duolingoMinScore: values.duolingoMinScore,
      curriculumOffered: emptyToNull(values.curriculumOffered),
      levelsOffered: emptyToNull(values.levelsOffered),
      intakePeriods: emptyToNull(values.intakePeriods),
    });
    form.reset(values);
  };

  const scoreFields = [
    { name: 'ieltsMinScore', label: t('ieltsLabel') },
    { name: 'aeasMinScore', label: t('aeasLabel') },
    { name: 'pteMinScore', label: t('pteLabel') },
    { name: 'duolingoMinScore', label: t('duolingoLabel') },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
          {scoreFields.map(({ name, label }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='decimal'
                    step='0.5'
                    min={0}
                    disabled={disabled}
                    value={valueToInput(field.value)}
                    onChange={(e) => field.onChange(numberInputToValue(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          ))}
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField control={form.control} name='curriculumOffered' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('curriculumLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='levelsOffered' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('levelsLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name='intakePeriods' render={({ field }) => (
          <FormItem>
            <FormLabel>{t('intakePeriodsLabel')}</FormLabel>
            <FormControl><Textarea rows={2} disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
