'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createAdmissionsControlsSchema,
  type AdmissionsControlsValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface AdmissionsControlsFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function AdmissionsControlsForm({ school, disabled = false }: AdmissionsControlsFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createAdmissionsControlsSchema(t), [t]);

  const form = useForm<AdmissionsControlsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      enrolmentStatus: school.enrolmentStatus,
      partnerAgentsOnly: school.partnerAgentsOnly,
      autoWaitlistEnabled: school.autoWaitlistEnabled,
      applicationDeadline: school.applicationDeadline ?? '',
      nextIntakeDate: school.nextIntakeDate ?? '',
    },
  });

  const handleSubmit = async (values: AdmissionsControlsValues) => {
    await mutateAsync({
      enrolmentStatus: values.enrolmentStatus,
      partnerAgentsOnly: values.partnerAgentsOnly,
      autoWaitlistEnabled: values.autoWaitlistEnabled,
      applicationDeadline: values.applicationDeadline ? values.applicationDeadline : null,
      nextIntakeDate: values.nextIntakeDate ? values.nextIntakeDate : null,
    });
    form.reset(values);
  };

  const statusOptions = [
    { value: 'open', label: t('enrolmentStatusOpen') },
    { value: 'limited', label: t('enrolmentStatusLimited') },
    { value: 'waitlist', label: t('enrolmentStatusWaitlist') },
    { value: 'closed', label: t('enrolmentStatusClosed') },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          <FormField control={form.control} name='enrolmentStatus' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('enrolmentStatusLabel')}</FormLabel>
              <Select disabled={disabled} value={field.value ?? undefined} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={t('enrolmentStatusPlaceholder')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='applicationDeadline' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('applicationDeadlineLabel')}</FormLabel>
              <FormControl>
                <Input type='date' disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='nextIntakeDate' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nextIntakeDateLabel')}</FormLabel>
              <FormControl>
                <Input type='date' disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className='flex flex-col gap-4'>
          <FormField control={form.control} name='partnerAgentsOnly' render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
              <FormLabel className='cursor-pointer'>{t('partnerAgentsOnlyLabel')}</FormLabel>
              <FormControl><Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='autoWaitlistEnabled' render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
              <FormLabel className='cursor-pointer'>{t('autoWaitlistLabel')}</FormLabel>
              <FormControl><Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} /></FormControl>
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
