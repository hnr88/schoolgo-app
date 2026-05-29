'use client';

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
  feesSchema,
  type FeesValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import {
  numberInputToValue,
  valueToInput,
} from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface FeesFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function FeesForm({ school, disabled = false }: FeesFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);

  const form = useForm<FeesValues>({
    resolver: zodResolver(feesSchema),
    defaultValues: {
      applicationFee: school.applicationFee,
      enrolmentFee: school.enrolmentFee,
      feeBoardingAnnual: school.feeBoardingAnnual,
      boardingAvailable: school.boardingAvailable,
      feeApplicationRefundable: school.feeApplicationRefundable,
    },
  });

  const handleSubmit = async (values: FeesValues) => {
    await mutateAsync(values);
    form.reset(values);
  };

  const numberFields = [
    { name: 'applicationFee', label: t('applicationFeeLabel') },
    { name: 'enrolmentFee', label: t('enrolmentFeeLabel') },
    { name: 'feeBoardingAnnual', label: t('boardingFeeLabel') },
  ] as const;

  const switchFields = [
    { name: 'boardingAvailable', label: t('boardingAvailableLabel') },
    { name: 'feeApplicationRefundable', label: t('applicationRefundableLabel') },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          {numberFields.map(({ name, label }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='numeric'
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
        <div className='flex flex-col gap-4'>
          {switchFields.map(({ name, label }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
                <FormLabel className='cursor-pointer'>{label}</FormLabel>
                <FormControl>
                  <Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )} />
          ))}
        </div>
        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
