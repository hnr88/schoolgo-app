'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
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
  capacitySchema,
  type CapacityValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useCreateCapacity } from '@/modules/school-profile/queries/use-capacity.mutation';
import { numberInputToValue, valueToInput } from '@/modules/school-profile/lib/form-helpers';

interface CapacityAddFormProps {
  disabled?: boolean;
}

export function CapacityAddForm({ disabled = false }: CapacityAddFormProps) {
  const t = useTranslations('SchoolProfile');
  const create = useCreateCapacity();

  const form = useForm<CapacityValues>({
    resolver: zodResolver(capacitySchema),
    defaultValues: { yearLevel: '', intakePeriod: '', totalPlaces: 0, autoWaitlist: false },
  });

  const handleSubmit = async (values: CapacityValues) => {
    await create.mutateAsync(values);
    form.reset({ yearLevel: '', intakePeriod: '', totalPlaces: 0, autoWaitlist: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-wrap items-end gap-4' noValidate>
        <FormField control={form.control} name='yearLevel' render={({ field }) => (
          <FormItem className='w-40'>
            <FormLabel>{t('capacityYearLevelLabel')}</FormLabel>
            <FormControl><Input disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='intakePeriod' render={({ field }) => (
          <FormItem className='w-48'>
            <FormLabel>{t('capacityIntakeLabel')}</FormLabel>
            <FormControl><Input disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='totalPlaces' render={({ field }) => (
          <FormItem className='w-32'>
            <FormLabel>{t('capacityTotalLabel')}</FormLabel>
            <FormControl>
              <Input
                type='number'
                min={0}
                inputMode='numeric'
                disabled={disabled}
                value={valueToInput(field.value)}
                onChange={(e) => field.onChange(numberInputToValue(e.target.value) ?? 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='autoWaitlist' render={({ field }) => (
          <FormItem className='flex items-center gap-2'>
            <FormLabel className='cursor-pointer'>{t('capacityAutoWaitlistLabel')}</FormLabel>
            <FormControl>
              <Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )} />
        <Button type='submit' disabled={disabled || create.isPending} aria-busy={create.isPending}>
          {create.isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          ) : (
            <Plus className='mr-2 h-4 w-4' aria-hidden='true' />
          )}
          {t('addCapacity')}
        </Button>
      </form>
    </Form>
  );
}
