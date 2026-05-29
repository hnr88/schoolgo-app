'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  identitySchema,
  type IdentityValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

const STATES = ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'] as const;

interface IdentityFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function IdentityForm({ school, disabled = false }: IdentityFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);

  const form = useForm<IdentityValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      name: school.name,
      cricosCode: school.cricosCode ?? '',
      suburb: school.suburb ?? '',
      state: school.state,
      postcode: school.postcode ?? '',
    },
  });

  const handleSubmit = async (values: IdentityValues) => {
    await mutateAsync({
      name: values.name.trim(),
      cricosCode: emptyToNull(values.cricosCode),
      suburb: emptyToNull(values.suburb),
      state: values.state,
      postcode: emptyToNull(values.postcode),
    });
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField control={form.control} name='name' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='cricosCode' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('cricosCodeLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='suburb' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('suburbLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='state' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('stateLabel')}</FormLabel>
              <Select disabled={disabled} value={field.value ?? undefined} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={t('statePlaceholder')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='postcode' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('postcodeLabel')}</FormLabel>
              <FormControl><Input disabled={disabled} {...field} /></FormControl>
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
