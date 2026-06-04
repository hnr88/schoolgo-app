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
  createDescriptionSchema,
  type DescriptionValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface DescriptionFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function DescriptionForm({ school, disabled = false }: DescriptionFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createDescriptionSchema(t), [t]);

  const form = useForm<DescriptionValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: school.description ?? '',
      internationalStudentDescription: school.internationalStudentDescription ?? '',
      schoolHomepageUrl: school.schoolHomepageUrl ?? '',
      internationalEnrolmentUrl: school.internationalEnrolmentUrl ?? '',
      admissionsEmail: school.admissionsEmail ?? '',
      admissionsPhone: school.admissionsPhone ?? '',
    },
  });

  const handleSubmit = async (values: DescriptionValues) => {
    await mutateAsync({
      description: emptyToNull(values.description),
      internationalStudentDescription: emptyToNull(values.internationalStudentDescription),
      schoolHomepageUrl: emptyToNull(values.schoolHomepageUrl),
      internationalEnrolmentUrl: emptyToNull(values.internationalEnrolmentUrl),
      admissionsEmail: emptyToNull(values.admissionsEmail),
      admissionsPhone: emptyToNull(values.admissionsPhone),
    });
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField control={form.control} name='description' render={({ field }) => (
          <FormItem>
            <FormLabel>{t('descriptionLabel')}</FormLabel>
            <FormControl><Textarea rows={4} disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='internationalStudentDescription' render={({ field }) => (
          <FormItem>
            <FormLabel>{t('intlDescriptionLabel')}</FormLabel>
            <FormControl><Textarea rows={3} disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField control={form.control} name='schoolHomepageUrl' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('homepageUrlLabel')}</FormLabel>
              <FormControl><Input type='url' disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='internationalEnrolmentUrl' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('intlEnrolmentUrlLabel')}</FormLabel>
              <FormControl><Input type='url' disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='admissionsEmail' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admissionsEmailLabel')}</FormLabel>
              <FormControl><Input type='email' disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='admissionsPhone' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admissionsPhoneLabel')}</FormLabel>
              <FormControl><Input type='tel' disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
