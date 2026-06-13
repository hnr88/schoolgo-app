'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  createLocationSchema,
  type LocationValues,
} from '@/modules/school-profile/schemas/location.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { numberInputToValue, valueToInput } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface LocationFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function LocationForm({ school, disabled = false }: LocationFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createLocationSchema(t), [t]);

  const form = useForm<LocationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      latitude: school.latitude,
      longitude: school.longitude,
      distanceToCbd: school.distanceToCbd,
    },
  });

  const handleSubmit = async (values: LocationValues) => {
    await mutateAsync({
      latitude: values.latitude,
      longitude: values.longitude,
      distanceToCbd: values.distanceToCbd,
    });
    form.reset(values);
  };

  const coordFields = [
    { name: 'latitude', label: t('latitudeLabel'), hint: t('latitudeHint'), step: '0.000001' },
    { name: 'longitude', label: t('longitudeLabel'), hint: t('longitudeHint'), step: '0.000001' },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {coordFields.map(({ name, label, hint, step }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='decimal'
                    step={step}
                    disabled={disabled}
                    value={valueToInput(field.value)}
                    onChange={(e) => field.onChange(numberInputToValue(e.target.value))}
                  />
                </FormControl>
                <FormDescription>{hint}</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          ))}
        </div>
        <FormField control={form.control} name='distanceToCbd' render={({ field }) => (
          <FormItem className='sm:max-w-xs'>
            <FormLabel>{t('distanceToCbdLabel')}</FormLabel>
            <FormControl>
              <Input
                type='number'
                inputMode='decimal'
                step='0.1'
                min={0}
                disabled={disabled}
                value={valueToInput(field.value)}
                onChange={(e) => field.onChange(numberInputToValue(e.target.value))}
              />
            </FormControl>
            <FormDescription>{t('distanceToCbdHint')}</FormDescription>
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
