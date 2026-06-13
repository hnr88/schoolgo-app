'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  createScholarshipsSchema,
  type ScholarshipsValues,
} from '@/modules/school-profile/schemas/scholarships.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface ScholarshipsFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function ScholarshipsForm({ school, disabled = false }: ScholarshipsFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createScholarshipsSchema(), []);

  const form = useForm<ScholarshipsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      scholarshipAvailable: school.scholarshipAvailable,
    },
  });

  const handleSubmit = async (values: ScholarshipsValues) => {
    await mutateAsync({ scholarshipAvailable: values.scholarshipAvailable });
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField control={form.control} name='scholarshipAvailable' render={({ field }) => (
          <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
            <div className='flex flex-col gap-1'>
              <FormLabel className='cursor-pointer'>{t('scholarshipAvailableLabel')}</FormLabel>
              <FormDescription>{t('scholarshipAvailableHint')}</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} />
            </FormControl>
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
