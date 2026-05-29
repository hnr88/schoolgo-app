'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
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
  tuitionSchema,
  TUITION_LEVELS,
  type TuitionValues,
} from '@/modules/school-profile/schemas/school-profile.schema';
import { useCreateTuition } from '@/modules/school-profile/queries/use-tuition.mutation';
import { numberInputToValue, valueToInput } from '@/modules/school-profile/lib/form-helpers';
import type { TuitionLevel } from '@/modules/school-profile/types/school-profile.types';

interface TuitionAddFormProps {
  usedLevels: TuitionLevel[];
  disabled?: boolean;
}

export function TuitionAddForm({ usedLevels, disabled = false }: TuitionAddFormProps) {
  const t = useTranslations('SchoolProfile');
  const create = useCreateTuition();
  const available = TUITION_LEVELS.filter((l) => !usedLevels.includes(l));

  const form = useForm<TuitionValues>({
    resolver: zodResolver(tuitionSchema),
    defaultValues: { level: available[0] ?? 'gr4', annualAmountAud: 0 },
  });

  const handleSubmit = async (values: TuitionValues) => {
    await create.mutateAsync(values);
    form.reset({ level: available.filter((l) => l !== values.level)[0] ?? 'gr4', annualAmountAud: 0 });
  };

  if (available.length === 0) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-wrap items-end gap-4' noValidate>
        <FormField control={form.control} name='level' render={({ field }) => (
          <FormItem className='w-40'>
            <FormLabel>{t('tuitionLevelLabel')}</FormLabel>
            <Select disabled={disabled} value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder={t('tuitionLevelPlaceholder')} /></SelectTrigger>
              </FormControl>
              <SelectContent>
                {available.map((l) => (
                  <SelectItem key={l} value={l}>
                    {t(`level${l.charAt(0).toUpperCase()}${l.slice(1)}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name='annualAmountAud' render={({ field }) => (
          <FormItem className='w-48'>
            <FormLabel>{t('tuitionAmountLabel')}</FormLabel>
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
        <Button type='submit' disabled={disabled || create.isPending} aria-busy={create.isPending}>
          {create.isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          ) : (
            <Plus className='mr-2 h-4 w-4' aria-hidden='true' />
          )}
          {t('addTuition')}
        </Button>
      </form>
    </Form>
  );
}
