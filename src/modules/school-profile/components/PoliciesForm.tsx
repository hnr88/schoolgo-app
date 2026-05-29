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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  policiesSchema,
  type PoliciesValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import {
  numberInputToValue,
  valueToInput,
} from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface PoliciesFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

export function PoliciesForm({ school, disabled = false }: PoliciesFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);

  const form = useForm<PoliciesValues>({
    resolver: zodResolver(policiesSchema),
    defaultValues: {
      offerAcceptanceWindowDays: school.offerAcceptanceWindowDays ?? 14,
      autoWaitlistEnabled: school.autoWaitlistEnabled,
      partnerAgentsOnly: school.partnerAgentsOnly,
      oshcArrangement: school.oshcArrangement,
    },
  });

  const handleSubmit = async (values: PoliciesValues) => {
    await mutateAsync(values);
    form.reset(values);
  };

  const oshcOptions = [
    { value: 'school_arranged', label: t('oshcSchoolArranged') },
    { value: 'agent_arranged', label: t('oshcAgentArranged') },
    { value: 'either', label: t('oshcEither') },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField control={form.control} name='offerAcceptanceWindowDays' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('offerWindowLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  inputMode='numeric'
                  min={1}
                  max={365}
                  disabled={disabled}
                  value={valueToInput(field.value)}
                  onChange={(e) => field.onChange(numberInputToValue(e.target.value) ?? 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name='oshcArrangement' render={({ field }) => (
            <FormItem>
              <FormLabel>{t('oshcLabel')}</FormLabel>
              <Select disabled={disabled} value={field.value ?? undefined} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={t('oshcPlaceholder')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {oshcOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className='flex flex-col gap-4'>
          <FormField control={form.control} name='autoWaitlistEnabled' render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
              <FormLabel className='cursor-pointer'>{t('autoWaitlistLabel')}</FormLabel>
              <FormControl><Switch checked={field.value} disabled={disabled} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='partnerAgentsOnly' render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
              <FormLabel className='cursor-pointer'>{t('partnerAgentsOnlyLabel')}</FormLabel>
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
